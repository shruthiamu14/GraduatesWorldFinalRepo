import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { v4 as uuidv4 } from 'uuid';  // Import UUID for temporary ID generation

// Configure Leaflet's icon default paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetina,
    iconUrl: icon,
    shadowUrl: iconShadow
});

function LocationApp() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('https://graduatesworldfinalrepo.onrender.com/api/businesslocations')
    .then(response => response.json())
    .then(data => {
      setLocations(data.map(location => ({ ...location, added: false })));
    })
    .catch(error => console.error('Failed to fetch locations:', error));
  }, []);

  const handleToggleLocation = (locationId) => {
    setLocations(prev => prev.map(location => {
      if (location._id === locationId) {
        return { ...location, added: !location.added };
      }
      return location;
    }));
  };

  const handleAddLocation = (e) => {
    const { lat, lng } = e.latlng;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(response => response.json())
        .then(data => {
            // Extract the city name from the response data
            const cityName = data.address.city || data.address.town || "Unknown location";

            // Create a new location object with the city name
            const newLocation = {
                _id: uuidv4(),
                lat: lat,
                lng: lng,
                name: cityName,
                added: true
            };

            // Add the new location to the state or perform any other necessary actions
            setLocations(prev => [...prev, newLocation]);

            // Send the new location to the backend
            fetch('https://graduatesworldfinalrepo.onrender.com/api/businesslocations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newLocation)
            })
            .then(res => res.json())
            .then(addedLocation => {
                // Optionally, handle the response from the backend
                console.log("Location added successfully:", addedLocation);
            })
            .catch(error => {
                console.error("Error adding new location:", error);
            });
        })
        .catch(error => {
            console.error("Error fetching city name:", error);
            // Handle the error here (e.g., set default city name)
            const newLocation = {
                _id: uuidv4(),
                lat: lat,
                lng: lng,
                name: "Unknown location"
            };
            // Add the new location to the state or perform any other necessary actions
            setLocations(prev => [...prev, newLocation]);
        });
};

  const handleRemoveLocation = (locationId) => {
    fetch(`https://graduatesworldfinalrepo.onrender.com/api/businesslocations/${locationId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setLocations(prev => prev.filter(location => location._id !== locationId));
      } else {
        throw new Error('Failed to delete the location');
      }
    })
    .catch(error => console.error('Error removing location:', error));
  };

  return (
    <div className="location-app">
        <br />
      <h1><center>Current Job locations</center></h1>
      <br />
      <MapContainer center={[15.9129, 79.7400]} zoom={7} style={{ width: '100%', height: '400px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <AddLocation handleAddLocation={handleAddLocation} />
        {locations.length>0 && locations.map(location => (
          <LocationMarker
            key={location._id}
            location={location}
            onToggle={handleToggleLocation}
            onRemove={handleRemoveLocation}
          />
        ))}
      </MapContainer>
    </div>
  );
}

function AddLocation({ handleAddLocation }) {
  useMapEvents({
    click: handleAddLocation
  });

  return null;
}

function LocationMarker({ location, onToggle, onRemove }) {
    const markerRef = useRef(null);
  
    useEffect(() => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }, []);
  
    if (!location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
      console.error('Invalid location data:', location);
      return null;  // Return null if data is invalid
    }
  
    const handleClick = () => {
      if (location.added) {
        onRemove(location._id);
      } else {
        onToggle(location._id);
      }
    };
  
    return (
      <Marker
        position={[location.lat, location.lng]}
        ref={markerRef}
        eventHandlers={{
          click: handleClick  // Bind click event handler
        }}
      >
        <Popup>
          <strong>Location:</strong> {location.name}<br />
          <strong>Coordinates:</strong> {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </Popup>
        <Tooltip direction="top" offset={[0, -10]} opacity={1}>
          {location.name} ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})
        </Tooltip>
      </Marker>
    );
  }
  

export default LocationApp;


// import React, { useState, useEffect, useRef } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// import { v4 as uuidv4 } from 'uuid';  // Import UUID for temporary ID generation

// // Configure Leaflet's icon default paths
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: iconRetina,
//     iconUrl: icon,
//     shadowUrl: iconShadow
// });

// function LocationMarker({ location, onRemove }) {
//   const markerRef = useRef(null);

//   useEffect(() => {
//     if (markerRef.current) {
//       markerRef.current.openPopup();
//     }
//   }, []);

//   if (!location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
//     console.error('Invalid location data:', location);
//     return null;  // Return null if data is invalid
//   }

//   return (
//     <Marker
//       position={[location.lat, location.lng]}
//       ref={markerRef}
//       eventHandlers={{
//         click: () => onRemove(location._id)
//       }}
//     >
//       <Popup>
//         <strong>Location:</strong> {location.name}<br />
//         <strong>Coordinates:</strong> {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
//       </Popup>
//       <Tooltip direction="top" offset={[0, -10]} opacity={1}>
//         {location.name} ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})
//       </Tooltip>
//     </Marker>
//   );
// }

// function AddLocation({ setLocations }) {
//   useMapEvents({
//     click: async (e) => {
//       const { lat, lng } = e.latlng;
//       const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
//       const data = await response.json();
//       const cityName = data.address.city || data.address.town || "Unknown location";
//       const newLocation = {
//         _id: uuidv4(),  // Generate a temporary UUID
//         lat: lat,
//         lng: lng,
//         name: cityName
//       };

//       fetch('/api/businesslocations', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newLocation)
//       })
//       .then(res => res.json())
//       .then(addedLocation => {
//         setLocations(prev => [
//           ...prev,
//           newLocation
//         ]);
//       })
//       .catch(error => {
//         console.error("Error adding new location:", error);
//       });

//       // setLocations(prev => [...prev, newLocation]);  // Temporarily add the new location with UUID
//     }
//   });

//   return null;  // This component does not render anything itself
// }

// function LocationApp() {
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     fetch('/api/businesslocations')
//     .then(response => response.json())
//     .then(data => {
//       setLocations(data);
//     })
//     .catch(error => console.error('Failed to fetch locations:', error));
//   }, []);

//   const handleRemoveLocation = (locationId) => {
//     fetch(`/api/businesslocations/${locationId}`, {
//       method: 'DELETE'
//     })
//     .then(response => {
//       if (response.ok) {
//         setLocations(locations => locations.filter(location => location._id !== locationId));
//       } else {
//         throw new Error('Failed to delete the location');
//       }
//     })
//     .catch(error => console.error('Error removing location:', error));
//   };

//   return (
//     <div className="location-app">
//       <h1>We are available at</h1>
//       <MapContainer center={[15.9129, 79.7400]} zoom={7} style={{ width: '100%', height: '400px' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <AddLocation setLocations={setLocations} />
//         {locations.length>0 && locations.map(location => (
//           <LocationMarker
//             key={location._id}
//             location={location}
//             onRemove={handleRemoveLocation}
//           />
//         ))}
//       </MapContainer>
//     </div>
//   );
// }

// export default LocationApp;
