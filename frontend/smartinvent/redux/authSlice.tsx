import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  role: '', 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state: any) => {
        state.isAuthenticated = true
    },
    setRole: (state, action) => {
      state.role = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.role = ''
    }
  },
});

export const { loginUser, setRole, logout } = authSlice.actions;

// Selectors
export const selectAuth = (state: any) => state.auth;
export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const selectUser = (state: any) => state.auth.user;
export const selectUserRole = (state: any) => state.auth.role;
export const selectIsAdmin = (state: any) => state.auth.role === 'admin';
export const selectIsUser = (state: any) => state.auth.role === 'user';

export default authSlice.reducer; 