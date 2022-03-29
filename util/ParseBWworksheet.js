import XLSX from 'xlsx';
import dayjs from 'dayjs';

async function ParseBWworksheet(e, callback) {
  var files = e.target.files,
    f = files[0],
    result;
  var gjson = {};

  var reader = new FileReader();
  reader.onload = async function (e) {
    // console.log(e.target.result);
    var data = new Uint8Array(e.target.result);
    // console.log(data);
    var workbook = XLSX.read(data, { type: 'array', codepage: 65001 });
    console.log(workbook);
    /* DO SOMETHING WITH workbook HERE */
    gjson = await process_wb(workbook, 0);
    gjson.animals = [];
    // console.log(gjson);
    let groupSave;
    const calcDate = gjson.theDates[0].replace(/[^0-9//]/g, '');
    // console.log(
    //   'firstdate:',
    //   gjson.theDates[0],
    //   'calcDate',
    //   calcDate,
    //   'date?:',
    //   dayjs(calcDate).format('MM/DD/YYYY')
    // );
    for (let index = 0; index < gjson.primary.length; index++) {
      const element = gjson.primary[index];
      if (element.Group) {
        groupSave = element.Group;
      }
      if (element['Animal ID #']) {
        let animal = {
          refid: index,
          Group: groupSave,
          ID: element['Animal ID #'],
          RFID: element['UID Chip #'],
          Sex: element['Sex'],
          HighBW: element['Highest BW on Record\r\n(g)'],
          HighWT: element['% BW Loss (per highest wt recorded)'],
          CurrentClinicalScore: element['Current Clinical Score'],
          DOB: element['DOB'],
          PreBW: element['Pre-Shipment BW\r\n(g)'],
          BW: element['BW\r\n(g)'],
          BS: element['BS\r\n(1 or 0)'],
          MF: element['MF\r\n(1 or 0)'],
          SMT: element['SMT\r\n(1 or 0)'],
          LRS: element['LRS\r\n(1 or 0)'],
          DG: element['DG\r\n(1 or 0)'],
          deadDate: '',
          MeasureWeight: []
        };
        gjson.BW.forEach((element, i) => {
          const theLine = element[index];
          // console.log('index ', index, 'i', i, gjson.theDates[i]);
          if (gjson.theDates[i]) {
            const postIndex = i;
            // const postIndex = dayjs(gjson.theDates[i]).format('MM/DD/YYYY');
            const BW = theLine['BW\r\n(g)'] || '';
            if (
              BW.lastIndexOf('TD') !== -1 ||
              BW.lastIndexOf('D') !== -1 ||
              BW.lastIndexOf('PF') !== -1
            ) {
              let deadDate = BW.replace('TD', '')
                .replace('PF', '')
                .replace('D', '')
                .trim();
              if (deadDate == '') {
                deadDate = postIndex;
              }
              if (dayjs(deadDate).isBefore(calcDate, 'year')) {
                deadDate = dayjs(deadDate).year(dayjs(calcDate).year());
                // console.log('was before', deadDate);
              }
              // animal.deadDate = deadDate;
              // console.log('found dead', animal.ID, deadDate);
              animal.deadDate = dayjs(deadDate).format('MM/DD/YYYY');
            }
            const Weight = {
              PostDate: dayjs(gjson.theDates[i]).format('MM/DD/YYYY'),
              TimeStamp: new Date(gjson.theDates[i]),
              BW: BW,
              GainLoss: theLine['Gain / Loss \r\n(per last recorded wt)'] || '',
              Score: theLine['Clinical Score\r\n(0-5)'] || '',
              BS: theLine['BS\r\n(1 or 0)'] || '',
              SMT: theLine['SMT\r\n(1 or 0)'] || '',
              MF: theLine['MF\r\n(1 or 0)'] || '',
              DG: theLine['DG\r\n(1 or 0)'] || '',
              LRS: theLine['LRS\r\n(1 or 0)'] || ''
            };
            // animal.MeasureWeight.push(Weight);
            animal.MeasureWeight[postIndex] = Weight;
          }
        });
        // console.log(animal);
        gjson.animals.push(animal);
      }
    }
    console.log(gjson);
    var result = gjson;
    // setBWfile(result);
    // Manifest = gjson;
    // console.log(Manifest);
    // setManifestfile(gjson);
    console.log('result', result);
    callback(result);
    return result;
    //   manifestInfo.innerHTML = `File: ${f.name}<br> Date: ${workbook.Props.LastPrinted}`;
    //   createFileImport(gjson);
  };

  function to_json(workbook) {
    if (workbook.SSF) XLSX.SSF.load_table(workbook.SSF);
    var result = {};
    var theData = {};
    workbook.SheetNames.forEach(function (sheetName) {
      var worksheet = workbook.Sheets[sheetName];
      /* Find desired cell */
      var desired_cell = worksheet['A1'];
      /* Get the value */
      theData.StudyNumber = desired_cell ? desired_cell.v : undefined;
      /* Find desired cell */
      desired_cell = worksheet['C2'];
      /* Get the value */
      const TransplantSx = desired_cell ? desired_cell.v : undefined;
      if (TransplantSx) {
        theData.TransplantSx = new Date(Date.UTC(0, 0, TransplantSx));
      }
      var range = XLSX.utils.decode_range(worksheet['!ref']);
      const setRange = range;
      var num_rows = range.e.r - range.s.r + 1;
      var num_cols = range.e.c - range.s.c + 1;
      // console.log('rows', num_rows);
      // console.log('cols', num_cols);
      // console.log('setRange', setRange);
      //get next section
      range.s.r = 5; // <-- zero-indexed, so setting to 1 will skip row 0
      range.s.c = 16; // <--
      // range.e.c = 23; // <--
      // console.log(range);
      //get next section
      //get dates
      range.s.r = 3; // <-- zero-indexed, so setting to 1 will skip row 0
      range.e.r = 4; // <-- zero-indexed, so setting to 1 will skip row 0
      range.s.c = 9; // <--
      // range.e.c =9; // <--
      // console.log(range);
      worksheet['!ref'] = XLSX.utils.encode_range(range);
      // console.log(`worksheet_ref`, worksheet['!ref']);
      // console.log(XLSX.utils.sheet_to_csv(worksheet));
      var roa = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,
        header: 0,
        origin: 'A4'
      });
      // console.log('roa', roa);
      // console.log('roa keys');
      // console.log(Object.keys(roa[0]));
      const obj = roa[0];
      let obj2 = [];
      let svDate = null;
      let errorDateObj = [];
      for (const property in obj) {
        // console.log(`${property}: ${obj[property]}`);
        // console.log(property.substring(0, 7));
        if (property.substring(0, 7) != '__EMPTY') {
          if (!svDate) {
            svDate = new Date(property.replace(/[^0-9//]/g, ''));
            console.log('origin date', svDate);
          }
          if (svDate.getTime() > new Date(property).getTime()) {
            console.log(
              'error',
              svDate,
              'current',
              property,
              'index',
              obj2.length
            );
            errorDateObj[obj2.length] = 'Error in Sequence';
          } else {
            console.log('good', svDate, 'current', property);
          }
          obj2.push(property);
          svDate = obj2.length == 1 ? svDate : new Date(property);
        }
      }
      theData.theDates = obj2;
      theData.theDatesError = errorDateObj;
      // console.log('obj2', obj2);
      //get first columns
      range = setRange;
      // console.log('beg_range', range);
      range.s.r = 5; // <-- zero-indexed, so setting to 1 will skip row 0
      range.e.r = num_rows; // <-- zero-indexed, so setting to 1 will skip row 0
      range.s.c = 0; // <-- starting first column
      range.e.c = 15; // <-- ending first section at column 15
      // console.log('setRange', range);
      worksheet['!ref'] = XLSX.utils.encode_range(range);
      // console.log(`worksheet_ref`, worksheet['!ref']);
      var roa = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,
        header: 0,
        origin: 'A4'
      });
      // console.log('roa', roa);
      theData.primary = roa;
      theData['BW'] = [];
      // console.log('sections', (num_cols - 15) / 8);
      // const segm = (num_cols - 15) / 8;
      // console.log('next: ', 8 + 16);
      // console.log('next 2: ', 8 * 2 + 16);
      const segmentL = 8;
      for (let index = 0, counter = 0; index < num_cols; index++) {
        if (index % segmentL == 0) {
          //code you want called
          ++counter;
          // console.log(counter, index);
          //get next section
          range.s.r = 5; // <-- zero-indexed, so setting to 1 will skip row 0
          range.s.c = 16 + index; // <--
          range.e.c = 23 + index; // <--
          // console.log(range);
          worksheet['!ref'] = XLSX.utils.encode_range(range);
          // console.log(`worksheet_ref`, worksheet['!ref']);
          var roa = XLSX.utils.sheet_to_json(worksheet, {
            raw: false,
            header: 0,
            origin: 'A4'
          });
          // console.log('roa', roa);
          if (roa.length > 0) theData['BW'][counter] = roa;
        }
        // console.log('num_cols', num_cols);
      }
      // console.log(theData);
      // console.log('sheetName', sheetName);
      if (theData) result[sheetName] = theData;
      // console.log('result[sheetName]', result[sheetName]);
    });
    return result;
  }

  function process_wb(wb, sheetidx) {
    // last_wb = wb;
    // opts.on.wb(wb, sheetidx);
    var sheet = wb.SheetNames[sheetidx || 0];
    var json = to_json(wb)[sheet];
    // opts.on.sheet(json, wb.SheetNames, choose_sheet);
    return json;
  }

  reader.readAsArrayBuffer(f);
  result = { data: gjson };
  console.log('result 232', result);
  return result;
}

export default ParseBWworksheet;
