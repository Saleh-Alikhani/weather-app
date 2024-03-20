import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import dayjs from 'dayjs';

import { CurrentConditions, Day } from './types';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/',
  }),
  endpoints: (builder) => ({
    getWeatherByPositon: builder.query<
      {
        currentConditions: CurrentConditions;
        days: Array<Day>;
        timezone: string;
        resolvedAddress: string;
      },
      string
    >({
      query: (position) => ({
        url: 'timeline/' + position,
        params: {
          key: process.env.NEXT_PUBLIC_WEATHER_KEY,
          unitGroup: 'metric',
          datestart: dayjs().format('YYYY-MM-DD'),
        },
      }),
    }),
    getWeatherByLocations: builder.query<
      {
        locations: Array<{
          timezone: string;
          resolvedAddress: string;
          days: Array<Day>;
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
          unitGroup: 'metric',
        },
      }),
    }),
  }),
});

export const geoCodeApi = createApi({
  reducerPath: 'geoCodeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://geocode.xyz/',
  }),
  endpoints: (builder) => ({
    getCityByGeoCode: builder.query<{ city: string; region: string }, string>({
      query: (pos) => ({
        url: pos,
        params: { auth: process.env.NEXT_PUBLIC_GEOCODE_KEY, json: 1 },
      }),
    }),
  }),
});

export const { useGetWeatherByPositonQuery, useGetWeatherByLocationsQuery } =
  weatherApi;

export const { useGetCityByGeoCodeQuery } = geoCodeApi;
