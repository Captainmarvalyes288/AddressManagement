
import React, { useState , useEffect } from 'react';
import { useLocationContext } from '../../context/LocationContext';
import LocationSearch from './components/LocationSearch';
import MapView from './components/MapView';
import AddressForm from './components/AddressForm';
import SavedLocations from './components/SavedLocations';

const LocationManager = () => {
  const { state, dispatch } = useLocationContext();
  const [showAddressForm, setShowAddressForm] = useState(false);
   
  useEffect(() => {
    console.log('Google Maps API Status:', window.google ? 'Loaded' : 'Not loaded');
  }, []);
  
  const handleLocationSelect = (location, address) => {
    dispatch({ type: 'SET_CURRENT_LOCATION', payload: { location, address } });
    setShowAddressForm(true);
  };

  return (
    <div className="space-y-6">
      <LocationSearch onLocationSelect={handleLocationSelect} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MapView 
            location={state.currentLocation}
            savedLocations={state.savedLocations}
          />
        </div>
        <div>
          {showAddressForm && <AddressForm onSave={() => setShowAddressForm(false)} />}
          <SavedLocations locations={state.savedLocations} />
        </div>
      </div>
    </div>
  );
};

export default LocationManager;