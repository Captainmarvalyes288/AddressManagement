
import React, { useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { LocationProvider } from './context/LocationContext';
import { ToastProvider } from './context/ToastContext';
import AppLayout from './layouts/AppLayout';
import LocationManager from './features/LocationManager';
import Modal from './features/LocationManager/components/Modal';
import './App.css';

const libraries = ['places'];

const App = () => {
  const [isModalOpen, setModalOpen] = useState(true);

  const handleEnableLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Handle location enabled
        console.log('Location enabled:', position);
        setModalOpen(false);
      },
      (error) => {
        console.error('Error obtaining location', error);
        alert('Unable to retrieve your location.');
      }
    );
  };

  const handleSearchManually = () => {
    // Handle search manually action
    setModalOpen(false);
  };

  if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    console.error('Google Maps API key is not defined');
    return <div>Error: Google Maps API key is not configured</div>;
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={libraries}>
      <ToastProvider>
        <LocationProvider>
          <AppLayout>
            <LocationManager />
            <Modal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              onEnableLocation={handleEnableLocation}
              onSearchManually={handleSearchManually}
            />
          </AppLayout>
        </LocationProvider>
      </ToastProvider>
    </LoadScript>
  );
};

export default App;
