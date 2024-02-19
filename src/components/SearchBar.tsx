import { AutoComplete } from 'antd';
import { ICountry } from 'countries-list';
import { useState } from 'react';

type Props = {
  countriesList: ICountry[];
};

const SearchBar: React.FC<Props> = ({ countriesList }) => {
  const [options, setOptions] = useState(
    countriesList
      .sort((a, b) => {
        if (a.capital < b.capital) {
          return -1;
        } else if (a.capital > b.capital) {
          return 1;
        }
        return 0;
      })
      .map((c) => ({ label: c.capital, value: c.capital }))
  );
  return (
    <>
      <AutoComplete
        options={options}
        // onSearch={(text) =>
        //   setOptions(
        //     countriesList
        //       .filter((c) => c.capital.includes(text))
        //       .map((c) => ({ label: c.capital, value: c.capital }))
        //   )
        // }
        onChange={(text) =>
          setOptions(
            countriesList
              .filter((c) => c.capital.includes(text))
              .sort((a, b) => {
                if (a.capital < b.capital) {
                  return -1;
                } else if (a.capital > b.capital) {
                  return 1;
                }
                return 0;
              })
              .map((c) => ({ label: c.capital, value: c.capital }))
          )
        }
        style={{ width: '100%' }}
      />
    </>
  );
};

export default SearchBar;
