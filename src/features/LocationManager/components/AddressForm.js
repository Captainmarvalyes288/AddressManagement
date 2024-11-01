import React, { useState } from 'react';
import { useLocationContext } from '../../../context/LocationContext';
import { Home, Briefcase, Users } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

const categories = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'office', label: 'Office', icon: Briefcase },
  { id: 'family', label: 'Family & Friends', icon: Users }
];

const AddressForm = ({ onSave }) => {
  const { state, dispatch } = useLocationContext();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    label: '',
    category: 'home',
    notes: '',
    isFavorite: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLocation = {
      id: Date.now(),
      location: state.currentLocation,
      address: state.address,
      ...formData
    };
    
    try {
      dispatch({ type: 'ADD_LOCATION', payload: newLocation });
      addToast('Location saved successfully!', 'success');
      onSave();
    } catch (error) {
      addToast('Failed to save location', 'error');
      console.error('Error saving location:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div className="card-header">
        <h2 className="text-lg font-semibold">Save Location</h2>
      </div>
      <div className="card-body space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
           House/Flat/Block No.
          </label>
          <input
            type="text"
            value={formData.label}
            onChange={e => setFormData({ ...formData, label: e.target.value })}
            className="input-base"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setFormData({ ...formData, category: id })}
                className={`flex items-center justify-center p-3 rounded-md border ${
                  formData.category === id
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon size={20} className="mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apartment/Road/Area
          </label>
          <textarea
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            className="input-base min-h-[100px]"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="favorite"
            checked={formData.isFavorite}
            onChange={e => setFormData({ ...formData, isFavorite: e.target.checked })}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="favorite" className="ml-2 text-sm text-gray-700">
            Mark as favorite
          </label>
        </div>
      </div>
      
      <div className="card-footer flex justify-end space-x-2">
        <button type="button" onClick={onSave} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Save Location
        </button>
      </div>
    </form>
  );
};

export default AddressForm;