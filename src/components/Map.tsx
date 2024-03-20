//import 'leaflet/dist/leaflet.css';

import { useRef } from 'react';
import { MapContainer } from 'react-leaflet';

import MapTile from './MapTile';

const Map = () => {
  const mapRef = useRef(null);

  const defaultCenter = { lat: 38.9072, lng: -77.0369 };
  const defaultZoom = 4;

  //center={{ lat: 32.38968947747705, lng: 51.335882986870125 }}

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div>
        <MapContainer
          ref={mapRef}
          center={defaultCenter}
          zoom={defaultZoom}
          style={{ height: '100vh' }}
        >
          <MapTile />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
