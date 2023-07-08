import React, { FC, useState, useEffect, useRef } from 'react';

import { useAppSelector } from '@hooks';
import { selectLimit, selectPage } from '@store/filters/selectors';
import { selectVisibleTweets, selectIsLoading } from '@store/tweets/selectors';
import Loader from '@components/Loader';
import TweetsItem from '@components/TweetsItem';
import { getTweetsPerPage } from '@utils';
import { Tweet } from '@types';
import Pagination from '@components/Pagination';

import './TweetsList.scss';

const TweetsList: FC = () => {
  const visibleTweets = useAppSelector(selectVisibleTweets);
  const isLoading = useAppSelector(selectIsLoading);
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ul className="tweets__list" ref={tweetsRef}>
        {tweetsPerPage.map(tweet => (
          <TweetsItem key={tweet.id} tweet={tweet} />
        ))}
      </ul>
      <Pagination
        showNext={showNextHandler}
        showMore={showMoreHandler}
        isVisibleButton={isVisibleButton}
      />
    </>
  );
};

export default TweetsList;
