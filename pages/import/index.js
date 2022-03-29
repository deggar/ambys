import Link from 'next/link';
import styles from '../../styles/Home.module.css';

export default function importmain(props) {
  return (
    <main className={styles.main}>
      <section>
        <Link href={`import/bw`} passHref>
          <h2 className={styles.subHeading}>
            <a>Import a Body Weight file</a>
          </h2>
        </Link>
      </section>
    </main>
  );
}
