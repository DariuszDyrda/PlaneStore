import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IDeleteConfirmDialogProps {
    onAgree: () => void;
    onClose: () => void;
}

export default function DeleteConfirmDialog(props: IDeleteConfirmDialogProps) {
  return (
      <Dialog
        open={true}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this plane?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This operation cannot be reverted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} autoFocus>Disagree</Button>
          <Button onClick={props.onAgree}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  );
}