import Link from 'next/link';

function AnimalList({ animals }) {
  console.log('animals', animals);
  return animals
    ? animals.map((animal) => <Animal animal={animal} key={animal.RFID} />)
    : null;
}

function Animal({ animal }) {
  // Naive method to calc word count and read time
  //   const wordCount = post?.content.trim().split(/\s+/g).length;
  //   const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  console.log('animal in Animal func', animal);
  return (
    <div className="listStudy">
      <Link href={`/animals/${animal.RFID}`} passHref>
        <h2>
          <a>{animal.ID}</a>
        </h2>
      </Link>
      <div className="flex space-x-4 ml-3">
        <div style={{ flexBasis: '7rem' }}>RFID</div>
        <div style={{ flexBasis: '3rem' }}>Species</div>
        <div style={{ flexBasis: '3rem' }}>Strain</div>
        <div style={{ flexBasis: '3rem' }}>EarID</div>
        <div style={{ flexBasis: '3rem' }}>Sex</div>
        <div style={{ flexBasis: '6rem' }}>BirthDate</div>
        <div style={{ flexBasis: '4rem' }}>BW</div>
        <div style={{ flexBasis: '10rem' }}>Study</div>
        <div style={{ flexBasis: '3rem' }}>Group</div>
      </div>
      <div className="flex space-x-4 font-bold ml-3">
        <div style={{ flexBasis: '7rem' }}>{animal.RFID}</div>
        <div style={{ flexBasis: '3rem' }}>{animal.Species}</div>
        <div style={{ flexBasis: '3rem' }}>{animal.Strain}</div>
        <div style={{ flexBasis: '3rem' }}>{animal.EarID}</div>
        <div style={{ flexBasis: '3rem' }}>{animal.Sex}</div>
        <div style={{ flexBasis: '6rem' }}>{animal.BirthDate}</div>
        <div style={{ flexBasis: '4rem' }}>{animal.BW}</div>
        <div style={{ flexBasis: '10rem' }}>{animal.Study}</div>
        <div style={{ flexBasis: '3rem' }}>{animal.Group}</div>
      </div>
    </div>
  );
}

export default AnimalList;
