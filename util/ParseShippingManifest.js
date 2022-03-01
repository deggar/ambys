import XLSX from 'xlsx';
import { useState, useContext } from 'react';
// import { UserContext } from '../lib/context';

async function ParseShippingManifest(e) {
  //   const { Manifest } = useContext(UserContext);
  // console.log('e', e);

  var files = e.target.files,
    f = files[0],
    gjson = [];

  var reader = new FileReader();
  reader.onload = async function (e) {
    // console.log(e.target.result);
    var data = new Uint8Array(e.target.result);
    // console.log(data);
    var workbook = XLSX.read(data, { type: 'array', codepage: 65001 });
    // console.log(workbook);
    /* DO SOMETHING WITH workbook HERE */
    gjson = await process_wb(workbook, 0);
    // console.log(gjson);
    // Manifest = gjson;
    // console.log(Manifest);
    // setManifestfile(gjson);
    // return gjson;
    //   manifestInfo.innerHTML = `File: ${f.name}<br> Date: ${workbook.Props.LastPrinted}`;
    //   createFileImport(gjson);
  };

  function to_json(workbook) {
    if (workbook.SSF) XLSX.SSF.load_table(workbook.SSF);
    var result = {};
    workbook.SheetNames.forEach(function (sheetName) {
      var worksheet = workbook.Sheets[sheetName];
      var range = XLSX.utils.decode_range(worksheet['!ref']);
      range.s.r = 4; // <-- zero-indexed, so setting to 1 will skip row 0
      worksheet['!ref'] = XLSX.utils.encode_range(range);
      var roa = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,
        header: 0,
        origin: 'A4'
      });
      if (roa.length > 0) result[sheetName] = roa;
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
  return gjson;
}

export default ParseShippingManifest;
