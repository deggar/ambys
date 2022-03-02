import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { Update } from '@mui/icons-material';

const lightTheme = createTheme({ palette: { mode: 'light' } });

const theUpdates = [
  {
    key: 0,
    type: `Update`,
    head: `Shipping Manifest Import`,
    desc: `Shipping Manifest import now correctly identifies the 'cloudy
    eyes?' column`
  },
  {
    key: 1,
    type: `New`,
    head: `Shipping Manifest List`,
    desc: `Shipping Manifest imports are now being saved and will show in the Shipping list`
  },
  {
    key: 2,
    type: `Fix`,
    head: `Group Setup`,
    desc: `Group creation, deletion and editing is working better now. Group editing will soon be limited to new or edited manifests.`
  },
  {
    key: 3,
    type: `Issue`,
    head: `Group Sorting`,
    desc: `Animals can be dragged, but when dropped they return to their original position. A fix is coming soon`
  },
  {
    key: 4,
    type: `New`,
    head: `Ambys Receiving Roster Export`,
    desc: `First version of the Roster Export is available`
  },
  {
    key: 5,
    type: `Fix`,
    head: `Uploading Files`,
    desc: `Preview server was limiting file upload, users should be able to upload studies and manifests without issues.`
  },
  {
    key: 6,
    type: `Update`,
    head: `Study Upload in Main Study list`,
    desc: `All Study uploads should be done in the main 'Studies' page where all studies are listed. An updated workflow will include checking to see if there is alrady a Study in the system and get confirmation that it should be overwritten.`
  }
];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  color: theme.palette.text.secondary,
  //   height: auto,
  lineHeight: '1rem',
  padding: '1rem'
}));

const updateFormat = (type, head, desc, key) => {
  return (
    <Grid key={key} item xs={6}>
      <div className=" overflow-hidden rounded-lg shadow-lg mb-5">
        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded">
          {type}
        </span>
        <div className="px-6 py-4">
          <h4 className="mb-3 text-xl font-semibold tracking-tight text-gray-800">
            {head}
          </h4>
          <p className="leading-normal text-gray-700">{desc}</p>
        </div>
      </div>
    </Grid>
  );
};

export default function Elevation() {
  return (
    <Container className="mt-6">
      {/* <Box sx={{ flexGrow: 1 }}> */}
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div></div>
        </Grid>
        <Grid item xs={11}>
          <Grid container spacing={2}>
            {theUpdates.map(function (line) {
              return updateFormat(line.type, line.head, line.desc, line.key);
            })}
          </Grid>
        </Grid>
        {/* <Grid item xs={5}></Grid> */}
      </Grid>
      {/* </Box> */}
    </Container>
  );
}
