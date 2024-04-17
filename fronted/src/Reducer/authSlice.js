import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const userId = JSON.parse(localStorage.getItem("userId"));


const initialState = {
  userId: userId ? userId : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: " ",
  
};

//login user

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message = error.response.data || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//logout

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userId = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userId = null;
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userId = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.message = action.payload;
        const errorMessage = action.payload;
        if (errorMessage && errorMessage.trim() !== "") {
          state.message = errorMessage;
        }
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
