import Link from 'next/link';

function AnimalBWList({ animals }) {
  console.log('animals', animals);
  return animals
    ? animals.map((animal) => (
        <div key={animal.RFID}>
          <BWListAnimalSection animal={animal} />
        </div>
      ))
    : null;
}

function BWListAnimalSection({ animal }) {
  // Naive method to calc word count and read time
  //   const wordCount = post?.content.trim().split(/\s+/g).length;
  //   const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  console.log('animal in Animal func', animal);
  return (
    <div className="BWListAnimalSection">
      <Link href={`/animals/${animal.RFID}`} passHref>
        <h2>
          <a>{animal.ID}</a>
        </h2>
      </Link>
      <div className="flex space-x-4 font-bold ml-3">
        <div style={{ flexBasis: '3rem' }}>{animal.Group}</div>
        <div style={{ flexBasis: '3rem' }}>{animal.ID}</div>
        <div style={{ flexBasis: '3rem' }}>{animal.RFID}</div>
        <div style={{ flexBasis: '3rem' }}>{animal.Sex}</div>
        <div style={{ flexBasis: '4rem' }}>{animal.HighBW}</div>
        <div style={{ flexBasis: '4rem' }}>{animal.HighWT}</div>
        <div style={{ flexBasis: '3rem' }}>{animal.CurrentClinicalScore}</div>
        <div style={{ flexBasis: '4rem' }}>{animal.DOB}</div>
        <div style={{ flexBasis: '4rem' }}>{animal.PreBW}</div>
        <div style={{ flexBasis: '4rem' }}>{animal.BW}</div>
        <div style={{ flexBasis: '4rem' }}>CS</div>
        <div style={{ flexBasis: '4rem' }}>{animal.BS}</div>
        <div style={{ flexBasis: '4rem' }}>{animal.SMT}</div>
        <div style={{ flexBasis: '4rem' }}>{animal.MF}</div>
        <div style={{ flexBasis: '4rem' }}>{animal.DG}</div>
        <div style={{ flexBasis: '4rem' }}>{animal.LRS}</div>
        <div className="measureArea">
          {Object.entries(animal.MeasureWeight).map((measure, index) => {
            console.log('measure', measure[1]);
            return <BWListAnimalMeasurement key={index} measure={measure[1]} />;
          })}
        </div>
      </div>
    </div>
  );
}

function BWListAnimalMeasurement({ measure }) {
  console.log('measure in measure func', measure);
  return (
    <div className="BWListMeasureSection">
      <div className="flex space-x-4 font-bold ml-3">
        <div style={{ flexBasis: '4rem' }}>{measure.BW}</div>
        <div style={{ flexBasis: '4rem' }}>{measure.CS}</div>
        <div style={{ flexBasis: '4rem' }}>{measure.BS}</div>
        <div style={{ flexBasis: '4rem' }}>{measure.SMT}</div>
        <div style={{ flexBasis: '4rem' }}>{measure.MF}</div>
        <div style={{ flexBasis: '4rem' }}>{measure.DG}</div>
        <div style={{ flexBasis: '4rem' }}>{measure.LRS}</div>
      </div>
    </div>
  );
}

export default AnimalBWList;
