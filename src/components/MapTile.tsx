import { setSelectedCountry } from '@app/locationSlice';
import { toggleMap } from '@app/mapSlice';
import { useState } from 'react';
import { Marker, TileLayer, useMap } from 'react-leaflet';
import { useDispatch } from 'react-redux';

import { StyledModal } from './MapTile.style';

const MapTile = () => {
  const map = useMap();
  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  map.addEventListener('click', (a) => {
    setPos(a.latlng);
    setIsModalOpen(true);
  });

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {pos !== null && (
        <>
          <StyledModal
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            okText="Get"
            onOk={() => {
              dispatch(setSelectedCountry(pos.lat + ',' + pos.lng));
              dispatch(toggleMap());
            }}
          >
            Get weather for that position?
          </StyledModal>
          <Marker position={pos} />
        </>
      )}
    </>
  );
};

export default MapTile;
