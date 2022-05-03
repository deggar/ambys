import Link from 'next/link';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function AnimalBWList({ animals, BWdates, BWfile }) {
  console.log('animals', animals);
  //   const [rowData, setrowData] = useState(null);
  //   const [columnDefs, setcolumnDefs] = useState(null);
  console.log('bwfile', BWfile);
  const theDates = BWfile.theDates;
  const theDatesError = BWfile.theDatesError;
  console.log('theDates', theDates);
  var data = [];
  let rowData, columnDefs;
  var colSet = [
    { headerName: 'Group', field: 'Group', pinned: 'left', width: 80 },
    { headerName: 'Animal ID', field: 'ID', pinned: 'left', width: 100 },
    { headerName: 'Chip #', field: 'RFID', pinned: 'left', width: 120 },
    { headerName: 'Sex', field: 'Sex', pinned: 'left', width: 70 },
    { headerName: 'DOB', field: 'DOB', pinned: 'left', width: 90 },
    {
      headerName: 'Highest BW',
      field: 'HighBW',
      pinned: 'left',
      width: 10,
      resizable: true
    },
    {
      headerName: '% BW Loss',
      field: 'HighWT',
      pinned: 'left',
      width: 10,
      resizable: true
    },
    {
      headerName: 'Current Clinical Score',
      field: 'CCS',
      pinned: 'left',
      width: 10,
      resizable: true
    },
    {
      headerName: 'PreShipment BW',
      field: 'PreBW',
      pinned: 'left',
      width: 10,
      resizable: true
    },
    {
      headerName: 'BW',
      field: 'BW0',
      pinned: 'left',
      width: 10,
      resizable: true
    },
    {
      headerName: 'Clinical Score',
      field: 'BS0',
      pinned: 'left',
      width: 10,
      resizable: true
    },
    {
      headerName: 'SMT',
      field: 'SMT0',
      pinned: 'left',
      width: 10,
      resizable: true
    },
    {
      headerName: 'MF',
      field: 'MF0',
      pinned: 'left',
      width: 10,
      resizable: true
    },
    {
      headerName: 'DG',
      field: 'DG0',
      pinned: 'left',
      width: 10,
      resizable: true
    },
    {
      headerName: 'LRS',
      field: 'LRS0',
      pinned: 'left',
      width: 10,
      resizable: true
    }
  ];
  if (animals) {
    const maxcol = animals[0].MeasureWeight.length;
    console.log('maxcol', maxcol);
    animals.map((animal) => {
      var p1 = {
        Group: animal.Group,
        ID: animal.ID,
        RFID: animal.RFID,
        Sex: animal.Sex,
        HighBW: animal.HighBW,
        HighWT: animal.HighWT,
        CCS: animal.CurrentClinicalScore,
        DOB: animal.DOB,
        PreBW: animal.PreBW,
        BW0: animal.BW,
        BS0: animal.BS,
        SMT0: animal.SMT,
        MF0: animal.MF,
        DG0: animal.DG,
        LRS0: animal.LRS
      };

      animal.MeasureWeight.map((measure, index) => {
        const head = `0${index}`;

        p1[`BW${head}`] = measure.BW;
        p1[`BS${head}`] = measure.BS;
        p1[`SMT${head}`] = measure.SMT;
        p1[`MF${head}`] = measure.MF;
        p1[`DG${head}`] = measure.DG;
        p1[`LRS${head}`] = measure.LRS;
      });
      data.push(p1);
    });
    console.log('data', data);

    for (let step = 1; step < maxcol; step++) {
      const children = [];
      children.push({
        headerName: 'BW',
        field: `BW0${step}`,
        width: 80,
        type: 'numericColumn'
      });
      children.push({ headerName: 'BS', field: `BS0${step}`, width: 60 });
      children.push({ headerName: 'SMT', field: `SMT0${step}`, width: 70 });
      children.push({ headerName: 'MF', field: `MF0${step}`, width: 60 });
      children.push({ headerName: 'DG', field: `DG0${step}`, width: 60 });
      children.push({ headerName: 'LRS', field: `LRS0${step}`, width: 70 });
      if (theDates) {
        if (theDatesError[step]) {
          colSet.push({
            headerName: theDates[step],
            children: children,
            headerClass: 'posserror'
          });
        } else {
          colSet.push({
            headerName: theDates[step],
            marryChildren: true,
            children: children
          });
        }
      }
    }
    console.log('colSet', colSet);
    // setrowData(data);
    rowData = data;
    // setcolumnDefs(colSet);
    columnDefs = colSet;
  } else {
    console.log('no animals');
  }

  return (
    <div className="ag-theme-alpine" style={{ height: '80vh', width: '100%' }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
    </div>
  );
}

export default AnimalBWList;
