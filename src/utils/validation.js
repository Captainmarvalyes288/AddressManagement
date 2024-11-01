
export const validateLocationData = (data) => {
    const errors = {};
  
    if (!data.label?.trim()) {
      errors.label = 'Label is required';
    }
  
    if (!data.category) {
      errors.category = 'Category is required';
    }
  
    if (!data.location?.lat || !data.location?.lng) {
      errors.location = 'Invalid location coordinates';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };