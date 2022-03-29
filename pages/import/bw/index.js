import { useState } from 'react';
import {
  doc,
  setDoc,
  getDoc,
  collectionGroup,
  getDocs
} from '@firebase/firestore';
import { firestore, auth, postToJSON } from '../../../lib/firebase';
import BWTable from '../../../components/BWTable';
import styles from '../../../styles/Home.module.css';

import { Card, Elevation, H3, H5 } from '@blueprintjs/core';
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography
} from '@mui/material';

import ParseBWworksheet from '../../../util/ParseBWworksheet';

export async function getServerSideProps(context) {
  // console.log('context', context);
  return {
    props: {} // will be passed to the page component as props
  };
}

export default function ImportingBW(props) {
  //   console.log(props);
  const [BWfile, setBWfile] = useState(null);
  const [BWanimals, setBWanimals] = useState(null);
  const [BWdates, setBWdates] = useState(null);

  const callReader = function (data) {
    console.log('data 41', data);
    setBWfile(data);
    setBWanimals(data.animals);
    setBWdates(data.theDates);
  };
  const selectBW = async (event) => {
    // console.log('parse BW', event);

    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      // console.log('i', i);
      // console.log('event.nativeEvent', event.nativeEvent);
      const parser = ParseBWworksheet;
      // const result = await parser(event.nativeEvent, setBWfile);
      ParseBWworksheet(event.nativeEvent, callReader).then((data) => {
        console.log('data async54');
        console.log(data);
        // setBWfile(data);
      });
    }
  };

  return (
    <main className={styles.main}>
      <section>
        <Button variant="contained" component="label">
          Upload BW File
          <input type="file" hidden name="bwfile" onChange={selectBW} />
        </Button>
      </section>
      <section className={styles.bwsection}>
        {BWanimals && (
          <BWTable BWdata={BWanimals} BWdates={BWdates} BWfile={BWfile} />
        )}
      </section>
    </main>
  );
}
