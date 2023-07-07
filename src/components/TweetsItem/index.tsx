import React, { FC } from 'react';

import { Tweet } from '@types';

import './TweetsItem.scss';

type TweetsItemProps = {
  tweet: Tweet;
};

const TweetsItem: FC<TweetsItemProps> = ({ tweet: { user, tweets, followers, avatar } }) => {
  return (
    <li className="tweets__item">
      <div className="tweets__divider"></div>
      <div className="tweets__thumb">
        <img className="tweets__image" src={avatar} alt={user} />
      </div>
      <ul className="tweets__description">
        <li>{tweets} tweets</li>
        <li>{followers} followers</li>
      </ul>
      <button type="button" className="tweets__button">
        Follow
      </button>
    </li>
  );
};

export default TweetsItem;
