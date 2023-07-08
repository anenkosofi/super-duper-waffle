import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import { selectStatus } from '@store/filters/selectors';
import { Status, Tweet } from '@types';

export const selectTweets = (state: RootState) => state.tweets.items;

export const selectFollowing = (state: RootState) => state.tweets.following;

export const selectIsLoading = (state: RootState) => state.tweets.isLoading;

export const selectError = (state: RootState) => state.tweets.error;

export const selectVisibleTweets = createSelector(
  [selectTweets, selectFollowing, selectStatus],
  (tweets, following, status) => {
    switch (status) {
      case Status.FOLLOW:
        return tweets.filter(({ id }) => !following.includes(id));

      case Status.FOLLOWINGS:
        return tweets.filter(({ id }) => following.includes(id));

      default:
        return tweets;
    }
  }
);
