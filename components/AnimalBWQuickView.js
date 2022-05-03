import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import ScaleIcon from '@mui/icons-material/Scale';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Divider, Stack, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';

function AnimalBWQuickView(Measure) {
  console.log('AnimalBWQuickView', Measure);
  console.log('Measure', Measure.Measure);
  const [measureIndex, setMeasureIndex] = useState(0);
  const [page, setPage] = useState(1);
  const BWarray = Measure.Measure.filter((bw) => {
    return bw.Score != '';
  });
  BWarray.sort((a, b) => {
    return a.PostDate - b.PostDate;
  });
  BWarray.reverse();
  console.log('BWarray', BWarray);
  const oview = BWarray.slice(measureIndex, measureIndex + 1)[0];
  console.log('oview', oview);
  const wgt = `Weight: ${oview.BW}`;
  const co = `CO: ${oview.Score}`;
  const handleChange = (event, value) => {
    console.log('handleChange', value);
    setPage(value);
    setMeasureIndex(page - 1);
  };
  return (
    <div>
      <Stack direction="column" spacing={2} mt={2}>
        <Pagination
          count={BWarray.length}
          page={page}
          onChange={handleChange}
          showFirstButton
          showLastButton
          color="primary"
          sx={{ width: '100%' }}
        />
        <Typography variant="h4" component="h2" mt={1} textAlign="center">
          {oview.PostDate}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
        justifyContent="center"
      >
        <div>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <ScaleIcon />
            <div>{wgt}</div>
          </Stack>
        </div>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <VisibilityIcon />
          <div>{co}</div>
        </Stack>
      </Stack>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem>
          <Switch edge="start" checked={+oview.MF} />
          <ListItemText id="switch-list-label-wifi" primary="MF | Moist Food" />
        </ListItem>
        <ListItem>
          <Switch edge="start" checked={+oview.BS} />
          <ListItemText
            id="switch-list-label-wifi"
            primary="BS | Bacon Softie"
          />
        </ListItem>
        <ListItem>
          <Switch edge="start" checked={+oview.SMT} />
          <ListItemText
            id="switch-list-label-wifi"
            primary="SMT | Supreme Mini Treat"
          />
        </ListItem>
        <ListItem>
          <Switch edge="start" checked={+oview.DG} />
          <ListItemText
            id="switch-list-label-wifi"
            primary="DG | DietGel (76A)"
          />
        </ListItem>
        <ListItem>
          <Switch edge="start" checked={+oview.LRS} />
          <ListItemText
            id="switch-list-label-wifi"
            primary="LRS | Warmed SC LRS"
          />
        </ListItem>
      </List>
    </div>
  );
}

export default AnimalBWQuickView;
