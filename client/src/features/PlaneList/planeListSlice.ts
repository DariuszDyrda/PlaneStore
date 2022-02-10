import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, Status } from '../../app/store';
import { createPlaneAPI, deletePlaneAPI, getPlanesAPI, PlaneAPIResponse, PlaneCreateData, updatePlaneAPI } from './planeAPI';
import { PLANES_PER_PAGE } from './PlaneList';

export interface PlaneListState {
  planes: PlaneAPIResponse;
  status: Status;
  requestStatus: Status;
}

const initialState: PlaneListState = {
  planes: { results: [], status: { offset: 0, total: 0 }},
  status: 'idle',
  requestStatus: 'idle',
};

export const fetchPlanes = createAsyncThunk(
  'planeList/getPlanes',
  async (query: { skip: number, take: number, search?: string}) => {
    const response = await getPlanesAPI(query.skip, query.take, query.search);
    return response;
  }
);

export const deletePlane = createAsyncThunk(
  'planeList/deletePlane',
  async (data: { id: number, token: string }) => {
    return await deletePlaneAPI(data.id, data.token);
  }
);

export const createPlane = createAsyncThunk(
  'planeList/createPlane',
  async (data: { createData: PlaneCreateData, token: string }) => {
    const response = await createPlaneAPI(data.createData, data.token);
    return response;
  }
);

export const updatePlane = createAsyncThunk(
  'planeList/updatePlane',
  async (data: { id: number, updateData: PlaneCreateData, token: string }) => {
    const response = await updatePlaneAPI(data.id, data.updateData, data.token);
    return response;
  }
);

export const planeListSlice = createSlice({
  name: 'planeList',
  initialState,
  reducers: {
    makeRequestStatusIdle: (state) => {
      state.requestStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
       // fetch planes
      .addCase(fetchPlanes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlanes.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchPlanes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.planes = action.payload;
      })
      // delete plane
      .addCase(deletePlane.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const planesArr = state.planes.results
        state.planes.results = planesArr.filter((el) => el.id !== action.payload);
      })
      .addCase(createPlane.fulfilled, (state, action) => {
        state.requestStatus = 'succeeded';
        if (state.planes.results.length >= PLANES_PER_PAGE) return;
        state.planes.results.push(action.payload);
      })
      .addCase(createPlane.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(createPlane.rejected, (state) => {
        state.requestStatus = 'failed';
      })
      .addCase(updatePlane.fulfilled, (state, action) => {
        state.requestStatus = 'succeeded';
        const updatedIndex = state.planes.results.findIndex((elem) => elem.id === action.payload.id);
        if (updatedIndex === -1) return;
        state.planes.results[updatedIndex] = action.payload;
      })
      .addCase(updatePlane.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(updatePlane.rejected, (state) => {
        state.requestStatus = 'failed';
      })
  },
});

export const selectPlanes = (state: RootState) => state.planeList.planes;
export const selectRequestStatus = (state: RootState) => state.planeList.requestStatus;

export const { makeRequestStatusIdle } = planeListSlice.actions;

export default planeListSlice.reducer;
