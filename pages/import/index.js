import Link from 'next/link';

export default function importmain(props) {
  return (
    <>
      <h1>Import Main</h1>
      <Link href={`import/bw`} passHref>
        <h2>
          <a>Import a Body Weight file</a>
        </h2>
      </Link>
    </>
  );
}
