import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const GoogleMapComponent = ({ locationData, handleMarkerDragEnd }) => (
  <div className="map-container">
    <GoogleMap
      mapContainerClassName="w-full h-96 rounded-lg"
      center={locationData.currentLocation || { lat: 20.5937, lng: 78.9629 }}
      zoom={locationData.currentLocation ? 15 : 5}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true
      }}
    >
      {locationData.currentLocation && (
        <Marker
          position={locationData.currentLocation}
          draggable
          onDragEnd={handleMarkerDragEnd}
          animation={window.google.maps.Animation.DROP}
        />
      )}
    </GoogleMap>
    {locationData.address && (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700">Selected Location:</h3>
        <p className="mt-1 text-gray-600">{locationData.address}</p>
      </div>
    )}
  </div>
);

export default GoogleMapComponent;
