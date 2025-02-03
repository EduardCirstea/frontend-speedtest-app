import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Definirea tipurilor pentru starea utilizatorului și starea inițială
interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  status: string;
  token: string;
}

interface AuthState {
  status: string;
  error: string | null;
  user: User;
}

const AUTH_ENDPOINT = `http://localhost:3123`;

// Starea inițială tipizată
const initialState: AuthState = {
  status: "",
  error: null,
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};

// Definirea thunk-urilor asincrone
export const registerUser = createAsyncThunk(
  "auth/register",
  async (values: Record<string, any>, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AUTH_ENDPOINT}/api/v1/auth/register`,
        values
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Unknown error"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (values: Record<string, any>, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${AUTH_ENDPOINT}/api/v1/auth/login`,
        values
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Unknown error"
      );
    }
  }
);

// Crearea slice-ului Redux pentru autentificare
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = null;
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
    },
    changeStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, changeStatus } = userSlice.actions;
export default userSlice.reducer;
