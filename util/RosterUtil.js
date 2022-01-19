export function convertToRoster(startID, Study, json) {
  console.log(startID);
  let initialID = +startID,
    savedCrate = [],
    roster = [],
    nline,
    inc = 0;
  json.forEach(function (line) {
    if (line.RFID) {
      if (line.Crate) {
        savedCrate = line.Crate;
      } else {
        line.Crate = savedCrate;
      }
      line.ID = initialID + inc;
      ++inc;
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
  console.log(json);
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

  //   const countAMale = Math.ceil(theMales.length / 2);
  //   const countBMale = theMales.length - countAMale;
  //   //   console.log(countAMale, countBMale);

  //   const countAFemale = Math.ceil(theFemales.length / 2);
  //   const countBFemale = theFemales.length - countAFemale;

  //   createSortingDisplay(json);
  return roster;
}
