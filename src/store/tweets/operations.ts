import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Tweet } from '@types';

axios.defaults.baseURL = 'https://64a82950dca581464b856af5.mockapi.io/';

export const getTweets = createAsyncThunk<Tweet[], undefined, { rejectValue: string }>(
  'tweets/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('tweets');
      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data?.message) {
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred.');
    }
  }
);
