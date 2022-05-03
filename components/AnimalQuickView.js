import { useState, useEffect } from 'react';
import AnimalBWQuickView from './AnimalBWQuickView';
import { TextField } from '@mui/material';
import { Card, Elevation, H3, H5 } from '@blueprintjs/core';

function AnimalQuickView({ Animal }) {
  console.log('AnimalQuickView', Animal);
  return (
    <div>
      Scanned: {Animal.RFID}
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
            value={Animal.ID}
          />
          <TextField
            className="flex-shrink"
            id="standard-basic"
            label="Study Number"
            variant="standard"
            value={Animal.Study}
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
            value={Animal.RFID}
          />
          <TextField
            className="flex-1"
            id="standard-basic"
            label="Gender"
            variant="standard"
            value={Animal.Sex}
          />
          <TextField
            id="standard-basic"
            label="DOB"
            variant="standard"
            value={Animal.BirthDate}
          />
        </div>
        <div className="flex space-x-4 m-2">
          <TextField
            id="standard-basic"
            label="Species"
            variant="standard"
            value={Animal.Species}
          />
          <TextField
            id="standard-basic"
            label="Strain"
            variant="standard"
            value={Animal.Strain}
          />
          <TextField id="standard-basic" label="Dead Date" variant="standard" />
        </div>
      </Card>
      <AnimalBWQuickView Measure={Animal.Measure} />
    </div>
  );
}

export default AnimalQuickView;
