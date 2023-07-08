import React, { FC, useState, useEffect, useRef } from 'react';

import Container from '@components/Container';
import TweetsList from '@components/TweetsList';
import Pagination from '@components/Pagination';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getTweets } from '@store/tweets/operations';
import { selectVisibleTweets } from '@store/tweets/selectors';
import { selectPage, selectLimit } from '@store/filters/selectors';
import { Tweet } from '@types';
import { getTweetsPerPage } from '@utils';

import './Tweets.scss';

const Tweets: FC = () => {
  const dispatch = useAppDispatch();
  const visibleTweets = useAppSelector(selectVisibleTweets);
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);

  const tweetsRef = useRef<HTMLUListElement | null>(null);

  const isVisibleButton = page * limit < visibleTweets.length;

  const [tweetsPerPage, setTweetsPerPage] = useState<Tweet[]>([]);

  useEffect(() => {
    const tweets = getTweetsPerPage({
      page,
      limit,
      tweets: visibleTweets,
    });
    setTweetsPerPage(tweets);
  }, [visibleTweets]);

  const showNextHandler = (page: number) => {
    const tweets = getTweetsPerPage({
      page,
      limit,
      tweets: visibleTweets,
    });
    setTweetsPerPage(tweets);
    if (tweetsRef.current) {
      tweetsRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const showMoreHandler = (page: number) => {
    const tweets = getTweetsPerPage({
      page,
      limit,
      tweets: visibleTweets,
    });
    setTweetsPerPage(prevState => [...prevState, ...tweets]);
  };

  useEffect(() => {
    dispatch(getTweets());
  }, []);

  return (
    <section className="tweets">
      <Container>
        <TweetsList items={tweetsPerPage} ref={tweetsRef} />
        <Pagination
          showMore={showMoreHandler}
          showNext={showNextHandler}
          isVisibleButton={isVisibleButton}
        />
      </Container>
    </section>
  );
};

export default Tweets;
