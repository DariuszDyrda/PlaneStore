import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import planeListReducer from '../features/PlaneList/planeListSlice';
import searchReducer from '../features/NavBar/searchSlice'
import orderReducer from '../features/BuyDialog/orderSlice';
import loginReducer from '../features/LoginDialog/loginSlicer';

export type Status = 'idle' | 'loading' | 'failed' | 'succeeded'

export const store = configureStore({
  reducer: {
    planeList: planeListReducer,
    search: searchReducer,
    order: orderReducer,
    login: loginReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
