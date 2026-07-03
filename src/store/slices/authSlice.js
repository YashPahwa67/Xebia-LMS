// Auth global state (Redux Toolkit).
import { createSlice } from "@reduxjs/toolkit";

const persistedUser = (() => {
  try {
    return JSON.parse(localStorage.getItem("xebia_user")) || null;
  } catch {
    return null;
  }
})();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: persistedUser,
    isAuthenticated: Boolean(persistedUser),
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem("xebia_token", token);
      localStorage.setItem("xebia_user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("xebia_token");
      localStorage.removeItem("xebia_user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
