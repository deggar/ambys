import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/table/lib/css/table.css';

function RosterTableNoDND({ Roster, setRoster, Groups }) {
  const columns = [
    { key: 'Group', name: 'Group', width: '3rem' },
    { key: 'ID', name: 'ID', width: '4rem' },
    { key: 'Crate', name: 'Crate', width: '4rem' },
    // { key: 'Qty', name: 'Qty', width: '3rem' },
    // { key: 'Species', name: 'Species', width: '4rem' },
    // { key: 'Strain', name: 'Strain', width: '4rem' },
    { key: 'CageID', name: 'CageID', width: '4rem' },
    { key: 'EarID', name: 'EarID', width: '2rem' },
    { key: 'RFID', name: 'RFID', width: '6rem' },
    { key: 'EnvigoID', name: 'EnvigoID', width: '6rem' },
    { key: 'Sex', name: 'Sex', width: '4rem' },
    { key: 'BirthDate', name: 'Birth Date', width: '5rem' },
    { key: 'Dame', name: 'Dame', width: '6rem' },
    { key: 'Sire', name: 'Sire', width: '6rem' },
    { key: 'Genotype', name: 'Genotype', width: '8rem' },
    { key: 'BW', name: 'BW', width: '3rem' },
    { key: 'CloudyEyes', name: 'Cloudy', width: '3rem' }
  ];

  const colhead = columns.map((col) => {
    // console.log(col);
    return (
      <div style={{ flexBasis: `${col.width}` }} key={col.key}>
        {col.name}
      </div>
    );
  });

  const data = Roster;
  const groupList = [...new Set(data.map((item) => item.Group))];

  var drid = '';
  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <div className="rosterhead" key="colhead">
        {colhead}
      </div>

      {groupList.map(function (group) {
        let groupedRoster = Roster.filter(function (line) {
          return line.Group == group;
        });

        drid = group;

        let groupIs = Groups.filter(function (line) {
          return line.prefix == drid;
        });

        return (
          <div key={drid}>
            <div className="groupNameHead">
              Group <span>{drid}</span>
              <div className="inline text-sm pl-3">
                {groupIs[0].description}
              </div>
            </div>
            {groupedRoster.map(function (line, index) {
              const lineset = columns.map((col) => {
                return (
                  <div
                    style={{ flexBasis: `${col.width}` }}
                    key={col.key + line.ID}
                  >
                    {line[col.key]}
                  </div>
                );
              });
              return (
                <div key={line.ID} className="rosterline">
                  {lineset}
                </div>
              );
            })}
            ;
          </div>
        );
      })}
    </div>
  );
}

export default RosterTableNoDND;
