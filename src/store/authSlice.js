// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  menu:"",
  dashboardlst:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.menu=""
    },
    loginStartCorporate: (state) => {
      state.loading = true;
      state.error = null;
      state.menu=""
    },
    otpSuccess : (state,action)=>{
      console.log("action",action)
      state.user = action.payload;
      state.otpdata = action.payload;
    },
    loginSuccess: (state, action) => {
      console.log("action",action)
      state.isAuthenticated = true;
      state.menu="111111111111111111111111111111111";
      state.dashboardlst=action.payload;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      sessionStorage.setItem("TOKEN", JSON.stringify(action.payload.sessionId));
      sessionStorage.setItem("jwtToken", JSON.stringify(action.payload.sessionId));
      // sessionStorage.setItem("menu", action.payload.menu);
      // sessionStorage.setItem("menu", "11111111111111111111111111111111111111111111111111111111111111111111");
      // sessionStorage.setItem("lastLogin", action.payload.lastLoginDate);
      // sessionStorage.setItem("customerName", JSON.stringify(action.payload.customerName));
      // sessionStorage.setItem("userId", JSON.stringify(action.payload.userId));

    },
    loginSuccessCorporate: (state, action) => {
      console.log("actioncorporate",action)
      state.isAuthenticated = true;
      // state.menu= action.payload.menu;
      state.menu= "1111111111111111111111111111111111111111111111111111111111111111111111111";
      state.userType="corporate";
      state.user = action.payload;
      state.userRole = "checker";
      state.loading = false;
      state.error = null;
      sessionStorage.setItem("TOKEN", JSON.stringify(action.payload.sessionId));
      sessionStorage.setItem("jwtToken", JSON.stringify(action.payload.sessionId));
      // sessionStorage.setItem("menu", action.payload.menu);
      sessionStorage.setItem("menu", "11111111111111111111111111111111111111111111111111111111111111111111");
      sessionStorage.setItem("lastLogin", action.payload.lastLoginDate);
      sessionStorage.setItem("customerName", JSON.stringify(action.payload.customerName));
      sessionStorage.setItem("userId", JSON.stringify(action.payload.userId));

    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.menu=""
      state.userType=""
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      sessionStorage.clear();
      state.menu=""
      state.userType=""
    },
    clearError:(state)=>{
      state.error = null;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout,clearError, otpSuccess,loginStartCorporate,loginSuccessCorporate } = authSlice.actions;
export default authSlice.reducer;
