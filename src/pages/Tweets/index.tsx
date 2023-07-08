import React, { FC, useEffect } from 'react';

import Container from '@components/Container';
import TweetsList from '@components/TweetsList';
import { useAppDispatch } from '@hooks';
import { getTweets } from '@store/tweets/operations';

import './Tweets.scss';

const Tweets: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTweets());
  }, []);

  return (
    <section className="tweets">
      <Container>
        <TweetsList />
      </Container>
    </section>
  );
};

export default Tweets;
