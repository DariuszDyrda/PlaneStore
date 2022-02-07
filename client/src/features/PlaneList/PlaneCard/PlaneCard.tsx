import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BuyDialog from '../../BuyDialog/BuyDialog';
import { useState } from 'react';
import { AlertColor, Snackbar, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAccessToken, selectAdmin } from '../../LoginDialog/loginSlicer';
import { deletePlane } from '../planeListSlice';
import DeleteConfirmDialog from './DeleteConfirmDialog';

const PHOTO_PLACEHOLDER = 'https://pixy.org/src/40/thumbs350/405353.jpg';

export interface IPlaneProps {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
  createdAt: string,
  updatedAt: string,
  price: number;
}

export default function PlaneCard(plane: IPlaneProps) {
  const [openBuyDialog, setOpenBuyDialog] = useState(false);
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    severity: 'success',
    message: 'Your order was places successfully',
  })
  const [photoUrl, setPhotoUrl] = useState(plane.photoUrl);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAccessToken);
  const handleDelete = () => {
    if (!accessToken) return;
    dispatch(deletePlane({ id: plane.id, token: accessToken }));
    setOpenDeleteDialog(false);
  }

  const admin = useAppSelector(selectAdmin);

  const handlePhotoError = () => {
    setPhotoUrl(PHOTO_PLACEHOLDER);
  }

  const handleCloseSnackBar = () => {
    setSnackBarState({ ...snackBarState, open: false });
  }

  const displaySnackBar = (severity: AlertColor, message: string) => {
    setSnackBarState({
      open: true,
      severity,
      message
    })
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={plane.name}
        subheader={plane.price.toLocaleString(undefined, { maximumFractionDigits: 2}) + " USD"}
      />
      <CardMedia
        component="img"
        height="194"
        image={photoUrl}
        onError={handlePhotoError}
        alt={plane.name}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {plane.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center'}}>
        { !admin && (<Button variant="contained" onClick={() => setOpenBuyDialog(true)}>Buy now!</Button>) }
        { admin && (<Button variant="contained" onClick={undefined}>Edit</Button>) }
        { admin && (<Button variant="contained" color='error' onClick={() => setOpenDeleteDialog(true)}>Delete</Button>) }
      </CardActions>
      { openBuyDialog && (
        <BuyDialog onClose={() => setOpenBuyDialog(false)} plane={plane} displaySnackBar={displaySnackBar} isSnackBarOpen={snackBarState.open} />
      )}
      { openDeleteDialog && (
        <DeleteConfirmDialog onClose={() => setOpenDeleteDialog(false)} onAgree={handleDelete} />
      )}
      <Snackbar open={snackBarState.open} autoHideDuration={3000} onClose={handleCloseSnackBar}>
          <Alert severity={snackBarState.severity as AlertColor} sx={{ width: '100%' }}>
          {snackBarState.message}
          </Alert>
      </Snackbar>
    </Card>
  );
}