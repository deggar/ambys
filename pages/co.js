import { useState, useRef, useEffect } from 'react';
import { doc, setDoc, collection, getDocs, getDoc } from '@firebase/firestore';
import { firestore, auth, postToJSON } from './../lib/firebase';
import { useRouter } from 'next/router';
import Switch from '@mui/material/Switch';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import {
  OutlinedInput,
  InputAdornment,
  Slider,
  Box,
  Typography,
  Button,
  ButtonGroup,
  Icon,
  Stack
} from '@mui/material';
import ScaleTwoToneIcon from '@mui/icons-material/ScaleTwoTone';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import Grid from '@mui/material/Grid';
import AnimalQuickView from '../components/AnimalQuickView';

export default function CO() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const keyboard = useRef();

  const [state, setState] = useState({
    weight: 0,
    CS: 3,
    MF: false,
    BS: false,
    SMT: false,
    DG: true,
    LRS: false
  });

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  const handleSliderChange = (event) => {
    const val = event.target.value === '' ? '' : Number(event.target.value);
    console.log('val', val);
    setState({
      ...state,
      [event.target.name]: val
    });
  };

  function valuetext(value) {
    console.log('valuetext', value);
    const v = +value;
    switch (v) {
      case 0:
      case 0.5:
      case 1:
      case 1.5:
      case 2:
        return `2 - 1 (or ≥20% BW loss) → Euthanize`;
        break;
      case 2.5:
        return `2.5 → Recheck daily`;
      case 3:
      case 3.5:
        return `3.5 - 3 → Recheck every 48hrs`;
        break;
      case 4:
      case 4.5:
      case 5:
        return `5 - 4 → No Recheck needed`;
        break;
      default:
        return `?{value}`;
        break;
    }
  }

  const sliderText = {
    color: 'white',
    backgroundColor: 'DodgerBlue',
    padding: '10px',
    textAlign: 'center',
    fontSize: '1.2rem'
  };

  const styleCaptureWeight = {
    display: 'inline-flex',
    marginLeft: '1em',
    padding: '1rem'
  };

  const numericKeyboard = [
    ['Escape', '-', 'Backspace'],
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', '.', 'Enter']
  ];

  function openKeypad() {
    console.log('openKeypad');
    setKeyboardOpen(true);
  }
  function closeKeypad() {
    console.log('closeKeypad');
    setKeyboardOpen(false);
  }

  const onChangeAll = (inputs) => {
    /**
     * Here we spread the inputs into a new object
     * If we modify the same object, react will not trigger a re-render
     */
    // setInputs({ ...inputs });
    setState({
      ...state,
      inputs
    });
    console.log('Inputs changed', state);
  };

  const onKeyPress = (button) => {
    console.log('Button pressed', button);
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === '{shift}' || button === '{lock}') handleShift();
    if (button === '{enter}') handleEnter();
  };

  const handleEnter = () => {
    closeKeypad();
  };

  const onChange = (input) => {
    console.log('Input changed', input);
    setState({
      ...state,
      weight: input
    });
    console.log('Input changed', input);
  };

  const [DateValue, setDateValue] = useState(null);

  const [animalRFID, setAnimalRFID] = useState('4BC7E82B');

  const [Animal, setAnimal] = useState(null);
  const [BW, setBW] = useState([]);

  const getAnimal = async (RFID) => {
    console.log('animalRFID', RFID);
    const animalRef = doc(firestore, `/Animals/`, RFID);
    const animalInfo = postToJSON(await getDoc(animalRef));

    const measureRef = collection(
      firestore,
      `/Observations/2E9A197B/`,
      `Measure`
    );
    const animalBWref = await getDocs(measureRef);
    const animalBW = animalBWref.docs.map(postToJSON);
    console.log('animalBW', animalBW);
    animalInfo.Measure = animalBW;
    console.log('animalInfo', animalInfo);
    // const res = await fetch(`/api/animal/${animalID}/${animalRFID}`);
    // const data = await res.json();
    // setAnimal(animalInfo);
    return animalInfo;
  };

  console.log('animalRFID', animalRFID.animalRFID);

  // useEffect(() => {
  //   getAnimal(animalRFID).then((data) => {
  //     console.log('data', data);
  //     // setAnimal(data);
  //   });
  // }),
  //   [animalRFID];

  function updateRFID(RFID) {
    getAnimal(animalRFID).then((data) => {
      console.log('data', data);
      setAnimal(data);
    });
  }

  // updateRFID(animalRFID);

  return (
    <main className="m-5">
      <Typography variant="h5">Clinical Observation</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Stack direction="row" spacing={2}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Set Date"
                  value={DateValue}
                  onChange={(newValue) => {
                    setDateValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
            <Button
              variant="outlined"
              size="medium"
              startIcon={<AddAPhotoIcon />}
              sx={{ bgcolor: '#00bcd4' }}
            >
              Take Photo
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                updateRFID(animalRFID);
              }}
            >
              Scan
            </Button>
          </Stack>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput
              name="weight"
              id="weight"
              value={state.weight}
              onChange={handleChange}
              endAdornment={<InputAdornment position="end">g</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight'
              }}
              onFocus={openKeypad}
              keyboardRef={(r) => (keyboard.current = r)}
            />
            <FormHelperText id="outlined-weight-helper-text">
              Weight
            </FormHelperText>
          </FormControl>
          <div style={styleCaptureWeight}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<ScaleTwoToneIcon />}>
                Capture Weight
              </Button>
            </Stack>
          </div>
          {keyboardOpen && (
            <Box m={2} width={500}>
              <Keyboard
                onKeyPress={onKeyPress}
                onChange={(input) => onChange(input)}
                // onChangeAll={onChangeAll}
                inputName="weight"
                layoutName="ip"
                layout={{
                  default: [
                    '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                    '{tab} q w e r t y u i o p [ ] \\',
                    "{lock} a s d f g h j k l ; ' {enter}",
                    '{shift} z x c v b n m , . / {shift}',
                    '.com @ {space}'
                  ],
                  shift: [
                    '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
                    '{tab} Q W E R T Y U I O P { } |',
                    '{lock} A S D F G H J K L : " {enter}',
                    '{shift} Z X C V B N M &lt; &gt; ? {shift}',
                    '.com @ {space}'
                  ],
                  numericKeyboard: [
                    '{Escape} - {Backspace}',
                    '7 8 9',
                    '4 5 6',
                    '1 2 3',
                    '0 . {Enter}'
                  ],
                  ip: [
                    '1 2 3',
                    '4 5 6',
                    '7 8 9',
                    '. 0 {clear}',
                    '{bksp} {enter}'
                  ]
                }}
                display={{
                  '{clear}': 'C',
                  '{bksp}': 'backspace',
                  '{enter}': 'enter'
                }}
              />
            </Box>
          )}
          <Typography ml={3} mt={2} id="input-slider" gutterBottom>
            Clinical Score
          </Typography>
          <Box m={3} mt={4} width={500}>
            <Slider
              name="CS"
              aria-label="Clinical Score"
              defaultValue={3}
              getAriaValueText={valuetext}
              valueLabelDisplay="on"
              step={0.5}
              marks
              min={0}
              max={5}
              onChange={handleSliderChange}
            />
            <div id="input-slider" className="sliderText" style={sliderText}>
              {valuetext(state.CS)}
            </div>
          </Box>
          <Box m={2} ml={6} width={500}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.MF}
                    onChange={handleChange}
                    name="MF"
                  />
                }
                label="MF | Moist Food"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={state.BS}
                    onChange={handleChange}
                    name="BS"
                  />
                }
                label="BS | Bacon Softie"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={state.SMT}
                    onChange={handleChange}
                    name="SMT"
                  />
                }
                label="SMT | Supreme Mini Treat"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={state.DG}
                    onChange={handleChange}
                    name="DG"
                  />
                }
                label="DG | DietGel (76A)"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={state.LRS}
                    onChange={handleChange}
                    name="LRS"
                  />
                }
                label="LRS | Warmed SC LRS"
              />
            </FormGroup>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">QuickView</Typography>
          <Box m={2} ml={6} width={500}>
            {Animal && <AnimalQuickView Animal={Animal} />}
          </Box>
        </Grid>
      </Grid>
    </main>
  );
}
