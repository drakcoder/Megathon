import './App.css';
import "mapbox-gl/dist/mapbox-gl.css";
import { Route, Routes} from 'react-router-dom';
import DisplayMap from './components/DisplayMap';
import Movie from './components/Movie';
import Home from './components/Home';

function App() {

  return (
    <div className="App">

      <Routes>
        <Route path='' element={<Home/>}/> 
        <Route path="/map" element={<DisplayMap/>}/>
        <Route path='/movie' element={<Movie />} />
      </Routes>

    </div>
  );
}

export default App;
