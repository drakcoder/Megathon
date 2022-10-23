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
import { useSearchParams } from "react-router-dom";

function DisplayMap() {

  const [lng, setLng] = useState(78.3498);
  const [lat, setLat] = useState(17.4449);
  const [locs, getlocation] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  let getLocs = async (type) => {
    let loc = await axios.get("https://api.geoapify.com/v2/places?categories=" + type + "&filter=place:51e829f9974e96534059350296010c723140f00102f901b871de0100000000c0020192033c496e7465726e6174696f6e616c20496e73746974757465206f6620496e666f726d6174696f6e20546563686e6f6c6f67792c20487964657261626164&limit=20&apiKey=ef60551a30cd46e6bb0de336097f3c84");
    let data = loc.data;
    // console.log(data);
    getlocation(data);
  };

  let handleChange = async () => {
    const d = document.getElementById("inputform").value;
    getLocs(d);
  };

  const params = searchParams.get('type');
  console.log(params);

  getLocs(params);

  return (
    <div className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }} onChange={handleChange}>
      <span style={{ 'padding': '5px', display: "flex", justifyContent: "flex-row" }}>
        <select id="inputform" name="inputform">
          <option value="accommodation" selected={params === "accommodation"}>accommodation</option>
          <option value="activity" selected={params === "activity"}>activity</option>
          <option value="commercial" selected={params === "commercial"}>commercial</option>
          <option value="catering" selected={params === "catering"}>catering</option>
          <option value="education" selected={params === "education"}>education</option>
          <option value="entertainment" selected={params === "entertainment"}>entertainment</option>
          <option value="healthcare" selected={params === "healthcare"}>healthcare</option>
          <option value="leisure" selected={params === "leisure"}>leisure</option>
          <option value="natural" selected={params === "natural"}>natural</option>
          <option value="office" selected={params === "office"}>office</option>
          <option value="parking" selected={params === "parking"}>parking</option>
          <option value="service" selected={params === "service"}>service</option>
          <option value="tourism" selected={params === "tourism"}>tourism</option>
          <option value="adult" selected={params === "adult"}>adult</option>
          <option value="ski" selected={params === "ski"}>ski</option>
          <option value="sport" selected={params === "sport"}>sport</option>
          <option value="public_transport" selected={params === "public_transport"}>public_transport</option>
        </select>
      </span>
      <button className='btn btn-info' onClick={getLocs}> Get Near By Places</button>

      <br />
      <br />

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


            <Marker longitude={lng} latitude={lat}>
            </Marker>


            <NavigationControl position="bottom-right" />
            <FullscreenControl />

            <GeolocateControl />
          </Map>
          :
          <Map
            mapboxAccessToken="pk.eyJ1IjoibmVoYWNoZWt1cmkiLCJhIjoiY2wwdDVnMGN3MGEzcDNjbHpibDB0azhuYiJ9.L8sXbuA3jW0iCl9_b5jG9g"
            style={{
              width: "900px",
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
              locs.features.map((ele, i) => <Marker key={i} longitude={ele.properties.lon} latitude={ele.properties.lat}>
                <div style={{ zIndex: 1 }}>{ele.properties.name}</div>
                <Marker longitude={ele.properties.lon} latitude={ele.properties.lat} />
              </Marker>)
            }

            <NavigationControl position="bottom-right" />
            <FullscreenControl />

            <GeolocateControl />
          </Map>
      }



    </div>
  );
}

export default DisplayMap;
