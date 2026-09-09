import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  Marker,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon issue in Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});


// Nashik center
const nashikCenter = [20.0059, 73.7897];


// ----------------------------------------------------
// NON-OVERLAPPING PROTOTYPE VENDOR ZONES
// ----------------------------------------------------

// Zone 1 - Central Nashik
const zone1 = [
  [20.035, 73.755],
  [20.035, 73.790],
  [20.015, 73.805],
  [19.990, 73.795],
  [19.985, 73.765],
  [20.005, 73.745],
];


// Zone 2 - East Nashik
const zone2 = [
  [20.035, 73.790],
  [20.035, 73.835],
  [20.010, 73.850],
  [19.980, 73.835],
  [19.990, 73.795],
  [20.015, 73.805],
];


// Zone 3 - West Nashik
const zone3 = [
  [20.035, 73.755],
  [20.005, 73.745],
  [19.975, 73.750],
  [19.950, 73.775],
  [19.965, 73.800],
  [19.985, 73.765],
];


// Zone 4 - South Nashik
const zone4 = [
  [19.985, 73.765],
  [19.990, 73.795],
  [19.980, 73.835],
  [19.950, 73.825],
  [19.925, 73.795],
  [19.935, 73.765],
  [19.950, 73.775],
  [19.965, 73.800],
];


// Zone styling
const zoneStyle = {
  color: "#2563eb",
  weight: 2,
  fillColor: "#3b82f6",
  fillOpacity: 0.18,
};


// Selected zone styling
const selectedStyle = {
  color: "#1d4ed8",
  weight: 3,
  fillColor: "#2563eb",
  fillOpacity: 0.30,
};


function MapView() {
  return (
    <div
      style={{
        width: "100%",
        height: "520px",
        borderRadius: "14px",
        overflow: "hidden",
      }}
    >

      <MapContainer
        center={nashikCenter}
        zoom={12}
        scrollWheelZoom={true}
        style={{
          width: "100%",
          height: "100%",
        }}
      >

        {/* REAL NASHIK BASE MAP */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {/* PROPOSED LOCATION */}
        <Marker position={[20.0059, 73.7897]}>
          <Popup>
            <strong>Proposed Vendor Location</strong>
            <br />
            Nashik
          </Popup>
        </Marker>


        {/* ZONE 1 */}
        <Polygon
          positions={zone1}
          pathOptions={selectedStyle}
        >
          <Popup>
            <strong>Nashik Central Vendor Zone</strong>

            <br />
            <br />

            Suitability: <strong>87%</strong>

            <br />

            Capacity: High

            <br />

            Status: Active
          </Popup>
        </Polygon>


        {/* ZONE 2 */}
        <Polygon
          positions={zone2}
          pathOptions={zoneStyle}
        >
          <Popup>
            <strong>Nashik East Vendor Zone</strong>

            <br />
            <br />

            Suitability: <strong>79%</strong>

            <br />

            Capacity: Medium

            <br />

            Status: Active
          </Popup>
        </Polygon>


        {/* ZONE 3 */}
        <Polygon
          positions={zone3}
          pathOptions={zoneStyle}
        >
          <Popup>
            <strong>Nashik West Vendor Zone</strong>

            <br />
            <br />

            Suitability: <strong>72%</strong>

            <br />

            Capacity: Medium

            <br />

            Status: Active
          </Popup>
        </Polygon>


        {/* ZONE 4 */}
        <Polygon
          positions={zone4}
          pathOptions={zoneStyle}
        >
          <Popup>
            <strong>Nashik South Vendor Zone</strong>

            <br />
            <br />

            Suitability: <strong>68%</strong>

            <br />

            Capacity: Medium

            <br />

            Status: Active
          </Popup>
        </Polygon>

      </MapContainer>

    </div>
  );
}

export default MapView;