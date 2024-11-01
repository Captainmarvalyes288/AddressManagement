import React from 'react';
import { Star, Trash2 } from 'lucide-react';
import { useLocationContext } from '../../../context/LocationContext';

const SavedLocations = () => {
  const { state, dispatch } = useLocationContext();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      dispatch({ type: 'DELETE_LOCATION', payload: id });
    }
  };

  const toggleFavorite = (location) => {
    dispatch({
      type: 'UPDATE_LOCATION',
      payload: { ...location, isFavorite: !location.isFavorite }
    });
  };

  return (
    <div className="card mt-6">
      <div className="card-header">
        <h2 className="text-lg font-semibold">Saved Locations</h2>
      </div>
      <div className="card-body">
        <div className="space-y-2">
          {state.savedLocations.map(location => (
            <div
              key={location.id}
              className={location.isFavorite ? 'location-item-favorite' : 'location-item'}
            >
              <div className="flex-1">
                <h3 className="font-medium">{location.label}</h3>
                <p className="text-sm text-gray-500 mt-1">{location.address}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleFavorite(location)}
                  className={`p-2 rounded-md ${
                    location.isFavorite ? 'text-amber-500' : 'text-gray-400'
                  } hover:bg-gray-100`}
                >
                  <Star size={20} />
                </button>
                <button
                  onClick={() => handleDelete(location.id)}
                  className="p-2 rounded-md text-gray-400 hover:bg-gray-100 hover:text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {state.savedLocations.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No saved locations yet. Start by searching for a location above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedLocations;