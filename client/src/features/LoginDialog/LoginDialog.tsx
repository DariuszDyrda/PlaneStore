import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { loginAdmin } from './loginSlicer';

interface ILoginDialogProps {
    isOpen: boolean;
    close: () => void;
}

export default function LoginDialog(props: ILoginDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch(loginAdmin({ email, password }));
    props.close()
  }
  
  return (
      <Dialog open={props.isOpen} onClose={props.close}>
        <DialogTitle>Admin login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
  );
}