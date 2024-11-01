
import React, { useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Autocomplete } from '@react-google-maps/api';

const LocationSearch = ({ onLocationSelect }) => {
  const autocompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
  
    if (place && place.geometry) {
      const { location } = place.geometry;
  
      if (location) {
        onLocationSelect(
          {
            lat: location.lat(),
            lng: location.lng()
          },
          place.formatted_address
        );
      } else {
        console.error("Location data is missing.");
        alert("Please select a valid location with geometry.");
      }
    } else {
      console.error("No geometry found for the selected place.");
      alert("Please select a valid location with geometry.");
    }
  };
  
  
  const handleLocationSelect = (coords, address) => {
    console.log("Selected Coordinates:", coords);
    console.log("Selected Address:", address);
  };
  
  <LocationSearch onLocationSelect={handleLocationSelect} />
  
  return (
    <div className="search-container">
      <Autocomplete
        onLoad={ref => (autocompleteRef.current = ref)}
        onPlaceChanged={handlePlaceSelect}
      >
        <div className="relative">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search for a location..."
            className="search-input"
          />
        </div>
      </Autocomplete>
      <button
        onClick={() => navigator.geolocation.getCurrentPosition(
          pos => onLocationSelect(
            {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            },
            'Current Location'
          ),
          error => console.error(error)
        )}
        className="btn-secondary ml-2"
      >
        <MapPin size={20} className="mr-2" />
        Use My Location
      </button>
    </div>
  );
};

export default LocationSearch;
