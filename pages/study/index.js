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
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Image from 'next/image';
import { useState } from 'react';
// import Box from '@mui/material/Box';
import { firestore, auth, postToJSON } from '../../lib/firebase';
import StudyListItem from '../../components/StudyListItem';
import PostFeed from '../../components/PostFeed';
import Router from 'next/router';

const defGroup = {
  uid: 'G1',
  prefix: 'A',
  description: 'Group A',
  population: 0
};

const defStudy = {
  test: '',
  transplantDate: {
    name: 'Transplant Date',
    value: ''
  },
  protocolNumber: {
    name: 'Protocol Number',
    value: ''
  },
  studyNumber: {
    name: 'Study Number',
    value: ''
  },
  studyIncr: {
    name: 'Study Incr',
    value: ''
  },
  species: {
    name: 'Species',
    value: ''
  },
  gender: {
    name: 'Gender',
    value: ''
  },
  strain: {
    name: 'Strain',
    value: ''
  },
  titleOfStudy: {
    name: 'Title of Study',
    value: ''
  },
  primaryInvestigators: {
    name: 'Primary Investigators',
    value: ''
  },
  numberOfAnimals: {
    name: 'Number of Animals',
    value: ''
  },
  ageOrWeightRange: {
    name: 'Age or weight range',
    value: ''
  },
  purpose: {
    name: 'Purpose:',
    value: ''
  },
  ambysLot: {
    name: 'Ambys Lot',
    value: ''
  },
  All: {
    name: 'AllText',
    value: ''
  }
};

export async function getServerSideProps(context) {
  const collectionRef = collectionGroup(firestore, 'Study');
  //   const collectionQuery = query(
  //     collectionRef,
  //     where('published', '==', true),
  //     orderBy('createdAt', 'desc'),
  //     limit(LIMIT)
  //   );
  const postsQuery = await getDocs(collectionRef);
  //   console.log(postsQuery);
  const posts = await postsQuery.docs.map(postToJSON);
  //   console.log('posts', posts);
  return {
    props: { posts } // will be passed to the page component as props
  };
}

export default function StudyListing(props) {
  const [posts, setPosts] = useState(props.posts);
  const buttons = [
    <Button
      key="one"
      variant="contained"
      component="label"
      color="success"
      className="mt-3"
      onClick={() => {
        uploadToServer();
      }}
    >
      Upload Document
    </Button>
    // <Button key="two">Update Document</Button>,
    // <Button key="three">Open Document</Button>
  ];
  const [secondary, setSecondary] = useState(true);

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const [Study, setStudy] = useState(defStudy);
  const [Groups, setGroups] = useState([defGroup]);

  async function createStudyRecord(Study) {
    const ref = doc(
      firestore,
      `Protocols/${Study.protocolNumber.value}/StudyDesign/${Study.studyNumber.value}/Study/${Study.studyNumber.value}`
    );
    await setDoc(ref, Study);
    const theURL = `/study/${Study.studyNumber.value}`;
    // console.log('theURL', theURL);
    Router.push(theURL);
  }
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append('file', image);
    // console.log(body);
    // console.log('====prereq===');
    const response = await fetch('/api/file', {
      method: 'POST',
      body
    });
    if (response.ok) {
      const theData = await response.json();
      //   console.log(theData);
      setStudy(theData);
      createStudyRecord(theData);
    }
  };

  return (
    <main className="m-5">
      <H3>
        <a href="#">Studies</a>
      </H3>
      <div className="flex space-x-4">
        <Card className="flex-1" interactive={true} elevation={Elevation.ONE}>
          <PostFeed posts={posts} />
        </Card>

        <Card
          className="flex-shink"
          interactive={true}
          elevation={Elevation.TWO}
        >
          <div>
            {/* <img src={createObjectURL} alt="add file" /> */}
            {/* <h4>Select Document</h4> */}
            <Button variant="contained" component="label">
              Select File
              <input
                type="file"
                hidden
                name="myImage"
                onChange={uploadToClient}
              />
            </Button>
          </div>
          {image && (
            <ButtonGroup
              orientation="vertical"
              aria-label="vertical contained button group"
              variant="contained"
            >
              {buttons}
            </ButtonGroup>
          )}
        </Card>
      </div>
    </main>
  );
}
