import { doc, setDoc } from '@firebase/firestore';
import { firestore, auth, postToJSON } from '../lib/firebase';

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

  return roster;
}

export function saveAnimalsToBD(Roster) {
  // console.log('save to db');
  async function createAnimalRecord(Animal) {
    const ref = doc(firestore, `Animals/${Animal.RFID}`);
    await setDoc(ref, Animal);
    // console.log('saved', Animal);
  }
  if (!Roster.length) {
    return;
  }

  Roster.forEach(function (line) {
    const nline = {
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
      ID: line['ID'],
      Study: line['Study'],
      Group: line['Group']
    };
    // console.log(nline);
    createAnimalRecord(nline);
  });
}
