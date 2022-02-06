import './App.css';
import { NavBar } from './features/NavBar/NavBar';
import { PlaneList } from './features/PlaneList/PlaneList';

function App() {
  return (
    <div className="App">
      <NavBar />
      <PlaneList />
    </div>
  );
}

export default App;
