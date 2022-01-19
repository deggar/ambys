import { useState } from 'react';

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

function GroupList({ theStudy }) {
  //   console.log('theStudy.Groups', theStudy.Groups);
  const [Study, setStudy] = useState(theStudy);
  const [Groups, setGroups] = useState(theStudy.Groups);
  const [secondary, setSecondary] = useState(true);
  const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

  const addGroup = async () => {
    const seq = Groups.length;
    const addGroup = {
      uid: `G${seq}`,
      prefix: alphabet[seq],
      description: `Group ${alphabet[seq]}`,
      population: 0
    };
    setGroups((oldArray) => [...oldArray, addGroup]);
  };

  const removeGroup = (id) => {
    const newGroups = Groups.filter((group) => group.uid !== id);
    setGroups(newGroups);
  };

  const someFunction = function (e) {
    const theText = e.target.innerText;
    const theID = e.target.id.replace('gd', '');
    const index = Groups.findIndex((group) => group.uid === theID);
    const updateGroup = Groups[index];
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
                  suppressContentEditableWarning={true}
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
                    suppressContentEditableWarning={true}
                    primary={group.prefix}
                    secondary={secondary ? group.description : null}
                    secondaryTypographyProps={{
                      contentEditable: 'true',
                      id: 'gd' + group.uid,
                      onInput: someFunction
                    }}
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
