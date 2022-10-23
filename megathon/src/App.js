import './App.css';
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useState } from "react";
import Movie from './components/Movie';

function App() {
  const [lng, setLng] = useState(78.4867);
  const [lat, setLat] = useState(17.3850);

  return (
    <div className="text-center">
      {/* <Map
        mapboxAccessToken="pk.eyJ1IjoibmVoYWNoZWt1cmkiLCJhIjoiY2wwdDVnMGN3MGEzcDNjbHpibDB0azhuYiJ9.L8sXbuA3jW0iCl9_b5jG9g"
        style={{
          width: "750px",
          height: "500px",
          borderRadius: "15px",
          border: "2px solid red",
        }}
        initialViewState={{
          longitude: lng,
          latitude: lat,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} />
        <NavigationControl position="bottom-right" />
        <FullscreenControl />

        <GeolocateControl />
      </Map> */}
      <Movie/>
    </div>
  );
}

export default App;
