function ManifestTable({ Manifestfile }) {
  return (
    <div className="container mx-auto">
      <table className="table-auto table table-sm table-bordered">
        <thead>
          <tr>
            <th>Crate</th>
            <th>Qty</th>
            <th>Species</th>
            <th>Strain</th>
            <th>Cage ID</th>
            <th>Ear ID</th>
            <th>RFID</th>
            <th>Envigo ID</th>
            <th>Sex</th>
            <th>Birth Date</th>
            <th>Dame</th>
            <th>Sire</th>
            <th>Genotype</th>
            <th>BW</th>
          </tr>
        </thead>
        <tbody>
          {Manifestfile.map((line) => {
            if (line.RFID)
              return (
                <tr key={line.RFID}>
                  <td>{line.Crate ? line.Crate : ``}</td>
                  <td>{line.Qty ? line.Qty : ``}</td>
                  <td>{line.Species}</td>
                  <td>{line.Strain}</td>
                  <td>{line['Cage ID']}</td>
                  <td>{line['Ear ID']}</td>
                  <td>{line.RFID}</td>
                  <td>{line['Envigo ID']}</td>
                  <td>{line.Sex}</td>
                  <td>{line['Birth Date']}</td>
                  <td>{line.Dame}</td>
                  <td>{line.Sire}</td>
                  <td>{line.Genotype}</td>
                  <td>{line.BW}</td>
                </tr>
              );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ManifestTable;
