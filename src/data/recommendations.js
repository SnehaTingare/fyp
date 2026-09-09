// src/data/recommendations.js

const zones = [
  {
    id: 1,
    name: "Panchavati Zone",
    locality: "Panchavati",
    coordinates: [20.0115, 73.7903],
    capacity: 15,
    vendors: 9,
    businessTypes: ["Food Vendor", "Food", "Retail", "Clothing"],
  },

  {
    id: 2,
    name: "Gangapur Road Zone",
    locality: "Gangapur Road",
    coordinates: [20.0008, 73.7512],
    capacity: 12,
    vendors: 7,
    businessTypes: ["Food Vendor", "Food", "Retail", "Daily Needs"],
  },

  {
    id: 3,
    name: "Nashik East Zone",
    locality: "Nashik East",
    coordinates: [20.0065, 73.8276],
    capacity: 14,
    vendors: 8,
    businessTypes: ["Food Vendor", "Retail", "Vegetables", "Household"],
  },

  {
    id: 4,
    name: "Nashik Road Zone",
    locality: "Nashik Road",
    coordinates: [19.9556, 73.8352],
    capacity: 12,
    vendors: 8,
    businessTypes: ["Food Vendor", "Food", "Fruits", "Daily Needs"],
  },

  {
    id: 5,
    name: "Indira Nagar Zone",
    locality: "Indira Nagar",
    coordinates: [19.9734, 73.8072],
    capacity: 10,
    vendors: 6,
    businessTypes: ["Food Vendor", "Food", "Retail", "Clothing"],
  },

  {
    id: 6,
    name: "Makhmalabad Zone",
    locality: "Makhmalabad",
    coordinates: [20.0385, 73.7785],
    capacity: 10,
    vendors: 4,
    businessTypes: ["Vegetables", "Fruits", "Food Vendor", "Food"],
  },

  {
    id: 7,
    name: "Satpur Zone",
    locality: "Satpur",
    coordinates: [20.0002, 73.7291],
    capacity: 10,
    vendors: 5,
    businessTypes: ["Food Vendor", "Food", "Tea", "Daily Needs"],
  },

  {
    id: 8,
    name: "CIDCO Zone",
    locality: "CIDCO",
    coordinates: [19.9615, 73.7962],
    capacity: 12,
    vendors: 8,
    businessTypes: ["Food Vendor", "Food", "Retail", "Clothing"],
  },
];


// Nashik locality coordinates

const localityCoordinates = {
  panchavati: [20.0115, 73.7903],
  "gangapur road": [20.0008, 73.7512],
  gangapur: [20.0008, 73.7512],

  "nashik east": [20.0065, 73.8276],
  "nashik road": [19.9556, 73.8352],

  "indira nagar": [19.9734, 73.8072],
  satpur: [20.0002, 73.7291],

  cidco: [19.9615, 73.7962],
  makhmalabad: [20.0385, 73.7785],

  bhadrakali: [20.0059, 73.7897],
  "peth road": [20.0115, 73.7780],
  "pathardi phata": [19.9590, 73.8070],
};


// Get coordinates for vendor location

export function getVendorCoordinates(location = "") {
  const text = location.toLowerCase();

  for (const [locality, coordinates] of Object.entries(
    localityCoordinates
  )) {
    if (text.includes(locality)) {
      return coordinates;
    }
  }

  // Default to central Nashik
  return [20.0059, 73.7897];
}


// Calculate distance between two coordinates

function calculateDistance(point1, point2) {
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;

  const earthRadius = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadius * c;
}


// Business compatibility

function getBusinessCompatibility(
  vendorType,
  zoneTypes
) {
  if (!vendorType) {
    return 70;
  }

  const type = vendorType.toLowerCase();

  const match = zoneTypes.some((zoneType) => {
    const zone = zoneType.toLowerCase();

    return (
      type.includes(zone) ||
      zone.includes(type) ||
      (type.includes("food") &&
        zone.includes("food")) ||
      (type.includes("retail") &&
        zone.includes("retail")) ||
      (type.includes("fruit") &&
        zone.includes("fruit")) ||
      (type.includes("vegetable") &&
        zone.includes("vegetable"))
    );
  });

  return match ? 95 : 60;
}


// Generate recommendations

export function getRecommendations(vendor) {
  const vendorLocation = getVendorCoordinates(
    vendor?.location
  );

  const vendorType =
    vendor?.businessType || "";


  const scoredZones = zones.map((zone) => {

    const distance = calculateDistance(
      vendorLocation,
      zone.coordinates
    );


    // Distance score

    let distanceScore;

    if (distance <= 1) {
      distanceScore = 100;
    } else if (distance <= 2) {
      distanceScore = 95;
    } else if (distance <= 3) {
      distanceScore = 88;
    } else if (distance <= 5) {
      distanceScore = 78;
    } else if (distance <= 8) {
      distanceScore = 65;
    } else {
      distanceScore = 50;
    }


    // Business compatibility

    const compatibilityScore =
      getBusinessCompatibility(
        vendorType,
        zone.businessTypes
      );


    // Capacity

    const availableSlots =
      zone.capacity - zone.vendors;

    const occupancy =
      zone.vendors / zone.capacity;

    let capacityScore;

    if (occupancy < 0.5) {
      capacityScore = 100;
    } else if (occupancy < 0.7) {
      capacityScore = 90;
    } else if (occupancy < 0.85) {
      capacityScore = 78;
    } else {
      capacityScore = 60;
    }


    // Existing activity

    const activityScore =
      zone.vendors >= 5 ? 90 : 75;


    // Final weighted score

    const finalScore = Math.round(
      compatibilityScore * 0.40 +
        distanceScore * 0.30 +
        capacityScore * 0.20 +
        activityScore * 0.10
    );


    let suitability;

    if (finalScore >= 85) {
      suitability = "Highly Suitable";
    } else if (finalScore >= 70) {
      suitability = "Suitable";
    } else {
      suitability = "Moderately Suitable";
    }


    return {
      ...zone,

      score: finalScore,

      distance: `${distance.toFixed(1)} km`,

      availableSlots,

      capacityText:
        availableSlots > 0
          ? `${availableSlots} slots available`
          : "No slots available",

      capacity:
        `${availableSlots} available`,

      suitability,

      reasons: [
        compatibilityScore >= 90
          ? "Good compatibility with the selected business type"
          : "Moderate compatibility with the selected business type",

        distance <= 3
          ? "Located close to the proposed vendor location"
          : "Accessible from the proposed vendor location",

        availableSlots > 0
          ? `${availableSlots} vendor slots currently available`
          : "Zone capacity is currently full",

        zone.vendors >= 5
          ? "Existing vending activity is present in the zone"
          : "Lower existing vendor activity provides additional opportunity",
      ],
    };
  });


  return scoredZones
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((zone, index) => ({
      ...zone,
      rank: index + 1,
    }));
}


export default zones;