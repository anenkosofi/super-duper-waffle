import React, { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks';
import { getTweets } from '@store/tweets/operations';
import { selectVisibleTweets, selectIsLoading } from '@store/tweets/selectors';
import Loader from '@components/Loader';
import TweetsItem from '@components/TweetsItem';

import './TweetsList.scss';

const TweetsList: FC = () => {
  const dispatch = useAppDispatch();

  const tweets = useAppSelector(selectVisibleTweets);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getTweets());
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ul className="tweets__list">
      {tweets.map(tweet => (
        <TweetsItem key={tweet.id} tweet={tweet} />
      ))}
    </ul>
  );
};

export default TweetsList;
