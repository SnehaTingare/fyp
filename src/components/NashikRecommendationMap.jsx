import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon issue in Vite
const proposedLocationIcon = L.divIcon({
  className: "custom-proposed-marker",
  html: `
    <div class="proposed-marker">
      <div class="marker-pin">📍</div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Nashik city center
const nashikCenter = [20.0059, 73.7797];

/*
  Prototype vendor zones.

  These are intentionally separated so that
  the recommended zones do NOT overlap.

  They represent prototype recommendation
  areas, NOT official municipal boundaries.
*/

const zones = [
  {
    id: 1,
    name: "BhadraKali Vending Zone",
    score: 87,
    color: "#2563eb",

    coordinates: [
      [20.0208, 73.7655],
      [20.0260, 73.7720],
      [20.0235, 73.7800],
      [20.0170, 73.7805],
      [20.0138, 73.7730],
      [20.0150, 73.7670],
    ],

    description:
      "High suitability for food and small street-vending businesses.",
  },

  {
    id: 2,
    name: "Peth Road Vending Zone",
    score: 79,
    color: "#16a34a",

    coordinates: [
      [20.0100, 73.7465],
      [20.0160, 73.7520],
      [20.0135, 73.7590],
      [20.0060, 73.7600],
      [20.0010, 73.7540],
      [20.0030, 73.7480],
    ],

    description:
      "Suitable location with available vendor capacity.",
  },

  {
    id: 3,
    name: "Pathardi Phata Vending Zone",
    score: 72,
    color: "#f59e0b",

    coordinates: [
      [19.9680, 73.7840],
      [19.9730, 73.7910],
      [19.9700, 73.8000],
      [19.9630, 73.8020],
      [19.9580, 73.7950],
      [19.9610, 73.7870],
    ],

    description:
      "Moderate suitability based on location and accessibility.",
  },
];

// Example proposed vendor location
const proposedLocation = [20.0085, 73.7745];

function NashikRecommendationMap({
  selectedZone = 1,
  onZoneSelect,
}) {
  return (
    <div className="nashik-map-wrapper">

      <MapContainer
        center={nashikCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="nashik-map"
      >

        {/* Real OpenStreetMap map */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Proposed Vendor Location */}
        <Marker
          position={proposedLocation}
          icon={proposedLocationIcon}
        >
          <Popup>
            <strong>Proposed Vendor Location</strong>
            <br />
            Submitted location
          </Popup>

          <Tooltip direction="top">
            Proposed Location
          </Tooltip>
        </Marker>


        {/* Recommended Zones */}
        {zones.map((zone) => {
          const isSelected = selectedZone === zone.id;

          return (
            <Polygon
              key={zone.id}
              positions={zone.coordinates}

              pathOptions={{
                color: zone.color,
                weight: isSelected ? 4 : 2,
                fillColor: zone.color,
                fillOpacity: isSelected ? 0.30 : 0.16,
              }}

              eventHandlers={{
                click: () => {
                  if (onZoneSelect) {
                    onZoneSelect(zone);
                  }
                },
              }}
            >

              <Tooltip sticky>
                <strong>
                  #{zone.id} {zone.name}
                </strong>
                <br />
                Suitability: {zone.score}%
              </Tooltip>

              <Popup>
                <strong>{zone.name}</strong>

                <br />
                <br />

                <strong>
                  Suitability: {zone.score}%
                </strong>

                <br />

                {zone.description}
              </Popup>

            </Polygon>
          );
        })}

      </MapContainer>


      {/* Map Legend */}
      <div className="nashik-map-legend">

        <div className="legend-item">
          <span className="legend-zone blue"></span>
          Recommended Zone
        </div>

        <div className="legend-item">
          <span className="legend-zone green"></span>
          Recommended Zone
        </div>

        <div className="legend-item">
          <span className="legend-zone orange"></span>
          Recommended Zone
        </div>

        <div className="legend-item">
          <span className="legend-location"></span>
          Proposed Location
        </div>

      </div>

    </div>
  );
}

export default NashikRecommendationMap;