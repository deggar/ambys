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
import { doc, setDoc } from '@firebase/firestore';
// import Box from '@mui/material/Box';
import { firestore, auth } from '../lib/firebase';

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

export default function Studies({}) {
  const buttons = [
    <Button
      key="one"
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
    console.log(body);
    console.log('====prereq===');
    const response = await fetch('/api/file', {
      method: 'POST',
      body
    });
    if (response.ok) {
      const theData = await response.json();
      console.log(theData);
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
              Select File
              <input
                type="file"
                hidden
                name="myImage"
                onChange={uploadToClient}
              />
            </Button>
            {/* <input
              className="form-control"
              type="file"
              name="myImage"
              onChange={uploadToClient}
            /> */}
            {/* <button
              className="btn btn-primary"
              type="submit"
              onClick={uploadToServer}
            >
              Send to server
            </button> */}
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
          {Study.test == 'test' && (
            <>
              <Typography sx={{ mt: 0, mb: 0 }} variant="h6" component="div">
                Groups
              </Typography>
              <p>List of groups for this study:</p>

              <List dense={true}>
                {Groups.map((group) => {
                  return (
                    <ListItem
                      key={group.uid}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>A</Avatar>
                        {/* <Avatar>
                          <FolderIcon />
                        </Avatar> */}
                      </ListItemAvatar>
                      <ListItemText
                        primary={group.prefix}
                        secondary={secondary ? group.description : null}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </>
          )}
        </Card>
      </div>
    </main>
  );
}
