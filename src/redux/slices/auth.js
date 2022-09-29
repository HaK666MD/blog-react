import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/register', params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/auth/login', params);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    error: null,
    status: 'loading',
  },
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = 'loaded';
    },
  },
  extraReducers: (builder) => {
    builder

      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.data = null;
          state.status = 'loading';
        },
      )

      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.data = action.payload;
          state.status = 'loaded';
        },
      )

      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.data = null;
          state.status = 'error';
          state.error = action.error.message;
        },
      );
  },
});

export const isAuth = (state) => Boolean(state.auth.data);

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
