import AnimalBWList2 from './AnimalBWList2';

function BWTable({ BWdata, BWdates, BWfile }) {
  function createLine(animalList, arr) {
    const alist2 = animalList.map(function (line, index) {
      return (
        <div key={line.ID}>
          {line.ID} {line.RFID}
        </div>
      );
    });
    return alist2;
  }

  return (
    <div>
      <h2>{BWfile.StudyNumber}</h2>
      <AnimalBWList2 animals={BWdata} BWdates={BWdates}></AnimalBWList2>
    </div>
  );
}

export default BWTable;
