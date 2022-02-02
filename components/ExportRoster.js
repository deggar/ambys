import { Button, Card } from '@mui/material';
import { Elevation } from '@blueprintjs/core';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function ExportRoster({ Roster }) {
  //   console.log('Roster', Roster);
  const saveOutRoster = function () {
    console.log('exporting');
    createExcelArray(Roster);
  };
  return (
    <Card className="flex-shink" interactive={true} elevation={Elevation.TWO}>
      <div className="inline">
        <Button
          variant="contained"
          component="label"
          onClick={() => {
            console.log('exporting next');
            saveOutRoster(Roster);
          }}
        >
          Export Sorted File
        </Button>
      </div>
    </Card>
  );
}

function createExcelArray(Roster) {
  const groups = Roster.Groups;
  var wsData = [];
  wsData.push(['FRG Rat Shipping Manifest']);
  wsData.push([]);
  wsData.push([]);
  wsData.push([]);
  wsData.push([
    'Crate',
    'Animal ID',
    'Cage ID',
    'Ear ID',
    'RFID',
    'Envigo ID',
    'Sex',
    'Birth Date',
    'Dame',
    'Sire',
    'Genotype',
    'BW',
    'Cloudy eyes',
    'Study ID',
    'Group'
  ]);

  Roster.Groups.map((group) => {
    const theGroupMembers = Roster.List.filter(({ Group }) => {
      return Group == group.prefix;
    });
    if (theGroupMembers) {
      theGroupMembers.sort(function (a, b) {
        return a.Sex.localeCompare(b.Sex);
      });
      theGroupMembers.forEach((line) => {
        var theLine = [
          line.Crate,
          line.ID,
          line.CageID,
          line.EarID,
          line.RFID,
          line.EnvigoID,
          line.Sex,
          line.BirthDate,
          line.Dame,
          line.Sire,
          line.Genotype,
          line.BW,
          line.CloudyEyes,
          line.Study,
          line.Group
        ];
        wsData.push(theLine);
      });
    }
  });

  console.log(wsData);
  createExcelFile(wsData);
}

function createExcelFile(ws_data) {
  var wb = XLSX.utils.book_new();
  wb.Props = {
    Title: 'Export Demo',
    Subject: 'Test Export',
    Author: 'Dan Eggar',
    CreatedDate: new Date(2017, 12, 19)
  };

  var merge = XLSX.utils.decode_range('A1:O4');
  var wscols = [
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
    { wch: 15 },
    { wch: 8 },
    { wch: 8 },
    { wch: 22 },
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
    { wch: 17 },
    { wch: 8 }
  ];

  wb.SheetNames.push('Test Sheet');
  //   var ws_data = [['hello', 'world']];
  var ws = XLSX.utils.aoa_to_sheet(ws_data);
  /* add merges */
  if (!ws['!merges']) ws['!merges'] = [];
  ws['!merges'].push(merge);
  ws['!cols'] = wscols;
  wb.Sheets['Test Sheet'] = ws;
  var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  saveAs(
    new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
    'test.xlsx'
  );
}

export default ExportRoster;
