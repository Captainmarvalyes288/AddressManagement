import React, { createContext, useContext, useReducer } from 'react';

const LocationContext = createContext();

const initialState = {
  currentLocation: null,
  savedLocations: [],
  addressDetails: {
    label: '',
    category: 'home',
    notes: ''
  }
};

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_LOCATION':
      return {
        ...state,
        currentLocation: action.payload.location,
        address: action.payload.address
      };
    case 'ADD_LOCATION':
      return {
        ...state,
        savedLocations: [...state.savedLocations, action.payload]
      };
    case 'UPDATE_LOCATION':
      return {
        ...state,
        savedLocations: state.savedLocations.map(loc =>
          loc.id === action.payload.id ? action.payload : loc
        )
      };
    case 'DELETE_LOCATION':
      return {
        ...state,
        savedLocations: state.savedLocations.filter(loc => loc.id !== action.payload)
      };
    default:
      return state;
  }
};

export const LocationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);
  return (
    <LocationContext.Provider value={{ state, dispatch }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);