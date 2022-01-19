import { Card, Elevation, H3, H5 } from '@blueprintjs/core';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const buttons = [<Button key="one">Goto Current Study</Button>];

export default function Animals({}) {
  return (
    <main className="m-5">
      <H3>
        <a href="#">Animals</a>
      </H3>
      <ul>
        <li>Notes</li>
      </ul>
      <div className="flex space-x-4">
        <Card className="flex-1" interactive={true} elevation={Elevation.ONE}>
          <H5>
            <a href="#">Animal Information</a>
          </H5>

          <div className="flex space-x-4 m-2">
            <TextField
              className="flex-1"
              id="standard-basic"
              label="Animal ID"
              variant="standard"
            />
            <TextField
              className="flex-shrink"
              id="standard-basic"
              label="Study Number"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Study Start"
              variant="standard"
            />
          </div>
          <div className="flex space-x-4 m-2">
            <TextField
              className="flex-1"
              id="standard-basic"
              label="RFID"
              variant="standard"
            />
            <TextField
              className="flex-1"
              id="standard-basic"
              label="Gender"
              variant="standard"
            />
            <TextField id="standard-basic" label="DOB" variant="standard" />
          </div>
          <div className="flex space-x-4 m-2">
            <TextField id="standard-basic" label="Species" variant="standard" />
            <TextField id="standard-basic" label="Strain" variant="standard" />
            <TextField
              id="standard-basic"
              label="Dead Date"
              variant="standard"
            />
          </div>
        </Card>
        <Card className="flex-1" interactive={true} elevation={Elevation.ONE}>
          <H5>
            <a href="#">Transplant Information</a>
          </H5>
          <div className="flex space-x-4 m-2">
            <TextField
              className="flex-1"
              id="standard-basic"
              label="Transplant Date"
              variant="standard"
            />
            <TextField
              className="flex-1"
              id="standard-basic"
              label="Age at transplant (weeks)"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Cell Source"
              variant="standard"
            />
          </div>
          <div className="flex space-x-4 m-2">
            <TextField id="standard-basic" label="Group" variant="standard" />
            <TextField
              id="standard-basic"
              label="Days post Transplant"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Planned perfusion date"
              variant="standard"
            />
          </div>
        </Card>
        <Card
          className="flex-shink"
          interactive={true}
          elevation={Elevation.TWO}
        >
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="contained"
          >
            {buttons}
          </ButtonGroup>
        </Card>
      </div>
      <div className="flex space-x-4 mt-4">
        <Card
          className="flex-1 flex-grow"
          interactive={true}
          elevation={Elevation.ONE}
        >
          <div className="flex space-x-4 mt-4">
            <TextField
              className="flex-1"
              id="outlined-multiline-flexible"
              label="Notes"
              multiline
              minRows={4}
            />
          </div>
          <p> </p>
        </Card>
        <Card className="flex-1 flex-shink">groups added/listed here</Card>
      </div>
    </main>
  );
}
