import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, Status } from '../../app/store';
import { AdminCredentials, AdminDoc, loginAdminAPI } from './loginAPI';

export interface LoginState {
  admin?: AdminDoc;
  accessToken?: string;
  status: Status;
}

const initialState: LoginState = {
  admin: undefined,
  accessToken: undefined,
  status: 'idle',
};

export const loginAdmin = createAsyncThunk(
  'admin/login',
  async (credentials: AdminCredentials) => {
    const response = await loginAdminAPI(credentials);
    localStorage.setItem('token', JSON.stringify(response));
    return response;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
      logout: (state) => {
        state.status = 'idle';
        state.admin = undefined;
        state.accessToken = undefined;
        localStorage.removeItem('token');
      },
      loadFromLocalStorage: (state) => {
          try {
              const data = localStorage.getItem('token');
              if (!data) return;
              const parsedData = JSON.parse(data);
              state.admin = parsedData.user;
              state.accessToken = parsedData.accessToken;
              
          } catch(e) {
              return;
          }
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAdmin.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.admin = action.payload.user;
        state.accessToken = action.payload.accessToken;
      });
  },
});

export const { logout, loadFromLocalStorage } = loginSlice.actions;

export const selectAdmin = (state: RootState) => state.login.admin;
export const selectAccessToken = (state: RootState) => state.login.accessToken;

export default loginSlice.reducer;
