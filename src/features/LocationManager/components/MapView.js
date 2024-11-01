import React, { useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useLocationContext } from '../../../context/LocationContext';

const MapView = ({ location, savedLocations }) => {
  const { dispatch } = useLocationContext();
  const mapRef = useRef(null);

  const handleMarkerDragEnd = (event) => {
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    dispatch({ type: 'SET_CURRENT_LOCATION', payload: { location: newLocation } });
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          mapRef.current.panTo(newLocation); // Move the map to the new location
          dispatch({ type: 'SET_CURRENT_LOCATION', payload: { location: newLocation } });
        },
        (error) => {
          console.error('Error obtaining location', error);
          alert('Unable to retrieve your location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="card">
      <GoogleMap
        mapContainerClassName="map-container"
        center={location || { lat: 20.5937, lng: 78.9629 }}
        zoom={location ? 15 : 5}
        onLoad={map => (mapRef.current = map)}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true
        }}
      >
        {location && (
          <Marker
            position={location}
            draggable
            onDragEnd={handleMarkerDragEnd}
            animation={window.google.maps.Animation.DROP}
          />
        )}
        {savedLocations.map(loc => (
          <Marker
            key={loc.id}
            position={loc.location}
            icon={{
              url: loc.isFavorite ? '/favorite-marker.svg' : '/marker.svg',
              scaledSize: new window.google.maps.Size(30, 30)
            }}
          />
        ))}
      </GoogleMap>
      <button onClick={handleLocateMe} className="btn-primary mt-4">
        Locate Me
      </button>
    </div>
  );
};

export default MapView;
