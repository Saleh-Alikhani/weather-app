import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  initialState: '',
  name: 'selectedLocaton',
  reducers: () => ({
    setSelectedCountry: (state, action) => (state = action.payload),
  }),
});

export const { setSelectedCountry } = locationSlice.actions;

export default locationSlice.reducer;
