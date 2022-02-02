import { doc, setDoc } from '@firebase/firestore';
import { firestore, auth, postToJSON } from '../lib/firebase';
import { v4 as uuidv4 } from 'uuid';

export function convertToRoster(startID, Study, json) {
  // console.log(startID);
  let initialID = +startID,
    savedCrate = [],
    roster = [],
    nline,
    inc = 0,
    Groups = Study.Groups,
    groupCount = Groups ? Groups.length : 1;

  json.forEach(function (line) {
    if (line.RFID) {
      if (line.Crate) {
        savedCrate = line.Crate;
      } else {
        line.Crate = savedCrate;
      }
      line.ID = 0;

      line.Study = Study.studyNumber.value;

      nline = {
        Filename: line['filename'],
        Crate: line['Crate'],
        Qty: line['Qty'],
        Species: line['Species'],
        Strain: line['Strain'],
        CageID: line['Cage ID'],
        EarID: line['Ear ID'],
        RFID: line['RFID'],
        EnvigoID: line['Envigo ID'],
        Sex: line['Sex'],
        BirthDate: line['Birth Date'],
        Dame: line['Dame'],
        Sire: line['Sire'],
        Genotype: line['Genotype'],
        BW: line['BW'],
        CloudyEyes: line['Cloudy eyes?'] ? 'yes' : 'no',
        ID: line['ID'],
        Study: line['Study'],
        Group: ''
      };
      roster.push(nline);
    }
  });
  // console.log(json);
  //   roster = json;

  const theMales = roster.filter(({ Sex }) => {
    return Sex === 'Male';
  });

  const theFemales = roster.filter(({ Sex }) => {
    return Sex === 'Female';
  });
  //   console.log('Males', theMales.length);
  //   console.log('Females', theFemales.length);

  const fbw =
    theFemales.reduce((total, next) => total + +next.BW, 0) / theFemales.length;
  const mbw =
    theMales.reduce((total, next) => total + +next.BW, 0) / theMales.length;

  const countGroupMale = Math.floor(theMales.length / groupCount);
  const countGroupFemale = Math.floor(theFemales.length / groupCount);
  const totalMaleInGroups = countGroupMale * groupCount;
  const leftMaleOver = theMales.length - totalMaleInGroups;
  const totalFemaleInGroups = countGroupFemale * groupCount;
  const leftFemaleOver = theFemales.length - totalFemaleInGroups;
  const totalRoster = roster.length;
  const totalInGroups = totalMaleInGroups + totalFemaleInGroups;
  const leftOver = totalRoster - totalInGroups;

  // console.log('totalRoster', totalRoster);
  // console.log('totalInGroups', totalInGroups);
  // console.log('countGroupMale', countGroupMale);
  // console.log('countGroupFemale', countGroupFemale);
  // console.log('leftOver', leftOver);
  // console.log('MaleleftOver', leftMaleOver);
  // console.log('FemaleftOver', leftFemaleOver);

  //loop over each group and gender and set into each groups

  Groups.forEach(function (group, index) {
    const adjust = index == 0 && leftMaleOver ? leftMaleOver : 0;
    // console.log('male group', group);
    const theNextMales = roster.filter(({ Sex, Group }) => {
      return Sex === 'Male' && Group == '';
    });
    // console.log('theNextMales', theNextMales);
    if (theNextMales) {
      theNextMales.forEach(function (line, index) {
        if (index < countGroupMale + adjust) line.Group = group.prefix;
      });
    }

    const adjustFemale = index == 0 && leftFemaleOver ? leftFemaleOver : 0;
    // console.log('female group', group);
    const theNextFemales = roster.filter(({ Sex, Group }) => {
      return Sex === 'Female' && Group == '';
    });
    // console.log('theNextFemales', theNextFemales);
    if (theNextFemales) {
      theNextFemales.forEach(function (line, index) {
        if (index < countGroupFemale + adjustFemale) line.Group = group.prefix;
      });
    }
  });

  roster.sort(function (a, b) {
    if (a.Group < b.Group) {
      return -1;
    }
    if (a.Group > b.Group) {
      return 1;
    }
    // names must be equal
    return 0;
  });

  roster.forEach(function (line) {
    line.ID = initialID + inc;
    // console.log(line.RFID, line.ID);
    ++inc;
  });

  // console.log('roster', roster);
  return roster;
}

export function saveAnimalsToBD(Roster, Manifestfile, Study) {
  // console.log('save to db');
  //save roster with uuid

  async function createRoster(Roster, Manifestfile, Study) {
    if (!Roster.length) {
      return;
    }
    const slug = uuidv4();
    const protocol = Roster[0].Study.slice(0, Roster[0].Study.lastIndexOf('-'));
    const saveRoster = {
      ID: slug,
      Protocol: protocol,
      Study: Roster[0].Study,
      Filename: Roster[0].Filename,
      List: Roster,
      Manifestfile: Manifestfile,
      Groups: Study.Groups
    };
    console.log('saveRoster', saveRoster);
    // const slug = 'Roster';
    const rosterRef = doc(firestore, `/Rosters/`, slug);
    await setDoc(rosterRef, saveRoster);
    // console.log('saveRoster', saveRoster);
  }

  async function createAnimalRecord(Animal) {
    const ref = doc(firestore, `Animals/${Animal.RFID}`);
    await setDoc(ref, Animal);
    // console.log('saved', Animal);
  }
  if (!Roster.length) {
    return;
  }
  var list = [];
  Roster.forEach(function (line) {
    const nline = {
      Filename: line['Filename'],
      Crate: line['Crate'],
      Species: line['Species'],
      Strain: line['Strain'],
      CageID: line['CageID'],
      EarID: line['EarID'],
      RFID: line['RFID'],
      EnvigoID: line['EnvigoID'],
      Sex: line['Sex'],
      BirthDate: line['BirthDate'],
      Dame: line['Dame'],
      Sire: line['Sire'],
      Genotype: line['Genotype'],
      BW: line['BW'],
      CloudyEyes: line['CloudyEyes'],
      ID: line['ID'],
      Study: line['Study'],
      Group: line['Group']
    };
    // console.log(nline);
    createAnimalRecord(nline);
    list.push(nline);
  });

  createRoster(list, Manifestfile, Study);
}
