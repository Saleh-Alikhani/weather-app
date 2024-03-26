//import 'leaflet/dist/leaflet.css';

import { useRef } from 'react';

import MapTile from './MapTile';
import { StyledMapContainer } from './MapTile.style';

const Map = () => {
  const mapRef = useRef(null);

  const defaultCenter = { lat: 38.9072, lng: -77.0369 };
  const defaultZoom = 4;

  return (
    <div>
      <div>
        <StyledMapContainer
          ref={mapRef}
          center={defaultCenter}
          zoom={defaultZoom}
        >
          <MapTile />
        </StyledMapContainer>
      </div>
    </div>
  );
};

export default Map;
