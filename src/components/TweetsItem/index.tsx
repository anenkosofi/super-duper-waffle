import React, { FC } from 'react';

import { Tweet } from '@types';
import { useAppDispatch } from '@hooks';
import { toggleFollowing } from '@store/tweets/slice';

import './TweetsItem.scss';

type TweetsItemProps = {
  tweet: Tweet;
};

enum ButtonTextContent {
  'FOLLOW' = 'Follow',
  'FOLLOWING' = 'Following',
}

const TweetsItem: FC<TweetsItemProps> = ({
  tweet: { id, user, followers, tweets, avatar, following },
}) => {
  const dispatch = useAppDispatch();

  const toggleFollowingHandler = (id: string) => dispatch(toggleFollowing(id));

  return (
    <li className="tweets__item">
      <div className="tweets__divider"></div>
      <div className="tweets__thumb">
        <img className="tweets__image" src={avatar} alt={user} />
      </div>
      <ul className="tweets__description">
        <li>{tweets} tweets</li>
        <li>{following ? followers + 1 : followers} followers</li>
      </ul>
      <button
        type="button"
        className={following ? 'tweets__button tweets__button_active' : 'tweets__button'}
        onClick={() => toggleFollowingHandler(id)}
      >
        {following ? ButtonTextContent.FOLLOWING : ButtonTextContent.FOLLOW}
      </button>
    </li>
  );
};

export default TweetsItem;
