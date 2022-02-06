import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, Status } from '../../app/store';
import { getPlanes, PlaneAPIResponse } from './planeAPI';

export interface PlaneListState {
  planes: PlaneAPIResponse;
  status: Status;
}

const initialState: PlaneListState = {
  planes: { results: [], status: { offset: 0, total: 0 }},
  status: 'idle',
};

export const fetchPlanes = createAsyncThunk(
  'planeList/getPlanes',
  async (query: { skip: number, take: number, search?: string}) => {
    const response = await getPlanes(query.skip, query.take, query.search);
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
