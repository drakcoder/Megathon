import "mapbox-gl/dist/mapbox-gl.css";
import axios from 'axios';
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useState } from "react";

function DisplayMap() {

  const [lng, setLng] = useState(78.3498);
  const [lat, setLat] = useState(17.4449);
  const [locs, getlocation] = useState([]);

  let getLocs = async() =>{
    let loc = await axios.get("https://api.geoapify.com/v2/places?categories=accommodation&filter=place:51e829f9974e96534059350296010c723140f00102f901b871de0100000000c0020192033c496e7465726e6174696f6e616c20496e73746974757465206f6620496e666f726d6174696f6e20546563686e6f6c6f67792c20487964657261626164&limit=20&apiKey=ef60551a30cd46e6bb0de336097f3c84");
    let data = loc.data;
    // console.log(data);
    getlocation(data);
  }

  return (
    <div className="text-center">
      
      {
        locs.length == 0 ? 
          <Map
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
            zoom: 15,
          }}
          
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          
          
          <Marker longitude={lng} latitude={lat} />
          
          
          <NavigationControl position="bottom-right" />
          <FullscreenControl />

          <GeolocateControl />
          </Map>
        :
        <Map
          mapboxAccessToken="pk.eyJ1IjoibmVoYWNoZWt1cmkiLCJhIjoiY2wwdDVnMGN3MGEzcDNjbHpibDB0azhuYiJ9.L8sXbuA3jW0iCl9_b5jG9g"
          style={{
            width: "750px",
            height: "500px",
            borderRadius: "15px",
            border: "2px solid red",
          }}
          initialViewState={{
            longitude: locs.features[0].properties.lon,
            latitude: locs.features[0].properties.lat,
            zoom: 15,
          }}
          
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          
          {
            locs.features.map((ele, i) => <Marker key={i} longitude={ele.properties.lon} latitude={ele.properties.lat} />)
          }
          
          <NavigationControl position="bottom-right" />
          <FullscreenControl />

          <GeolocateControl />
      </Map>
      }
      
      <button className='btn btn-info' onClick={getLocs}> Get accommodation</button>
    </div>
  );
}

export default DisplayMap;
