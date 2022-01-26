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
import Input from '@mui/material/Input';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Image from 'next/image';
import { useState } from 'react';
import {
  doc,
  setDoc,
  collectionGroup,
  getDocs,
  getDoc
} from '@firebase/firestore';
// import Box from '@mui/material/Box';
import { firestore, auth, postToJSON } from '../../lib/firebase';
import { AddCircleOutlineRounded } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from 'next/link';

const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

const defGroup = {
  uid: 'G0',
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

export async function getStaticProps({ params }) {
  const { slug } = params;

  let post;
  let path;

  let proto = slug.slice(0, slug.lastIndexOf('-'));

  const postRef = doc(
    firestore,
    `/Protocols/${proto}/StudyDesign/${slug}/Study`,
    slug
  );
  post = postToJSON(await getDoc(postRef));
  //   console.log(post);
  path = postRef.path;

  return {
    props: { post, path },
    revalidate: 50000
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const collectionRef = collectionGroup(firestore, 'Study');
  const snapshot = await getDocs(collectionRef);

  const paths = snapshot.docs.map((doc) => {
    const { studyNumber } = doc.data();
    const slug = studyNumber.value;
    // console.log('slug', slug);
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

export default function Studies(props) {
  //   console.log(props);
  const buttons = [
    <Button
      key="one"
      onClick={() => {
        uploadToServer();
      }}
    >
      Upload Document
    </Button>
  ];
  const [secondary, setSecondary] = useState(true);

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const [Study, setStudy] = useState(props.post);
  const [Groups, setGroups] = useState(
    props.post.Groups ? props.post.Groups : []
  );

  async function createStudyRecord(Study) {
    const ref = doc(
      firestore,
      `Protocols/${Study.protocolNumber.value}/StudyDesign/${Study.studyNumber.value}/Study/${Study.studyNumber.value}`
    );
    await setDoc(ref, Study);
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

  const addGroup = async () => {
    const seq = Groups ? Groups.length : 0;
    const addGroup = {
      uid: `G${seq}`,
      prefix: alphabet[seq],
      description: `Group ${alphabet[seq]}`,
      population: 0
    };
    setGroups((oldArray) => [...oldArray, addGroup]);
    const newGroup = Groups;
    console.log(newGroup);
    Study.Groups = newGroup;
    setStudy(Study);
    createStudyRecord(Study);
  };

  const removeGroup = (id) => {
    const newGroups = Groups.filter((group) => group.uid !== id);
    setGroups(newGroups);
    Study.Groups = newGroups;
    setStudy(Study);
    createStudyRecord(Study);
  };

  const someFunction = function (e) {
    const theText = e.target.innerText;
    console.log(e.target.innerText);
    console.log(e.target.id);
    // this.setState({html: event.target.value});
    const theID = e.target.id.replace('gd', '');
    console.log(theID);
    const index = Groups.findIndex((fruit) => fruit.uid === theID);
    console.log('index: ', index);
    const updateGroup = Groups[index];
    updateGroup.description = theText;
    console.log(updateGroup);
    Groups[index] = updateGroup;
    setGroups(Groups);
    console.log(Groups);
    Study.Groups = Groups;
    setStudy(Study);
    createStudyRecord(Study);
  }.bind(this);

  return (
    <main className="m-5">
      <H3>
        <a href="#">Studies</a>
      </H3>
      <div className="flex space-x-4">
        <Card className="flex-1" interactive={true} elevation={Elevation.ONE}>
          <H5>
            <a href="#">Study Information</a>
          </H5>

          <div className="flex space-x-4 m-2">
            <TextField
              sx={{ flexShrink: 0 }}
              // className="flex-1"
              id="standard-basic"
              label="Study ID"
              variant="standard"
              value={Study.studyNumber.value}
            />
            <TextField
              sx={{ width: 90 }}
              // className="flex-shrink"
              id="standard-basic"
              label="Study Incr"
              variant="standard"
              value={Study.studyIncr.value}
            />
            <TextField
              className="flex-1"
              id="standard-basic"
              label="Protocol Number"
              variant="standard"
              value={Study.protocolNumber.value}
            />
          </div>
          <div className="flex space-x-4 m-2">
            <TextField
              className="flex-1"
              id="standard-basic"
              label="Primary Investigator"
              variant="standard"
              value={Study.primaryInvestigators.value}
            />
            <TextField id="standard-basic" label="Date" variant="standard" />
          </div>
          <div className="flex space-x-4 m-2">
            <TextField
              multiline
              maxRows={4}
              className="flex-1"
              id="standard-basic"
              label="Title of Study"
              variant="standard"
              value={Study.titleOfStudy.value}
            />
          </div>
        </Card>
        <Card className="flex-1" interactive={true} elevation={Elevation.ONE}>
          <H5>
            <a href="#">Animal Information</a>
          </H5>
          <div className="flex space-x-4 m-2">
            <TextField
              className="flex-1"
              id="standard-basic"
              label="Transplant Date"
              variant="standard"
              value={Study.transplantDate.value}
            />
            <TextField
              className="flex-1"
              id="standard-basic"
              label="Number of Animals"
              variant="standard"
              value={Study.numberOfAnimals.value}
            />
            <TextField
              id="standard-basic"
              label="Species"
              variant="standard"
              value={Study.species.value}
            />
            <TextField
              id="standard-basic"
              label="Strain"
              variant="standard"
              value={Study.strain.value}
            />
          </div>
          <div className="flex space-x-4 m-2">
            <TextField
              id="standard-basic"
              label="Gender"
              variant="standard"
              value={Study.gender.value}
            />
            <TextField
              id="standard-basic"
              label="Age Range"
              variant="standard"
              value={Study.ageOrWeightRange.value}
            />
            <TextField
              id="standard-basic"
              label="Weight Range"
              variant="standard"
              value={Study.ageOrWeightRange.value}
            />
          </div>
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
              Upload Study File
              <input
                type="file"
                hidden
                name="myImage"
                onChange={uploadToClient}
              />
            </Button>
            {/* {`/blog/${encodeURIComponent(post.slug)}`} */}
          </div>
          <div>
            <Link href={`/recshipment?sn=${Study.studyNumber.value}`} passHref>
              <Button
                component="label"
                className="mt-3"
                icon="projects"
                text="Receive Shipping Manifest"
              >
                Receive Shipping Manifest
              </Button>
            </Link>
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
      <div className="flex space-x-4 mt-4">
        <Card
          className="flex-2 flex-grow"
          interactive={true}
          elevation={Elevation.ONE}
        >
          <H5>
            <a href="#">Details</a>
          </H5>
          <div className="flex space-x-4">
            <TextField
              className="flex-1"
              id="standard-basic"
              label="PHH source"
              variant="standard"
            />
            <TextField
              className="flex-1"
              id="standard-basic"
              label="AduPA lot"
              variant="standard"
              value={Study.ambysLot.value}
            />
            <TextField
              className="flex-1"
              id="standard-basic"
              label="Start of Study"
              variant="standard"
            />
            <TextField
              className="flex-1"
              id="standard-basic"
              label="End of Study"
              variant="standard"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <TextField
              className="flex-1"
              id="outlined-multiline-flexible"
              label="Purpose"
              multiline
              minRows={4}
              value={Study.purpose.value}
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <TextField
              className="flex-1"
              id="outlined-multiline-flexible"
              label="PreConditioning"
              multiline
              minRows={4}
            />
          </div>
          <div className="flex space-x-4"></div>
          <div className="flex space-x-4 mt-4">
            <TextField
              className="flex-1"
              id="outlined-multiline-flexible"
              label="Comments"
              multiline
              minRows={4}
            />
          </div>
          <p> </p>
        </Card>
        <Card className="flex-1 flex-shink">
          {Study.test != 'test' && (
            <>
              <Typography sx={{ mt: 0, mb: 0 }} variant="h6" component="div">
                Groups
              </Typography>
              <IconButton
                edge="end"
                aria-label="add group"
                onClick={() => {
                  console.log('adding group');
                  addGroup();
                }}
              >
                <AddCircleIcon />
              </IconButton>
              <p>List of groups for this study:</p>

              {Groups && (
                <List dense={true}>
                  {Groups.map((group) => {
                    return (
                      <ListItem
                        key={group.uid}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => removeGroup(group.uid)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>{group.prefix}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={group.prefix}
                          secondaryTypographyProps={{
                            contenteditable: 'true',
                            id: 'gd' + group.uid,
                            onInput: someFunction
                          }}
                          secondary={secondary ? group.description : null}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </>
          )}
        </Card>
      </div>
    </main>
  );
}
