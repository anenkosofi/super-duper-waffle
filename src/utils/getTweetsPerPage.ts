import { Tweet } from '@types';

type Parameters = {
  page: number;
  limit: number;
  tweets: Tweet[];
};

export const getTweetsPerPage = ({ page, limit, tweets }: Parameters) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return tweets.slice(startIndex, endIndex);
};
