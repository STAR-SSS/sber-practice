import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    username: localStorage.getItem('username') || '',
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.username = action.payload;
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = '';
      localStorage.setItem('isAuthenticated', 'false');
      localStorage.removeItem('username');
    },
  },
});

export const { login, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
