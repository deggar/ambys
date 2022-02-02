import { useState } from 'react';
import {
  doc,
  setDoc,
  getDoc,
  collectionGroup,
  getDocs
} from '@firebase/firestore';
import { firestore, auth, postToJSON } from '../../lib/firebase';

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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupList from '../../components/GroupList';
import UploadManifest from '../../components/UploadManifest';
import ManifestTable from '../../components/ManifestTable';
import RosterTable2 from '../../components/RosterTable2';
import ExportRoster from '../../components/ExportRoster';

export async function getStaticProps({ params }) {
  const { slug } = params;
  //   const slug = context.query.sn;
  const rosterRef = await doc(firestore, `/Rosters`, slug);
  const roster = postToJSON(await getDoc(rosterRef));
  const studyNumber = roster.Study;
  console.log('studyNumber', studyNumber);
  const proto = studyNumber.slice(0, studyNumber.lastIndexOf('-'));
  const postRef = doc(
    firestore,
    `/Protocols/${proto}/StudyDesign/${studyNumber}/Study`,
    studyNumber
  );
  const study = postToJSON(await getDoc(postRef));
  const path = postRef.path;
  return {
    props: { study, path, roster }
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const collectionRef = collectionGroup(firestore, 'Rosters');
  const snapshot = await getDocs(collectionRef);

  const paths = snapshot.docs.map((doc) => {
    const { ID } = doc.data();
    const slug = ID;
    console.log('slug', slug);
    return {
      params: { slug }
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking'
  };
}

export default function Receiving(props) {
  //   console.log(props);
  const [Study, setStudy] = useState(props.study);
  const [Groups, setGroups] = useState(props.study.Groups);
  //   console.log('props.study.Groups', props.study.Groups);
  const [Manifestfile, setManifestfile] = useState(props.roster.Manifestfile);
  const [Roster, setRoster] = useState(props.roster.List);
  const [AnimalStartID, setAnimalStartID] = useState('');

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h6" sx={{ margin: '.7rem', display: 'inline' }}>
          Group Roster for {Study.studyNumber.value}
        </Typography>
        <ExportRoster Roster={props.roster} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        {/* <GroupList
          theStudy={Study}
          Groups={Groups}
          setGroups={setGroups}
          Study={Study}
          setStudy={setStudy}
        /> */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          {/* <UploadManifest
            Manifestfile={Manifestfile}
            setManifestfile={setManifestfile}
            AnimalStartID={AnimalStartID}
            setAnimalStartID={setAnimalStartID}
            Roster={Roster}
            setRoster={setRoster}
            Study={Study}
          /> */}
        </Box>
      </Box>
      {Manifestfile && Roster == null && (
        <ManifestTable Manifestfile={Manifestfile} />
      )}
      {Roster && (
        <RosterTable2 Roster={Roster} setRoster={setRoster} Groups={Groups} />
      )}
    </>
  );
}
