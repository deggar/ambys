import Link from 'next/link';

function RosterList({ rosters }) {
  console.log('rosters', rosters);
  return rosters
    ? rosters.map((roster) => <Roster roster={roster} key={roster.Study} />)
    : null;
}

function Roster({ roster }) {
  // Naive method to calc word count and read time
  //   const wordCount = post?.content.trim().split(/\s+/g).length;
  //   const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  console.log('rosters in func', roster);
  return (
    <div className="listStudy">
      <Link href={`/receiving/${roster.ID}`} passHref>
        <h2>
          <a>{roster.Study}</a>
        </h2>
      </Link>
    </div>
  );
}

export default RosterList;
