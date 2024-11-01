
const validateLocation = (req, res, next) => {
    const { label, category, location } = req.body;
    
    if (!label?.trim()) {
      return res.status(400).json({ error: 'Label is required' });
    }
    
    if (!category || !['home', 'office', 'family'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    if (!location?.lat || !location?.lng) {
      return res.status(400).json({ error: 'Valid coordinates required' });
    }
    
    next();
  };
  
  module.exports = { validateLocation };