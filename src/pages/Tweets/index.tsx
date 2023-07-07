import React, { FC } from 'react';

import Container from '@components/Container';
import TweetsList from '@components/TweetsList';

import './Tweets.scss';

const Tweets: FC = () => {
  return (
    <section className="tweets">
      <Container>
        <TweetsList />
      </Container>
    </section>
  );
};

export default Tweets;
