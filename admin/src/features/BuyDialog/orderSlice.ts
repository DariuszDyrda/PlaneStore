import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, Status } from '../../app/store';
import { OrderAPIResponse, PlaceOrderData, postOrder } from './orderAPI';

export interface OrderState {
  order?: OrderAPIResponse;
  status: Status;
}

const initialState: OrderState = {
  order: undefined,
  status: 'idle',
};

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData: PlaceOrderData) => {
    const response = await postOrder(orderData);
    return response;
  }
);

export const buySlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    makeStatusIdle: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(placeOrder.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload;
      });
  },
});

export const { makeStatusIdle } = buySlice.actions;

export const selectOrderStatus = (state: RootState) => state.order.status;

export default buySlice.reducer;
