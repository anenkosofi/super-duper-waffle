import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import { selectStatus } from '@store/filters/selectors';
import { Status, Tweet } from '@types';

export const selectTweets = (state: RootState) => state.tweets.items;

export const selectIsLoading = (state: RootState) => state.tweets.isLoading;

export const selectError = (state: RootState) => state.tweets.error;

export const selectVisibleTweets = createSelector(
  [selectTweets, selectStatus],
  (tweets, status) => {
    switch (status) {
      case Status.FOLLOW:
        return tweets.filter(({ following }) => !following);

      case Status.FOLLOWINGS:
        return tweets.filter(({ following }) => following);

      default:
        return tweets;
    }
  }
);
