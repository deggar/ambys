import { HotkeysProvider } from '@blueprintjs/core';
import { Column, Table2, Cell } from '@blueprintjs/table';
import { SelectionModes } from '@blueprintjs/table';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/table/lib/css/table.css';

function RosterTable({ Roster }) {
  //   const columns = [
  //     { key: 'Crate', name: 'Crate' },
  //     { key: 'Qty', name: 'Qty' },
  //     { key: 'Species', name: 'Species' },
  //     { key: 'Strain', name: 'Strain' },
  //     { key: 'CageID', name: 'CageID' },
  //     { key: 'EarID', name: 'EarID' },
  //     { key: 'RFID', name: 'RFID' },
  //     { key: 'EnvigoID', name: 'EnvigoID' },
  //     { key: 'Sex', name: 'Sex' },
  //     { key: 'BirthDate', name: 'BirthDate' },
  //     { key: 'Dame', name: 'Dame' },
  //     { key: 'Sire', name: 'Sire' },
  //     { key: 'Genotype', name: 'Genotype' },
  //     { key: 'BW', name: 'BW' },
  //     { key: 'ID', name: 'ID' },
  //     { key: 'Study', name: 'Study' }
  //   ];

  const data = Roster;
  const getCellData = (rowIndex, columnIndex) => {
    return data[rowIndex][columnIndex];
  };

  console.log(data);
  console.log(data[0]['Crate']);

  //   myRender = (key) => (rowIndex) => {
  //     return <Cell>{this.data[rowIndex][key]}</Cell>;
  //   };

  //   const cellRenderer = (rowIndex, columnIndex) => (
  //     <Cell>{(data[rowIndex][columnIndex], arguments)}</Cell>
  //   );

  const colhead = [
    'Crate',
    'Qty',
    'Species',
    'Strain',
    'CageID',
    'EarID',
    'RFID',
    'EnvigoID',
    'Sex',
    'BirthDate',
    'Dame',
    'Sire',
    'Genotype',
    'BW',
    'ID',
    'Study'
  ];

  const cellRenderer = (index, columnIndex) => {
    const col = colhead[columnIndex];
    return <Cell>{Roster[index][col]}</Cell>;
  };

  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <HotkeysProvider>
        <Table2
          numRows={Roster.length}
          data={Roster}
          selectionModes={SelectionModes.ROWS_ONLY}
        >
          <Column key={0} name="Crate" cellRenderer={cellRenderer} />
          <Column key={1} name="Qty" cellRenderer={cellRenderer} />
          <Column key={2} name="Species" cellRenderer={cellRenderer} />
          <Column key={3} name="Strain" cellRenderer={cellRenderer} />
          <Column key={4} name="CageID" cellRenderer={cellRenderer} />
          <Column key={5} name="EarID" cellRenderer={cellRenderer} />
          <Column key={6} name="RFID" cellRenderer={cellRenderer} />
          <Column key={7} name="EnvigoID" cellRenderer={cellRenderer} />
          <Column key={8} name="Sex" cellRenderer={cellRenderer} />
          <Column key={9} name="BirthDate" cellRenderer={cellRenderer} />
          <Column key={10} name="Dame" cellRenderer={cellRenderer} />
          <Column key={11} name="Sire" cellRenderer={cellRenderer} />
          <Column key={12} name="Genotype" cellRenderer={cellRenderer} />
          <Column key={13} name="BW" cellRenderer={cellRenderer} />
          <Column key={14} name="ID" cellRenderer={cellRenderer} />
          <Column key={15} name="Study" cellRenderer={cellRenderer} />
        </Table2>
      </HotkeysProvider>
    </div>
  );
}

export default RosterTable;
