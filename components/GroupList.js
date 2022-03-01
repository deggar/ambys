import { useState } from 'react';
import { doc, setDoc, getDoc } from '@firebase/firestore';
import { firestore, auth, postToJSON } from '../lib/firebase';

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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

function GroupList({ theStudy, Groups, setGroups, Study, setStudy }) {
  //   console.log('theStudy.Groups', theStudy.Groups);
  // const [Study, setStudy] = useState(theStudy);
  // const [Groups, setGroups] = useState(theStudy.Groups);
  const [secondary, setSecondary] = useState(true);
  const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

  async function createStudyRecord(Study) {
    const ref = doc(
      firestore,
      `Protocols/${Study.protocolNumber.value}/StudyDesign/${Study.studyNumber.value}/Study/${Study.studyNumber.value}`
    );
    await setDoc(ref, Study);
  }

  const addGroup = async () => {
    const seq = Groups.length;
    const addGroup = {
      uid: `G${seq}`,
      prefix: alphabet[seq],
      description: `Group ${alphabet[seq]}`,
      population: 0
    };
    // console.log('Groups prev', Groups);
    setGroups((oldArray) => [...oldArray, addGroup]);
    const addingGroups = Groups;
    addingGroups.push(addGroup);
    Study.Groups = addingGroups;
    setStudy(Study);

    // Groups.push(addGroup);
    // setGroups(Study.Groups);
    // console.log('Groups added?', Groups);
    // Study.Groups = Groups;
    // setStudy(Study);
    // console.log('Study Groups added?', Study);
    createStudyRecord(Study);
  };

  const removeGroup = (id) => {
    const newGroups = Groups.filter((group) => group.uid !== id);
    setGroups(newGroups);
    Study.Groups = newGroups;
    setStudy(Study);
    createStudyRecord(Study);
    // console.log('Groups removed?', Groups);
  };

  const sfunction = function (e, group) {
    // console.log('group', group);
    // console.log('e', e);
    // console.log('e.target.value', e.target.value);
    const theText = e.target.value;
    const theID = e.target.id; //.replace('gd', '');
    // console.log('theText', theText, 'theID', theID);
    const index = Groups.findIndex((g) => g.uid === group.uid);
    // console.log('updateGroup index', index);
    const updateGroup = Groups[index];
    // console.log('updateGroup', updateGroup);
    updateGroup.description = theText;
    // console.log('updateGroup changed?', updateGroup);
    Groups[index] = updateGroup;
    // console.log('Groups', Groups);
    setGroups(Groups);
    // console.log('Groups', Groups);
    Study.Groups = Groups;
    setStudy(Study);
    createStudyRecord(Study);
  };

  const someFunction = function (e) {
    const theText = e.target.innerText;
    const theID = e.target.id.replace('gd', '');
    // console.log('theText', theText, 'theID', theID);
    const index = Groups.findIndex((group) => group.uid === theID);
    const updateGroup = Groups[index];
    // console.log('updateGroup', updateGroup);
    updateGroup.description = theText;
    Groups[index] = updateGroup;
    setGroups(Groups);
    Study.Groups = Groups;
    setStudy(Study);
    // createStudyRecord(Study);
  }.bind(this);
  return (
    <Card
      className="flex-1 flex-shink"
      elevation={Elevation.TWO}
      sx={{ maxWidth: '35rem', minWidth: '20rem' }}
    >
      {Study.Groups && (
        <>
          <Typography
            sx={{ mt: 0, mb: 0, display: 'inline-flex' }}
            variant="h6"
            component="div"
          >
            Groups
          </Typography>
          <IconButton
            edge="end"
            aria-label="add group"
            onClick={() => {
              addGroup();
            }}
          >
            <AddCircleIcon />
          </IconButton>
          <p>List of groups for this study:</p>

          <List dense={true}>
            {Groups.map((group) => {
              return (
                <ListItem
                  // suppressContentEditableWarning={true}
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
                  <TextField
                    // {...defaultDvp}
                    // floatingLabelText={'Group Description'}
                    size="small"
                    onChange={(evt) => sfunction(evt, group)}
                    defaultValue={group.description}
                    variant="standard"
                  />
                  <ListItemText
                    // suppressContentEditableWarning={true}
                    secondary={group.prefix}
                    // primary={
                    // }
                    // secondary={secondary ? group.description : null}
                    // secondaryTypographyProps={{
                    //   contentEditable: 'true',
                    //   id: 'gd' + group.uid,
                    //   onInput: someFunction
                    // }}
                  />
                </ListItem>
              );
            })}
          </List>
        </>
      )}
    </Card>
  );
}

export default GroupList;
