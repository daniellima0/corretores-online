import React from 'react';
import { Box } from '@mui/material';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';

const HomePage = () => {
  const apiKey = 'AIzaSyD3eD__3scBZrYIqi9DMB0YQy7WaP7jcSw'; 

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  if (!isLoaded) {
    return <div>Erro!</div>;
  }

  return (
    <Box position='absolute' left={0} top={0} height='100%' width='100%'>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{ lat: -34.397, lng: 150.644 }}
          zoom={8}
        >
        </GoogleMap>
      ) : (
        <div>Carregando Google Maps...</div>
      )}
    </Box>
  );
};

export default HomePage;
