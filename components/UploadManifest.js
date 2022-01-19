import { useState, useContext } from 'react';
import XLSX from 'xlsx';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Image from 'next/image';
import { doc, setDoc } from '@firebase/firestore';
import { firestore, auth } from '../lib/firebase';
// import ParseShippingManifest from '../util/ParseShippingManifest';
import { UserContext } from '../lib/context';
import { convertToRoster } from '../util/RosterUtil';

import { Card, Elevation, H3, H5 } from '@blueprintjs/core';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography
} from '@mui/material';

function UploadManifest({
  Manifestfile,
  setManifestfile,
  Roster,
  setRoster,
  AnimalStartID,
  setAnimalStartID,
  Study
}) {
  //   const [Manifestfile, setManifestfile] = useState(null);
  async function ParseShippingManifest(e) {
    //   const { Manifest } = useContext(UserContext);
    console.log('e', e);

    var files = e.target.files,
      f = files[0],
      gjson = [];

    var reader = new FileReader();
    reader.onload = async function (e) {
      // console.log(e.target.result);
      var data = new Uint8Array(e.target.result);
      // console.log(data);
      var workbook = XLSX.read(data, { type: 'array' });
      console.log(workbook);
      /* DO SOMETHING WITH workbook HERE */
      gjson = await process_wb(workbook, 0);
      console.log(gjson);
      // Manifest = gjson;
      setManifestfile(gjson);
      console.log('Manifestfile', Manifestfile);
      return gjson;
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

  const selectManifest = async (event) => {
    console.log('event1', event);

    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      console.log('i', i);
      console.log('event.nativeEvent', event.nativeEvent);
      const parser = ParseShippingManifest;
      const result = await parser(event.nativeEvent);
      //   Manifest = await result;
      console.log('result', result);
      //   console.log('Manifest', Manifest);
      //   console.log(Manifestfile);
    }
  };

  function handleChange(e) {
    console.log('e.target.name', e.target.name);
    setAnimalStartID(e.target.value);
    // setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <Card className="flex-shink" interactive={true} elevation={Elevation.TWO}>
      <div>
        <Button variant="contained" component="label">
          Upload Shipping Manifest File
          <input
            type="file"
            hidden
            name="manifestfile"
            onChange={selectManifest}
          />
        </Button>
      </div>

      {Manifestfile && (
        <>
          <div>
            <TextField
              className="flex-1 mt-2"
              id="standard-basic"
              label="Starting Animal ID"
              variant="standard"
              value={AnimalStartID}
              name="AnimalStartID"
              onChange={handleChange}
            />
          </div>
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                const newRoster = convertToRoster(
                  AnimalStartID,
                  Study,
                  Manifestfile
                );
                setRoster(newRoster);
              }}
            >
              Process Shipping Manifest
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}

export default UploadManifest;
