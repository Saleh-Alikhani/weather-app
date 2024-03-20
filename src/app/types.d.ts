export type Day = {
  datetime: string;
  tempmax: number;
  tempmin: number;
  temp: number;
  conditions: string;
  sunset: string;
  sunrise: string;
};

export type CurrentConditions = {
  conditions: string;
  datetime: string;
  temp: number;
};

export type Conditions =
  | 'Partiallycloudy'
  | 'Clear'
  | 'Rain'
  | 'Snow'
  | 'Overcast';
