import Link from 'next/link';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function AnimalBWList({ animals, BWdates }) {
  //   console.log('animals', animals);
  //   const [rowData, setrowData] = useState(null);
  //   const [columnDefs, setcolumnDefs] = useState(null);
  const theDates = BWdates;
  console.log('theDates', theDates);
  var data = [];
  var colSet = [
    { headerName: 'Group', field: 'Group', pinned: 'left', width: 80 },
    { headerName: 'Animal ID', field: 'ID', pinned: 'left', width: 100 },
    { headerName: 'Chip #', field: 'RFID', pinned: 'left', width: 120 },
    { headerName: 'Sex', field: 'Sex', pinned: 'left', width: 70 },
    { headerName: 'Highest BW', field: 'HighBW', pinned: 'left', width: 100 },
    { headerName: '% BW Loss', field: 'HighWT', pinned: 'left', width: 100 },
    {
      headerName: 'Current Clinical Score',
      field: 'CCS',
      pinned: 'left',
      width: 100
    },
    { headerName: 'DOB', field: 'DOB', pinned: 'left', width: 90 },
    {
      headerName: 'PreShipment BW',
      field: 'PreBW',
      pinned: 'left',
      width: 90
    },
    { headerName: 'BW', field: 'BW0', pinned: 'left', width: 50 },
    { headerName: 'Clinical Score', field: 'BS0', pinned: 'left', width: 50 },
    { headerName: 'SMT', field: 'SMT0', pinned: 'left', width: 50 },
    { headerName: 'MF', field: 'MF0', pinned: 'left', width: 50 },
    { headerName: 'DG', field: 'DG0', pinned: 'left', width: 50 },
    { headerName: 'LRS', field: 'LRS0', pinned: 'left', width: 50 }
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
      // Runs 5 times, with values of step 0 through 4.
      //   console.log('Walking east one step');
      // { headerName: 'Col A', field: 'a'},
      const children = [];
      children.push({ headerName: 'BW', field: `BW0${step}`, width: 80 });
      children.push({ headerName: 'BS', field: `BS0${step}`, width: 60 });
      children.push({ headerName: 'SMT', field: `SMT0${step}`, width: 70 });
      children.push({ headerName: 'MF', field: `MF0${step}`, width: 60 });
      children.push({ headerName: 'DG', field: `DG0${step}`, width: 60 });
      children.push({ headerName: 'LRS', field: `LRS0${step}`, width: 70 });
      if (theDates) {
        colSet.push({ headerName: theDates[step], children: children });
      }
    }
    console.log('colSet', colSet);
    // setrowData(data);
    const rowData = data;
    // setcolumnDefs(colSet);
    const columnDefs = colSet;
  }

  return (
    <div className="ag-theme-alpine" style={{ height: '80vh', width: '100%' }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
    </div>
  );
}

export default AnimalBWList;