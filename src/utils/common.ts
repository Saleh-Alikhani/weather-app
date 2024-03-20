import { ICity } from 'country-state-city';

export const getRandomNumbers = (max: number, count: number): Array<number> => {
  const res: Array<number> = [];
  let temp;
  for (let i = 0; i < count; i++) {
    temp = Math.floor(Math.random() * max);
    if (!res.includes(temp)) {
      res.push(temp);
    } else {
      i--;
    }
  }
  return res;
};

export const sortByCapital = (a: ICity, b: ICity) => {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  }
  return 0;
};
