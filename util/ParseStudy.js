// ES/TS import
// import extractText from 'office-text-extractor';
import camelCase from 'lodash/camelCase.js';
import { extractRawText } from 'mammoth';

const defStudy = {
  test: '',
  transplantDate: {
    name: 'Transplant Date',
    value: ''
  },
  protocolNumber: {
    name: 'Protocol Number',
    value: ''
  },
  studyNumber: {
    name: 'Study Number',
    value: ''
  },
  studyIncr: {
    name: 'Study Incr',
    value: ''
  },
  species: {
    name: 'Species',
    value: ''
  },
  gender: {
    name: 'Gender',
    value: ''
  },
  strain: {
    name: 'Strain',
    value: ''
  },
  titleOfStudy: {
    name: 'Title of Study',
    value: ''
  },
  primaryInvestigators: {
    name: 'Primary Investigators',
    value: ''
  },
  numberOfAnimals: {
    name: 'Number of Animals',
    value: ''
  },
  ageOrWeightRange: {
    name: 'Age or weight range',
    value: ''
  },
  purpose: {
    name: 'Purpose:',
    value: ''
  },
  ambysLot: {
    name: 'Ambys Lot',
    value: ''
  },
  All: {
    name: 'AllText',
    value: ''
  }
};

export default async function ParseStudy(file) {
  //parse data from files
  var theJSON = defStudy;

  // The parse function
  async function parseTextFromWordFile(filePath) {
    let formattedText = '';
    return new Promise((resolve, reject) => {
      extractRawText({ path: filePath }).then((result) => {
        resolve(result.value);
      });
    });
  }

  const text = await parseTextFromWordFile(file);
  try {
    // console.log(text);

    const fields = [
      'Transplant Date',
      'Protocol Number',
      'Study Number',
      'Title of Study',
      'Primary Investigators',
      'Number of Animals',
      'Age or weight range',
      'Species',
      'Strain',
      'Gender'
    ];

    fields.forEach((theFind) => {
      theSearch(theFind, text);
    });

    var searchPatternRegex = /Purpose[\s\S]*?\Experiment Outline:/gm;
    var found = searchPatternRegex.exec(text);
    // console.log(found);
    if (found) {
      found.forEach((match, groupIndex) => {
        // console.log(`Found match, group ${groupIndex}: ${match}`);
        const theEnd = match.indexOf('Experiment Outline:');
        const theStart = 'Purpose:'.length;
        const theDef = match.slice(theStart, theEnd).trim();
        const theFld = match.slice(0, theStart);
        const thePointer = camelCase(theFld);
        theJSON[thePointer] = { name: theFld, value: theDef };
      });
    }

    // AM\d\d\d\d
    var searchPatternRegex = /AM\d\d\d\d/gm;
    var found = searchPatternRegex.exec(text);
    // console.log(found);
    if (found) {
      found.forEach((match, groupIndex) => {
        // console.log(`Found match, group ${groupIndex}: ${match}`);
        const theDef = match;
        const theFld = 'Ambys Lot';
        const thePointer = camelCase(theFld);
        theJSON[thePointer] = { name: theFld, value: theDef };
      });
    }

    theJSON['All'] = { name: 'AllText', value: text };

    const theStudyID = theJSON.studyNumber.value;
    const theStudyInc = theStudyID.split('-')[3];

    const theProtocol = theStudyID.slice(0, theStudyID.lastIndexOf('-'));

    // console.log(theStudyInc);
    // console.log(theProtocol);

    theJSON['studyIncr'] = { name: 'Study Incr', value: theStudyInc };
    theJSON['protocolNumber'] = { name: 'Protocol Number', value: theProtocol };

    // console.log(JSON.stringify(theJSON));
    return theJSON;
  } catch (err) {
    // console.log('there was an error -', err);
    // console.error(err);
    return err;
  }

  function theSearch(theFind, text) {
    var searchPattern = `${theFind}:[\\s\\S]*?\\.`;
    var searchPatternRegex = RegExp(`${searchPattern}`, 'gm');
    var found = searchPatternRegex.exec(text);
    if (found) {
      found.forEach((match, groupIndex) => {
        const theEnd = match.length;
        const theStart = theFind.length + 1;
        const newMatch = match.split(/\r?\n/)[0].trim();
        const theDef = newMatch.split(':')[1].trim();
        const theFld = newMatch.split(':')[0].trim();
        const thePointer = camelCase(theFld);
        // console.log('theFld', theFld);
        // console.log('theDef', theDef);
        // console.log('thePointer', thePointer);
        // console.log('------------');
        theJSON[thePointer] = { name: theFld, value: theDef };
      });
    }
  }
}
