import { toggleMap } from '@app/mapSlice';
import { RootState } from '@app/store';
import { getRandomNumbers } from '@utils/common';
import { getCountryDataList } from 'countries-list';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';

import Main from './Main';
import { StyledFloatBtn } from './Main.style';
import SearchBar from './SearchBar';

const Page: React.FC = () => {
  const isMap = useSelector((state: RootState) => state.isMap);
  const Map = dynamic(() => import('@components/Map'), { ssr: false });
  const dispatch = useDispatch();

  const countriesList = getCountryDataList().filter(
    (c) => c.capital !== '' && c !== undefined
  );
  const randomLocations = getRandomNumbers(countriesList.length - 1, 5).map(
    (number) => countriesList[number].capital + ',' + countriesList[number].name
  );

  return (
    <>
      {isMap ? (
        <Map />
      ) : (
        <>
          <SearchBar />
          <Main locations={randomLocations} />
        </>
      )}
      <StyledFloatBtn
        onClick={() => dispatch(toggleMap())}
        tooltip="Choose location on the map"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z" />
          </svg>
        }
      />
    </>
  );
};

export default Page;
