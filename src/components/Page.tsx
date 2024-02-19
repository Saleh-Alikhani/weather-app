import { getCountryDataList } from 'countries-list';

import Main from './Main';
import SearchBar from './SearchBar';

const Page = () => {
  const getRandomNumber = (max: number): number => {
    return Math.floor(Math.random() * max);
  };
  const countriesList = getCountryDataList().filter(
    (c) => c.capital !== '' && c !== undefined
  );

  const randomLocations = Array(5)
    .fill(0)
    .map(() => {
      const random = getRandomNumber(countriesList.length - 1);
      return countriesList[random].capital + ',' + countriesList[random].name;
    });

  return (
    <>
      <SearchBar countriesList={countriesList} />

      <Main locations={randomLocations} />
    </>
  );
};

export default Page;
