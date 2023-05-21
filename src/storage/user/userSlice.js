import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLocalData } from '../../utils/localStorage';
import { isError } from '../../utils/store';


export const fetchUser = createAsyncThunk(
   'user/fetchUser',
   async function (
      _,
      { rejectWithValue, fulfillWithValue, extra: api }
   ) {
      try {
         const data = await api.getUserInfo();
         return fulfillWithValue(data);

      } catch (error) {
         return rejectWithValue(error);
      }
   }
);

export const userAuthenticate = createAsyncThunk(
   'user/userAuthenticate',
   async function (
      dataAuth,
      { rejectWithValue, fulfillWithValue, extra: api }
   ) {
      try {
         const data = await api.authorize(dataAuth);
         if (data.token) {
            setLocalData('token', data.token)
         } else {
            return rejectWithValue(data);
         }
         return fulfillWithValue(data);

      } catch (error) {
         return rejectWithValue(error);
      }
   }
);

export const userRegister = createAsyncThunk(
   'user/userRegister',
   async function (
      dataRegister,
      { rejectWithValue, fulfillWithValue, extra: api }
   ) {
      try {
         const data = await api.register(dataRegister);
         return fulfillWithValue(data);

      } catch (error) {
         return rejectWithValue(error);
      }
   }
);

export const userTokenChek = createAsyncThunk(
   'user/userTokenChek',
   async function (
      _,
      { rejectWithValue, fulfillWithValue, dispatch, extra: api }
   ) {
      try {
         const data = await api.checkToken();
         dispatch(authCheck())
         return fulfillWithValue(data);
      } catch (error) {
         localStorage.clear();
         return rejectWithValue(error);
      } finally {
         dispatch(authCheck())
      }
   }
);


const initialState = {
   isAuthChecked: false,
   loggedIn: false,
   data: null,
   userError: null,
   getUserRequest: true,
   loginUserRequest: false,
   registerUserRequest: false,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      authCheck: (state) => {
         state.isAuthChecked = true
      },
      logout: (state) => {
         state.data = null;
         localStorage.removeItem('token');
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchUser.pending, (state) => {
            state.getUserRequest = true;
            state.userError = null;
         })
         .addCase(fetchUser.fulfilled, (state, action) => {
            state.data = action.payload;
            state.getUserRequest = false;
         })
         .addCase(userAuthenticate.pending, (state) => {
            state.loginUserRequest = true;
            state.userError = null;
         })
         .addCase(userAuthenticate.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.loginUserRequest = false;
            state.loggedIn = true;
         })
         .addCase(userRegister.pending, (state) => {
            state.registerUserRequest = true;
            state.userError = null;
         })
         .addCase(userRegister.fulfilled, (state, action) => {
            state.data = action.payload;
            state.registerUserRequest = false;
         })
         .addCase(userTokenChek.pending, (state) => {
            state.getUserRequest = true;
            state.userError = null;
         })
         .addCase(userTokenChek.fulfilled, (state, action) => {
            state.data = action.payload;
            state.getUserRequest = false;
         })
         .addMatcher(isError, (state, action) => {
            state.userError = action.payload;
            state.getUserRequest = false;
            state.loginUserRequest = false;
            state.registerUserRequest = false;
         });
   },
});

export const { authCheck, logout } = userSlice.actions;

export default userSlice.reducer;
