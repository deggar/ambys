import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { Update } from '@mui/icons-material';

const lightTheme = createTheme({ palette: { mode: 'light' } });

const theUpdates = [
  {
    key: 3,
    type: `Issue`,
    head: `Group Sorting`,
    desc: `Animals can be dragged, but when dropped they return to their original position. A fix is coming soon`
  },
  {
    key: 7,
    type: `Update`,
    head: `Ambys Receiving Roster Export`,
    desc: `Version 3 of the Roster Export is available. Version 3 includes a new format for the export with styling, coloring and the Ambys logo.`
  },
  {
    key: 8,
    type: `Update`,
    head: `Body Weight/CO file Export`,
    desc: `The Body Weight/CO file export is now available. This file is an empty template ready for data input of daily body wieghts and Clinical Observations.`
  },
  {
    key: 9,
    type: `Update`,
    head: `Body Weight/CO file Upload`,
    desc: `Upload a Body Weight/CO file into the system to capture the daily body weights and observations. This data is not saved to the system during this testing phase`
  },
  {
    key: 10,
    type: `Update`,
    head: `Workflow Update`,
    desc: `The workflow has been adjusted to remove extra clicks/actions. If a study document and a shipping manifest is available the user can have a study up and running in less than a minute.`
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
