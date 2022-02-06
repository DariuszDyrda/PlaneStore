import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AlertColor } from '@mui/material'
import { IPlaneProps } from '../PlaneList/PlaneCard/PlaneCard';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { makeStatusIdle, placeOrder, selectOrderStatus } from './orderSlice';

interface IBuyDialogProps {
    onClose: () => void;
    plane: IPlaneProps;
    displaySnackBar: (severity: AlertColor, message: string) => void
    isSnackBarOpen: boolean;
}

export default function BuyDialog(props: IBuyDialogProps) {
  const [state, setState] = useState({
      clientName: '',
      clientAddress: '',
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const orderStatus = useAppSelector(selectOrderStatus);

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.id]: value
    });
  }
  
  const handleBuyClick = () => {
      const data = {
        clientName: state.clientName,
        clientAddress: state.clientAddress,
        planeId: props.plane.id,
      }
      dispatch(placeOrder(data));
  }
  useEffect(() => {
    if (props.isSnackBarOpen) return;
    switch (orderStatus) {
      case 'succeeded': {
        props.displaySnackBar('success', 'Your order was placed successfully!');
        dispatch(makeStatusIdle());
        setLoading(false);
        props.onClose();
        break;
      }
      case 'failed': {
        props.displaySnackBar('error', 'There was an error while placing your order. Try again!');
        setLoading(false);
        break;
      }
      case 'loading': {
        setLoading(true);
        break;
      }
    }
  }, [props, orderStatus, dispatch])

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
            id="clientName"
            label="First and last name"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="clientAddress"
            label="Address"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <LoadingButton loading={loading} variant="contained" onClick={handleBuyClick}>
            Buy
          </LoadingButton>
          {/* <Button variant="contained" onClick={handleBuyClick}>Buy</Button> */}
        </DialogActions>
      </Dialog>
  );
}