import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import dayjs from 'dayjs';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/',
  }),
  endpoints: (builder) => ({
    getWeatherByPositon: builder.query<object, { lon: number; lat: number }>({
      query: ({ lon, lat }) => ({
        url: `timeline/${lat + ',' + lon}`,
        params: { key: process.env.NEXT_PUBLIC_WEATHER_KEY },
      }),
    }),
    getWeatherByLocations: builder.query<
      {
        locations: Array<{
          timezone: string;
          resolvedAddress: string;
          days: Array<object>;
        }>;
      },
      string
    >({
      query: (locations) => ({
        url: 'timelinemulti',
        params: {
          locations: locations,
          key: process.env.NEXT_PUBLIC_WEATHER_KEY,
          datestart: dayjs().format('YYYY-MM-DD'),
          dateend: dayjs().add(3, 'day').format('YYYY-MM-DD'),
          include: 'days',
        },
      }),
    }),
  }),
});

export const { useGetWeatherByPositonQuery, useGetWeatherByLocationsQuery } =
  weatherApi;
