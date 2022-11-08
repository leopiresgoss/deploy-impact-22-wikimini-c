/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserService,
  getToken,
  loginUserService,
} from '../../services/user';

const initialState = {
  data: {},
  status: '',
  message: '',
};

export const fetchToken = createAsyncThunk('teacher/fetchToken', (type) => getToken(type)
  .then((response) => response)
  .catch((error) => console.log(error.message)));

export const createUser = createAsyncThunk('teacher/createUser', (params) => createUserService(params)
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => console.log(error.message)));

export const loginUser = createAsyncThunk('teacher/loginUser', (user) => loginUserService(user)
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => console.log(error.message)));

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserStatus: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
  extraReducers: {
    [fetchToken.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchToken.fulfilled]: (state, action) => {
      state.status = 'success';
      Object.keys(action.payload).forEach((key) => {
        state.data[key] = action.payload[key];
      });
    },
    [fetchToken.rejected]: (state) => {
      state.status = 'failed';
    },
    [createUser.pending]: (state) => {
      state.status = 'loading';
    },
    [createUser.fulfilled]: (state) => {
      state.status = 'success';
    },
    [createUser.rejected]: (state) => {
      state.status = 'failed';
    },
    [loginUser.pending]: (state) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state) => {
      state.status = 'success';
    },
    [loginUser.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export default userSlice.reducer;
export const { changeUserStatus } = userSlice.actions;
