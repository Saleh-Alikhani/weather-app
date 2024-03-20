import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  initialState: false,
  name: 'isMapSelected',
  reducers: () => ({
    toggleMap: (state) => (state = !state),
  }),
});

export const { toggleMap } = mapSlice.actions;

export default mapSlice.reducer;
