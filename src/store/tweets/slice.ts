import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  reducers: {
    toggleFollowing(state, { payload }: PayloadAction<string>) {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === payload ? { ...item, following: !item.following } : item
        ),
      };
    },
  },
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

export const { toggleFollowing } = tweetsSlice.actions;
export const tweetsReducer = tweetsSlice.reducer;
