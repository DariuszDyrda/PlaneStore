import LoadingButton from '@mui/lab/LoadingButton';
import { AlertColor } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { makeRequestStatusIdle } from '../PlaneList/planeListSlice';
import { selectAccessToken } from '../LoginDialog/loginSlicer';
import { IPlaneProps } from '../PlaneList/PlaneCard/PlaneCard';
import { createPlane, selectRequestStatus, updatePlane } from '../PlaneList/planeListSlice';

interface IEditDialogProps {
  onClose: () => void;
  plane?: IPlaneProps;
  displaySnackBar: (severity: AlertColor, message: string) => void
  isSnackBarOpen: boolean;
}

export default function EditDialog(props: IEditDialogProps) {
  const [state, setState] = useState({
    name: props.plane?.name || '',
    description: props.plane?.description || '',
    price: props.plane?.price || 0,
    photoUrl: props.plane?.photoUrl || '',
    nameValid: props.plane?.name ? true : false,
    descriptionValid: props.plane?.description ? true : false,
    priceValid: props.plane?.price ? true : false,
    photoUrlValid: props.plane?.photoUrl ? true : false,
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const validateField = (fieldName: string, value: string): boolean => {
    switch (fieldName) {
      case 'name':
        return value.length > 0 && value.length < 250;
      case 'description':
        return value.length > 0 && value.length < 500;
      case 'photoUrl':
        return value.length > 0 && value.length < 500;
      case 'price':
        return !isNaN(+value)
      default:
        return false;
    }
  }


  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = evt.target.value;
    const validationField = evt.target.id + 'Valid';
    setState({
      ...state,
      [evt.target.id]: value,
      [validationField]: validateField(evt.target.id, value),
    });
  }

  const requestStatus = useAppSelector(selectRequestStatus);
  const accessToken = useAppSelector(selectAccessToken);

  const handleEditClick = () => {
    if (!accessToken) return;
    const data = {
      name: state.name,
      description: state.description,
      price: Number(state.price),
      photoUrl: state.photoUrl,
    }
    if (props.plane?.id) {
      dispatch(updatePlane({ updateData: data, id: props.plane.id, token: accessToken }));
    } else {
      dispatch(createPlane({ createData: data, token: accessToken }));
    }
  }
  useEffect(() => {
    if (props.isSnackBarOpen) return;
    switch (requestStatus) {
      case 'succeeded': {
        props.displaySnackBar('success', 'Operation was successful');
        dispatch(makeRequestStatusIdle());
        setLoading(false);
        props.onClose();
        break;
      }
      case 'failed': {
        props.displaySnackBar('error', 'An error occurred');
        setLoading(false);
        break;
      }
      case 'loading': {
        setLoading(true);
        break;
      }
    }
  }, [props, requestStatus, dispatch])

  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>{props?.plane?.name ? `Edit ${props.plane.name}` : `Add plane`}</DialogTitle>
      <DialogContent>
        <TextField
          error={!state.nameValid}
          autoFocus
          required
          margin="dense"
          id="name"
          label="Planes name"
          fullWidth
          value={state.name}
          onChange={handleChange}
        />
        <TextField
          error={!state.descriptionValid}
          required
          margin="dense"
          id="description"
          label="Description"
          multiline
          fullWidth
          value={state.description}
          onChange={handleChange}
        />
        <TextField
          error={!state.photoUrlValid}
          required
          margin="dense"
          id="photoUrl"
          label="Photo URL"
          fullWidth
          value={state.photoUrl}
          onChange={handleChange}
        />
        <TextField
          error={!state.priceValid}
          required
          margin="dense"
          id="price"
          label="Price"
          fullWidth
          value={state.price}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <LoadingButton loading={loading} variant="contained" onClick={handleEditClick} disabled={!(state.nameValid && state.descriptionValid && state.photoUrlValid && state.priceValid)}>
          {props.plane ? "Edit" : "Add"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}