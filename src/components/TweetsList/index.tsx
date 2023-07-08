import React, { FC, forwardRef, RefAttributes } from 'react';

import { useAppSelector } from '@hooks';
import { selectIsLoading } from '@store/tweets/selectors';
import Loader from '@components/Loader';
import TweetsItem from '@components/TweetsItem';
import { Tweet } from '@types';

import './TweetsList.scss';

type TweetsListProps = {
  items: Tweet[];
} & RefAttributes<HTMLUListElement>;

const TweetsList: FC<TweetsListProps> = forwardRef(function TweetsList({ items }, ref) {
  const isLoading = useAppSelector(selectIsLoading);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ul className="tweets__list" ref={ref}>
      {items.map(tweet => (
        <TweetsItem key={tweet.id} tweet={tweet} />
      ))}
    </ul>
  );
});

export default TweetsList;
