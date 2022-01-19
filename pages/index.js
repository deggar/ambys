import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Button, Intent, Spinner } from '@blueprintjs/core';
import Loader from '../components/Loader';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Ambys!</a>
        </h1>
        {/* <Spinner intent={Intent.PRIMARY} /> */}
      </main>
    </div>
  );
}
