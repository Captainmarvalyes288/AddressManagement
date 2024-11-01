
export const defaultMapConfig = {
    center: { lat: 20.5937, lng: 78.9629 }, 
    zoom: 5,
    options: {
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    }
  };
  
  export const generateMarkerIcon = (category, isFavorite) => {
    const icons = {
      home: '/icons/home-marker.svg',
      office: '/icons/office-marker.svg',
      family: '/icons/family-marker.svg'
    };
  
    return {
      url: icons[category] || '/icons/default-marker.svg',
      scaledSize: new window.google.maps.Size(30, 30),
      className: isFavorite ? 'favorite-marker' : ''
    };
  };