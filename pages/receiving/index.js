import {
  getDocs,
  collection,
  query,
  setDoc,
  serverTimestamp,
  where,
  orderBy,
  limit,
  doc,
  collectionGroup
} from '@firebase/firestore';
import { Card, Elevation, H3, H5 } from '@blueprintjs/core';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from 'react';
// import Box from '@mui/material/Box';
import { firestore, auth, postToJSON } from '../../lib/firebase';
import PostFeed from '../../components/PostFeed';
import Router from 'next/router';
import RosterList from '../../components/RosterList';

export async function getServerSideProps(context) {
  const collectionRef = collection(firestore, 'Rosters');
  //   const collectionQuery = query(
  //     collectionRef,
  //     where('published', '==', true),
  //     orderBy('createdAt', 'desc'),
  //     limit(LIMIT)
  //   );
  const postsQuery = await getDocs(collectionRef);
  console.log(postsQuery);
  const rosters = await postsQuery.docs.map(postToJSON);
  console.log('rosters', rosters);
  return {
    props: { rosters } // will be passed to the page component as props
  };
}

export default function StudyListing(props) {
  const [Rosters, setRosters] = useState(props.rosters);
  console.log('Rosters', Rosters);
  const buttons = [
    <Button
      key="one"
      onClick={() => {
        console.log('clicked');
      }}
    >
      Upload Document
    </Button>
  ];

  return (
    <main className="m-5">
      <H3>
        <a href="#">Rosters</a>
      </H3>
      <div className="flex space-x-4">
        <Card className="flex-1" interactive={true} elevation={Elevation.ONE}>
          <RosterList rosters={Rosters} />
        </Card>

        <Card
          className="flex-shink"
          interactive={true}
          elevation={Elevation.TWO}
        >
          <div></div>

          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="contained"
          >
            {buttons}
          </ButtonGroup>
        </Card>
      </div>
    </main>
  );
}
