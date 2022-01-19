import { useState } from 'react';
import { doc, setDoc, getDoc } from '@firebase/firestore';
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

export async function getServerSideProps(context) {
  const slug = context.query.sn;
  const proto = slug.slice(0, slug.lastIndexOf('-'));
  const postRef = doc(
    firestore,
    `/Protocols/${proto}/StudyDesign/${slug}/Study`,
    slug
  );
  const study = postToJSON(await getDoc(postRef));
  const path = postRef.path;
  return {
    props: { study, path }
  };
}

export default function RecShipment(props) {
  //   console.log(props.study);
  const [Study, setStudy] = useState(props.study);
  const [Groups, setGroups] = useState(props.study.Groups);
  const [Manifestfile, setManifestfile] = useState(null);
  const [Roster, setRoster] = useState(null);
  const [AnimalStartID, setAnimalStartID] = useState(null);

  return (
    <>
      <Typography variant="h5" sx={{ margin: '.7rem' }}>
        Shipping Manifest for {Study.studyNumber.value}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        <GroupList theStudy={Study} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <UploadManifest
            Manifestfile={Manifestfile}
            setManifestfile={setManifestfile}
            AnimalStartID={AnimalStartID}
            setAnimalStartID={setAnimalStartID}
            Roster={Roster}
            setRoster={setRoster}
            Study={Study}
          />
        </Box>
      </Box>
      {Manifestfile && Roster == null && (
        <ManifestTable Manifestfile={Manifestfile} />
      )}
      {Roster && <RosterTable2 Roster={Roster} />}
    </>
  );
}
