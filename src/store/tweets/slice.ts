import { createSlice } from '@reduxjs/toolkit';

import { getTweets } from './operations';
import { Tweet } from '@types';

export interface TweetsState {
  items: Tweet[];
  isLoading: boolean;
  error: string | null;
}

const tweetsInitialState: TweetsState = {
  items: [],
  isLoading: false,
  error: null,
};

const tweetsSlice = createSlice({
  name: 'users',
  initialState: tweetsInitialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getTweets.pending, state => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(getTweets.fulfilled, (state, { payload }) => {
        return {
          ...state,
          items: payload,
          isLoading: false,
          error: null,
        };
      })
      .addCase(getTweets.rejected, (state, { payload }) => {
        return {
          ...state,
          error: payload ? payload : 'An unknown error occured',
          isLoading: false,
        };
      }),
});

export const tweetsReducer = tweetsSlice.reducer;
