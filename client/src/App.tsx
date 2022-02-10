import { Alert, AlertColor, Button, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch } from './app/hooks';
import EditDialog from './features/EditDialog/EditDialog';
import { loadFromLocalStorage } from './features/LoginDialog/loginSlicer';
import { NavBar } from './features/NavBar/NavBar';
import { PlaneList } from './features/PlaneList/PlaneList';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch])

  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    severity: 'success',
    message: 'Your order was places successfully',
  })

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
    <div className="App">
      <NavBar/>
      <Button onClick={() => setOpenNewDialog(true)} variant="contained" size="large" sx={{marginTop: '30px', marginBottom: '0'}}>Add new plane</Button>
      { openNewDialog && (
        <EditDialog onClose={() => setOpenNewDialog(false)} displaySnackBar={displaySnackBar} isSnackBarOpen={snackBarState.open} />
      )}
      <Snackbar open={snackBarState.open} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert severity={snackBarState.severity as AlertColor} sx={{ width: '100%' }}>
          {snackBarState.message}
        </Alert>
      </Snackbar>
      <PlaneList />
    </div>
  );
}

export default App;
