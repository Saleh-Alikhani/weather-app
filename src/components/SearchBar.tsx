import { setSelectedCountry } from '@app/locationSlice';
import { RootState } from '@app/store';
import { sortByCapital } from '@utils/common';
import { City, Country } from 'country-state-city';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyledAutoComplete, StyledWrapper } from './SearchBar.style';

const SearchBar: React.FC = () => {
  const cities = City.getAllCities();
  const [options, setOptions] = useState(
    cities.sort(sortByCapital).map((c, i) => ({
      label: c.name + ',' + c.countryCode,
      value: c.name,
      key: i,
    }))
  );

  const location = useSelector((s: RootState) => s.location);

  const [state, setState] = useState(location);

  useEffect(() => setState(location), [location]);
  const dispatch = useDispatch();

  return (
    <StyledWrapper>
      <StyledAutoComplete
        value={state}
        options={options}
        placeholder="Search Your City"
        onChange={(text: any) => {
          setState(text);
          text
            ? setOptions(
                cities
                  .filter(
                    (c) =>
                      c.name.includes(
                        text.charAt(0).toUpperCase() + text.slice(1)
                      ) || c.name.includes(text)
                  )
                  .sort(sortByCapital)
                  .map((c, i) => ({
                    label: c.name + ',' + c.countryCode,
                    value: c.name,
                    key: i,
                  }))
              )
            : setOptions(
                cities.sort(sortByCapital).map((c, i) => ({
                  label: c.name + ',' + c.countryCode,
                  value: c.name,
                  key: i,
                }))
              );
        }}
        onSelect={(value) =>
          dispatch(
            setSelectedCountry(
              value +
                ',' +
                Country.getCountryByCode(
                  cities.find((v) => v.name === value)?.countryCode as string
                )?.name
            )
          )
        }
        onClear={() => dispatch(setSelectedCountry(''))}
        allowClear
      />
    </StyledWrapper>
  );
};

export default SearchBar;
