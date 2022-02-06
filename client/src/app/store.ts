import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import planeListReducer from '../features/PlaneList/planeListSlice';
import searchReducer from '../features/NavBar/search'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    planeList: planeListReducer,
    search: searchReducer,
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
