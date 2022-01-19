import { HotkeysProvider } from '@blueprintjs/core';
import { Column, Table2, Cell } from '@blueprintjs/table';
import { SelectionModes } from '@blueprintjs/table';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/table/lib/css/table.css';

function RosterTable({ Roster }) {
  const columns = [
    { key: 'Group', name: 'Group', width: '4rem' },
    { key: 'ID', name: 'ID', width: '4rem' },
    { key: 'Crate', name: 'Crate', width: '4rem' },
    // { key: 'Qty', name: 'Qty', width: '3rem' },
    // { key: 'Species', name: 'Species', width: '4rem' },
    // { key: 'Strain', name: 'Strain', width: '4rem' },
    { key: 'CageID', name: 'CageID', width: '4rem' },
    { key: 'EarID', name: 'EarID', width: '3rem' },
    { key: 'RFID', name: 'RFID', width: '6rem' },
    { key: 'EnvigoID', name: 'EnvigoID', width: '6rem' },
    { key: 'Sex', name: 'Sex', width: '4rem' },
    { key: 'BirthDate', name: 'Birth Date', width: '5rem' },
    { key: 'Dame', name: 'Dame', width: '6rem' },
    { key: 'Sire', name: 'Sire', width: '6rem' },
    { key: 'Genotype', name: 'Genotype', width: '8rem' },
    { key: 'BW', name: 'BW', width: '3rem' }
  ];

  const colhead = columns.map((col) => {
    console.log(col);
    return (
      <div style={{ flexBasis: `${col.width}` }} key={col.key}>
        {col.name}
      </div>
    );
  });

  console.log('colhead', colhead);

  const data = Roster;

  const dataLine = Roster.map(function (line) {
    const lineset = columns.map((col) => {
      return <div key={col.key + line.ID}>{line[col.key]}</div>;
    });
    return lineset;
  });

  console.log('dataLine', dataLine);

  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <div className="rosterhead" key="colhead">
        {colhead}
      </div>
      {Roster.map(function (line) {
        const lineset = columns.map((col) => {
          return (
            <div style={{ flexBasis: `${col.width}` }} key={col.key + line.ID}>
              {line[col.key]}
            </div>
          );
        });
        return (
          <div className="rosterline" key={line.ID}>
            {lineset}
          </div>
        );
      })}
    </div>
  );
}

export default RosterTable;
