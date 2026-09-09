import { useMemo, useState } from "react";
import {
  MapPin,
  Search,
  CheckCircle,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  Marker,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

// =========================================================
// ZONE DATA
// =========================================================

const zones = [
  {
    id: 1,
    name: "Bhadrakali Vending Zone",
    location: "Bhadrakali, Nashik",
    status: "Active",
    vendors: 18,
    capacity: 25,
    color: "#2563eb",
    coordinates: [
      [20.0058, 73.7918],
      [20.0075, 73.7952],
      [20.0052, 73.7980],
      [20.0025, 73.7950],
      [20.0032, 73.7920],
    ],
  },
  {
    id: 2,
    name: "Peth Road Vending Zone",
    location: "Panchavati, Nashik",
    status: "Active",
    vendors: 12,
    capacity: 20,
    color: "#16a34a",
    coordinates: [
      [20.0175, 73.7900],
      [20.0200, 73.7935],
      [20.0180, 73.7970],
      [20.0148, 73.7950],
      [20.0152, 73.7915],
    ],
  },
  {
    id: 3,
    name: "Pathardi Phata Vending Zone",
    location: "Pathardi Phata, Nashik",
    status: "Active",
    vendors: 15,
    capacity: 22,
    color: "#7c3aed",
    coordinates: [
      [19.9600, 73.8180],
      [19.9630, 73.8220],
      [19.9600, 73.8260],
      [19.9565, 73.8230],
      [19.9570, 73.8190],
    ],
  },
  {
    id: 4,
    name: "CBS Vending Zone",
    location: "Central Bus Stand, Nashik",
    status: "Active",
    vendors: 21,
    capacity: 28,
    color: "#ea580c",
    coordinates: [
      [19.9970, 73.7810],
      [20.0000, 73.7840],
      [19.9980, 73.7870],
      [19.9945, 73.7845],
      [19.9950, 73.7815],
    ],
  },
  {
    id: 5,
    name: "College Road Vending Zone",
    location: "College Road, Nashik",
    status: "Under Review",
    vendors: 9,
    capacity: 18,
    color: "#0891b2",
    coordinates: [
      [20.0060, 73.7580],
      [20.0090, 73.7615],
      [20.0065, 73.7650],
      [20.0035, 73.7620],
      [20.0038, 73.7590],
    ],
  },
  {
    id: 6,
    name: "Gangapur Road Vending Zone",
    location: "Gangapur Road, Nashik",
    status: "Active",
    vendors: 11,
    capacity: 20,
    color: "#ca8a04",
    coordinates: [
      [20.0050, 73.7440],
      [20.0080, 73.7470],
      [20.0055, 73.7500],
      [20.0025, 73.7470],
      [20.0028, 73.7445],
    ],
  },
];

const nashikCenter = [19.9975, 73.7898];

// =========================================================
// COMPONENT
// =========================================================

function Zones() {
  const [selectedZone, setSelectedZone] = useState(null);
  const [search, setSearch] = useState("");

  // =======================================================
  // SELECT ZONE
  // =======================================================

  const handleSelectZone = (zone) => {
    console.log("SELECTED ZONE:", zone.name);

    setSelectedZone(zone);

    window.alert(`${zone.name} is selected`);
  };

  // =======================================================
  // SEARCH
  // =======================================================

  const filteredZones = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return zones;
    }

    return zones.filter(
      (zone) =>
        zone.name.toLowerCase().includes(query) ||
        zone.location.toLowerCase().includes(query) ||
        zone.status.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <main className="dashboard zones-page">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="page-header">

        <div>
          <h1>Vendor Zones</h1>

          <p>
            Designated vending locations across Nashik
          </p>
        </div>

      </div>


      {/* ===================================================
          MAIN GRID
      =================================================== */}

      <div className="zones-page-grid">


        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="zones-left-column">

          {/* MAP */}

          <div className="zones-map-panel">

            <div className="panel-header">

              <div>
                <h3>Nashik Vendor Zone Map</h3>

                <p>
                  Designated locations for street vendors
                </p>
              </div>

            </div>


            <div className="zones-map">

              <MapContainer
                center={nashikCenter}
                zoom={13}
                scrollWheelZoom={true}
                style={{
                  width: "100%",
                  height: "560px",
                }}
              >

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                {zones.map((zone) => {

                  const isSelected =
                    selectedZone?.id === zone.id;

                  return (
                    <Polygon
                      key={zone.id}
                      positions={zone.coordinates}
                      pathOptions={{
                        color: zone.color,
                        fillColor: zone.color,
                        fillOpacity: isSelected
                          ? 0.45
                          : 0.18,
                        weight: isSelected
                          ? 4
                          : 2,
                      }}
                      eventHandlers={{
                        click: () =>
                          handleSelectZone(zone),
                      }}
                    >

                      <Popup>

                        <strong>
                          {zone.name}
                        </strong>

                        <br />

                        {zone.location}

                        <br />
                        <br />

                        Capacity:{" "}
                        {zone.vendors}/{zone.capacity}

                        <br />

                        {isSelected
                          ? "Selected"
                          : zone.status}

                      </Popup>

                    </Polygon>
                  );
                })}


                <Marker position={nashikCenter}>

                  <Popup>
                    Nashik Municipal Area
                  </Popup>

                </Marker>

              </MapContainer>

            </div>


            <div className="zones-map-legend">

              <span>
                <i className="legend-active"></i>
                Active Zone
              </span>

              <span>
                <i className="legend-review"></i>
                Under Review
              </span>

            </div>

          </div>


          {/* SELECTED ZONE */}

          {selectedZone && (

            <div className="selected-zone-overview">

              <div className="selected-zone-info">

                <div
                  className="selected-zone-color"
                  style={{
                    background:
                      selectedZone.color,
                  }}
                >
                  {selectedZone.id}
                </div>


                <div>

                  <span>
                    SELECTED ZONE
                  </span>

                  <h2>
                    {selectedZone.name}
                  </h2>

                  <p>
                    <MapPin size={13} />

                    {selectedZone.location}
                  </p>

                </div>

              </div>


              <div className="selected-zone-stats">

                <div>
                  <span>CAPACITY</span>
                  <strong>
                    {selectedZone.capacity}
                  </strong>
                </div>

                <div>
                  <span>VENDORS</span>
                  <strong>
                    {selectedZone.vendors}
                  </strong>
                </div>

                <div>
                  <span>AVAILABLE</span>
                  <strong>
                    {Math.max(
                      selectedZone.capacity -
                        selectedZone.vendors,
                      0
                    )}
                  </strong>
                </div>

                <div>
                  <span>STATUS</span>

                  <strong className="status-active">
                    Selected
                  </strong>
                </div>

              </div>

            </div>

          )}

        </div>


        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="zones-list-panel">

          <div className="panel-header">

            <div>

              <h3>
                Designated Zones
              </h3>

              <p>
                {zones.length} vendor zones in Nashik
              </p>

            </div>

          </div>


          {/* SEARCH */}

          <div className="zone-search">

            <Search size={16} />

            <input
              type="text"
              placeholder="Search zones..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* ZONE LIST */}

          <div className="zone-list">

            {filteredZones.map((zone) => {

              const isSelected =
                selectedZone?.id === zone.id;

              const percentage =
                Math.min(
                  (zone.vendors /
                    zone.capacity) *
                    100,
                  100
                );

              return (

                <div
                  key={zone.id}
                  className={`zone-list-card ${
                    isSelected
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    handleSelectZone(zone)
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      handleSelectZone(zone);
                    }
                  }}
                >

                  <div className="zone-list-top">

                    <div
                      className="zone-color"
                      style={{
                        background:
                          zone.color,
                      }}
                    >
                      {zone.id}
                    </div>


                    <div className="zone-list-title">

                      <strong>
                        {zone.name}
                      </strong>

                      <span>
                        {zone.location}
                      </span>

                    </div>


                    {isSelected ? (

                      <span className="zone-status selected-status">

                        <CheckCircle size={12} />

                        Selected

                      </span>

                    ) : (

                      <span
                        className={`zone-status ${
                          zone.status === "Active"
                            ? "active"
                            : "review"
                        }`}
                      >
                        {zone.status === "Active"
                          ? "Active"
                          : "Review"}
                      </span>

                    )}

                  </div>


                  <div className="zone-capacity">

                    <div className="capacity-row">

                      <span>
                        Vendor Capacity
                      </span>

                      <strong>
                        {zone.vendors}/
                        {zone.capacity}
                      </strong>

                    </div>


                    <div className="capacity-bar">

                      <div
                        style={{
                          width:
                            `${percentage}%`,
                        }}
                      />

                    </div>


                    <span className="available-text">

                      {Math.max(
                        zone.capacity -
                          zone.vendors,
                        0
                      )}{" "}
                      spaces available

                    </span>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </main>
  );
}

export default Zones;