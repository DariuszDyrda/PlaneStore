import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getPlanes } from './planeAPI';
import { IPlaneProps } from './PlaneCard/PlaneCard';

export interface PlaneListState {
  planes: IPlaneProps[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
}

const initialState: PlaneListState = {
  planes: [],
  status: 'idle',
};

export const fetchPlanes = createAsyncThunk(
  'planeList/getPlanes',
  async () => {
    const response = await getPlanes();
    return response;
  }
);

export const planeListSlice = createSlice({
  name: 'planeList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlanes.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchPlanes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.planes = action.payload;
      });
  },
});

export const selectPlanes = (state: RootState) => state.planeList.planes;

export default planeListSlice.reducer;
