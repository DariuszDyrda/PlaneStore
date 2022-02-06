import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IPlaneProps } from '../PlaneList/PlaneCard/PlaneCard';

interface IBuyDialogProps {
    onClose: () => void;
    plane: IPlaneProps;
}

export default function BuyDialog(props: IBuyDialogProps) {
  return (
      <Dialog open={true} onClose={props.onClose}>
        <DialogTitle>Buy {props.plane.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your name and address below. The plane will be delivered to the nearest airport in up to 72 hours.
            Please note, that we only accept payment in cash. 
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="First and last name"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="address"
            label="Address"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button variant="contained" onClick={props.onClose}>Buy</Button>
        </DialogActions>
      </Dialog>
  );
}