import React, { FC } from 'react';

import { Tweet } from '@types';
import { useAppDispatch, useAppSelector } from '@hooks';
import { toggleFollowing } from '@store/tweets/slice';
import { selectFollowing } from '@store/tweets/selectors';
import { formatNumberWithCommas } from '@utils';

import './TweetsItem.scss';

type TweetsItemProps = {
  tweet: Tweet;
};

enum ButtonTextContent {
  'FOLLOW' = 'Follow',
  'FOLLOWING' = 'Following',
}

const TweetsItem: FC<TweetsItemProps> = ({ tweet: { id, user, tweets, avatar } }) => {
  const dispatch = useAppDispatch();

  const following = useAppSelector(selectFollowing);

  const isFollowing = following.some(item => item === id);

  const toggleFollowingHandler = (id: string) => dispatch(toggleFollowing(id));

  return (
    <li className="tweets__item">
      <div className="tweets__divider"></div>
      <div className="tweets__thumb">
        <img className="tweets__image" src={avatar} alt={user} />
      </div>
      <ul className="tweets__description">
        <li className="tweets__description-item">
          <span>{tweets} </span>tweets
        </li>
        <li className="tweets__description-item">
          <span>
            {isFollowing ? formatNumberWithCommas(100500 + 1) : formatNumberWithCommas(100500)}
          </span>
          followers
        </li>
      </ul>
      <button
        type="button"
        className={isFollowing ? 'tweets__button tweets__button_active' : 'tweets__button'}
        onClick={() => toggleFollowingHandler(id)}
      >
        {isFollowing ? ButtonTextContent.FOLLOWING : ButtonTextContent.FOLLOW}
      </button>
    </li>
  );
};

export default TweetsItem;
