import { Button } from '@mui/material';
import { Elevation, Card } from '@blueprintjs/core';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import dayjs from 'dayjs';
import excelColumnName from 'excel-column-name';

function ExportBWCO({ Roster }) {
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
          Export Body Weight File
        </Button>
      </div>
    </Card>
  );
}

function createExcelArray(Roster) {
  const groups = Roster.Groups;
  var wsData = [];

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
          line.Group,
          line.ID,
          line.RFID,
          line.Sex.charAt(0),
          +line.BW,
          '',
          '',
          new Date(line.BirthDate),
          +line.BW,
          +line.BW,
          '',
          0,
          0,
          0,
          0,
          0
        ];
        wsData.push(theLine);
      });
    }
  });

  // console.log(wsData);
  createExcelFile(wsData, Roster);
}

function createExcelFile(ws_data, Roster) {
  const exDate = dayjs(new Date()).format('MM/DD/YYYY');
  const theStudy = Roster.Study;

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Dan Eggar';
  workbook.lastModifiedBy = 'Dan Eggar';
  workbook.created = new Date(2022, 3, 1);
  workbook.modified = new Date();
  workbook.lastPrinted = new Date(2022, 3, 3);

  const worksheet = workbook.addWorksheet('NewSheet', {
    views: [{ state: 'frozen', xSplit: 8, ySplit: 6 }]
  });

  worksheet.mergeCells('A1:C1');
  worksheet.getCell('A1').value = theStudy;
  worksheet.getCell('A1').alignment = {
    vertical: 'bottom',
    horizontal: 'left'
  };
  worksheet.getCell('A1').font = {
    name: 'Calibri (Body)',
    size: 14,
    bold: true,
    underline: true
  };
  worksheet.getCell('A2').value = 'Transplant Sx:';
  worksheet.getCell('C2').value = 'AddDateHere';

  worksheet.mergeCells('D1:G1');
  worksheet.getCell('D1').value = 'Clinical Score Key';
  worksheet.getCell('D1').alignment = {
    vertical: 'middle',
    horizontal: 'center'
  };
  worksheet.getCell('D1').border = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' }
  };
  worksheet.getCell('D1').font = {
    size: 11,
    bold: true
  };

  setCells(worksheet, 'D2:G2', 'D2', '5 - 4 → No recheck needed', 'C6E0B4', 11);
  setCells(
    worksheet,
    'D3:G3',
    'D3',
    '3.5 - 3 → Recheck every 48hrs',
    'FFE699',
    11
  );
  setCells(worksheet, 'D4:G4', 'D4', '2.5 → Recheck daily', 'F4B084', 11);
  setCells(
    worksheet,
    'D5:G5',
    'D5',
    '2 - 1 (or ≥20% BW loss) → Euthanize',
    'FF8585',
    11
  );
  setCells(
    worksheet,
    'J4:P4',
    'J4',
    `Highest BW Recorded as of ${exDate}`,
    'D0CECE',
    10
  );

  setCells(worksheet, '', 'J5', 'BW', '', 11);
  setCells(worksheet, '', 'K5', 'Obs.', '', 11);
  setCells(worksheet, 'L5:P5', 'L5', 'Supplement/Treatment', '', 11);

  worksheet.getCell('J4').font = {
    size: 10,
    bold: true
  };

  var bwRanges = [];
  console.log(excelColumnName.excelColToInt('WZ'));
  //go to 625
  for (let i = 17; i < 625; i += 8) {
    //go to wz
    const addCS = excelColumnName.intToExcelCol(i);
    const addCE = excelColumnName.intToExcelCol(i + 7);
    bwRanges.push(`${addCS}:${addCE}`);
    RepeatCol(worksheet, addCS, addCE, 4);
  }

  console.log('bwRanges', bwRanges);

  var headerRow = worksheet.getRow(6);
  headerRow.height = 69;
  //   headerRow.getCell(1).value = 'Group';

  const colHeadings = [
    { label: 'Group', width: 6.5, color: '' },
    { label: 'Animal ID #', width: 7.5, color: '' },
    { label: 'UID Chip #', width: 10, color: '' },
    { label: 'Sex', width: 4.5, color: '' },
    { label: 'Highest BW on Record\n(g)', width: 8, color: 'D0CECE' },
    {
      label: '% BW Loss (per highest wt recorded)',
      width: 10,
      color: 'FFFF00'
    },
    { label: 'Current Clinical Score', width: 10, color: 'FFFF00' },
    { label: 'DOB', width: 11, color: '' },
    { label: 'Pre-Shipment BW\n(g)', width: 10, color: '' },
    { label: 'BW\n(g)', width: 7.5, color: 'D0CECE' },
    { label: setRichText('Clinical Score\n', '(0-5)', 9), width: 7, color: '' },
    {
      label: setRichText('BS\n', '(1 or 0)', 8),
      width: 5.5,
      color: ''
    },
    { label: setRichText('SMT\n', '(1 or 0)', 8), width: 5.5, color: '' },
    { label: setRichText('MF\n', '(1 or 0)', 8), width: 5.5, color: '' },
    { label: setRichText('DG\n', '(1 or 0)', 8), width: 5.5, color: '' },
    { label: setRichText('LRS\n', '(1 or 0)', 8), width: 5.5, color: '' }
  ];

  for (let i = 0; i < colHeadings.length; i++) {
    const theCell = headerRow.getCell(i + 1);
    theCell.value = colHeadings[i].label;
    theCell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true
    };
    theCell.font = {
      name: 'Calibri (Body)',
      size: 11,
      bold: true
    };
    theCell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.getColumn(i + 1).width = colHeadings[i].width;
    if (colHeadings[i].color != '') {
      theCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: colHeadings[i].color }
      };
    }
  }

  //ws_data
  for (let i = 0; i < ws_data.length; i++) {
    const row = worksheet.getRow(7 + i);
    row.values = ws_data[i];
  }

  const fileName = 'textBWCO';

  console.log(worksheet);

  workbook.xlsx
    .writeBuffer()
    .then((buffer) => {
      console.log('file created');
      const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, fileName + fileExtension);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export default ExportBWCO;

function setRichText(t1, t2, size) {
  return {
    richText: [
      {
        font: {
          bold: true,
          size: 11
        },
        text: t1
      },
      {
        font: {
          size: size
        },
        text: t2
      }
    ]
  };
}

//

function RepeatCol(worksheet, rangeStart, rangeEnd, rowInc) {
  const mainCell = `${rangeStart}${rowInc}`;
  const range1 = `${mainCell}:${rangeEnd}${rowInc}`;
  const columnStart = excelColumnName.excelColToInt(rangeStart);

  setCells(worksheet, range1, mainCell, '', 'D0CECE', 14);
  const h2col1 = excelColumnName.intToExcelCol(columnStart + 1);
  const h2col2 = excelColumnName.intToExcelCol(columnStart + 2);
  const h2col3 = excelColumnName.intToExcelCol(columnStart + 3);
  console.log(h2col1);
  const range2 = `${rangeStart}${rowInc + 1}:${h2col1}${rowInc + 1}`;
  //   const range3 = `${h2col2}${rowInc + 1}:${h2col3}${rowInc + 1}`;
  const range4 = `${h2col3}${rowInc + 1}:${rangeEnd}${rowInc + 1}`;
  setCells(worksheet, range2, `${rangeStart}${rowInc + 1}`, 'BW', '', 11);
  setCells(worksheet, '', `${h2col2}${rowInc + 1}`, 'Obs.', '', 11);
  setCells(
    worksheet,
    range4,
    `${h2col3}${rowInc + 1}`,
    'Supplement/Treatment',
    '',
    11
  );
  const col3 = [
    { label: 'BW\n(g)', width: 7.5, color: 'D0CECE' },
    {
      label: setRichText('Gain / Loss \n', '(per last recorded wt)', 8),
      width: 7,
      color: 'D0CECE'
    },
    { label: setRichText('Clinical Score\n', '(0-5)', 9), width: 7, color: '' },
    {
      label: setRichText('BS\n', '(1 or 0)', 8),
      width: 5.5,
      color: ''
    },
    { label: setRichText('SMT\n', '(1 or 0)', 8), width: 5.5, color: '' },
    { label: setRichText('MF\n', '(1 or 0)', 8), width: 5.5, color: '' },
    { label: setRichText('DG\n', '(1 or 0)', 8), width: 5.5, color: '' },
    { label: setRichText('LRS\n', '(1 or 0)', 8), width: 5.5, color: '' }
  ];

  //set 3rd columns
  const headerRow = worksheet.getRow(rowInc + 2);
  for (let i = 0; i < col3.length; i++) {
    const theCell = headerRow.getCell(i + columnStart);
    worksheet.getColumn(i + columnStart).width = col3[i].width;
    // console.log('columnStart', columnStart, 'i', i, 'theCell', theCell);
    theCell.value = col3[i].label;
    theCell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true
    };
    theCell.font = {
      name: 'Calibri (Body)',
      size: 11,
      bold: true
    };
    theCell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    if (col3[i].color != '') {
      theCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: col3[i].color }
      };
    }
  }
}

function setCells(worksheet, range, setCell, setValue, cellColor, size) {
  if (range) {
    worksheet.mergeCells(range);
  }
  worksheet.getCell(setCell).value = setValue;
  worksheet.getCell(setCell).alignment = {
    vertical: 'middle',
    horizontal: 'center'
  };
  worksheet.getCell(setCell).border = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' }
  };
  worksheet.getCell(setCell).font = {
    size: size
  };
  worksheet.getCell(setCell).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: cellColor }
  };
}
