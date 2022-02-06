import { useEffect } from 'react';
import './App.css';
import { useAppDispatch } from './app/hooks';
import { loadFromLocalStorage } from './features/LoginDialog/loginSlicer';
import { NavBar } from './features/NavBar/NavBar';
import { PlaneList } from './features/PlaneList/PlaneList';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch])
  return (
    <div className="App">
      <NavBar/>
      <PlaneList />
    </div>
  );
}

export default App;
