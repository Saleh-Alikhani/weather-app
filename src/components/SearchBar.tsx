import { setSelectedCountry } from '@app/locationSlice';
import { RootState } from '@app/store';
import { sortByCapital } from '@utils/common';
import { AutoComplete } from 'antd';
import { City, Country } from 'country-state-city';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyledWrapper } from './SearchBar.style';

const SearchBar: React.FC = () => {
  const cities = City.getAllCities();
  const [options, setOptions] = useState(
    cities
      .sort(sortByCapital)
      .map((c, i) => ({ label: c.name, value: c.name, key: i }))
  );

  const location = useSelector((s: RootState) => s.location);

  const dispatch = useDispatch();

  return (
    <StyledWrapper>
      <AutoComplete
        defaultValue={location}
        options={options}
        placeholder="Search Your City"
        onChange={(text: string) =>
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
                    label: c.name,
                    value: c.name,
                    key: i,
                  }))
              )
            : setOptions(
                cities.sort(sortByCapital).map((c, i) => ({
                  label: c.name,
                  value: c.name,
                  key: i,
                }))
              )
        }
        onSelect={(value) =>
          dispatch(
            setSelectedCountry(
              value +
                ',' +
                Country.getCountryByCode(
                  cities.find((v) => v.name === value)?.countryCode as string
                )
            )
          )
        }
        onClear={() => dispatch(setSelectedCountry(''))}
        allowClear
        style={{ width: '100%' }}
      />
    </StyledWrapper>
  );
};

export default SearchBar;
