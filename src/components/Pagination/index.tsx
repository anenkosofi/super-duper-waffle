import React, { FC, useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import { useAppDispatch, useAppSelector } from '@hooks';
import { selectPage, selectLimit, selectStatus } from '@store/filters/selectors';
import { setPage, setNextPage } from '@store/filters/slice';
import { selectVisibleTweets } from '@store/tweets/selectors';

import './Pagination.scss';

enum PageNumber {
  'ONE' = 1,
  'THREE' = 3,
  'FOUR' = 4,
  'FIVE' = 5,
}

type PaginationProps = {
  isVisibleButton: boolean;
  showNext: (page: number) => void;
  showMore: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ isVisibleButton, showNext, showMore }) => {
  const dispatch = useAppDispatch();
  const selectedPage = useAppSelector(selectPage);
  const selectedLimit = useAppSelector(selectLimit);
  const selectedStatus = useAppSelector(selectStatus);
  const tweets = useAppSelector(selectVisibleTweets);

  const pages = Math.ceil(tweets.length / selectedLimit);
  const nextPage = selectedPage + 1;
  const prevPage = selectedPage - 1;

  const [activePages, setActivePages] = useState<number[]>([selectedPage]);

  useEffect(() => {
    setActivePages([selectedPage]);
  }, [selectedStatus]);

  const setPageHandler = (page: number) => {
    dispatch(setPage(page));
    showNext(page);
    setActivePages([page]);
  };

  const showMoreHandler = () => {
    dispatch(setNextPage());
    showMore(nextPage);
    setActivePages(prevState => [...prevState, nextPage]);
  };

  const getPageNumberMarkup = (i: number) => (
    <li
      key={i}
      onClick={() => setPageHandler(i)}
      className={
        activePages.includes(i) ? 'pagination__item pagination__item_active' : 'pagination__item'
      }
    >
      {i}
    </li>
  );

  const getEllipsisMarkup = (key: string) => (
    <li key={key} className="pagination__item pagination__item_ellipsis">
      ...
    </li>
  );

  const renderPageNumbers = () => {
    const pageNumbers: React.ReactElement[] = [];
    if (pages <= PageNumber.FIVE) {
      for (let i = PageNumber.ONE; i <= pages; i++) {
        pageNumbers.push(getPageNumberMarkup(i));
      }
    } else {
      if (selectedPage <= PageNumber.THREE) {
        for (let i = PageNumber.ONE; i <= PageNumber.FOUR; i++) {
          pageNumbers.push(getPageNumberMarkup(i));
        }
        pageNumbers.push(getEllipsisMarkup('elleipsis-left'));
        pageNumbers.push(getPageNumberMarkup(pages));
      } else if (selectedPage > pages - PageNumber.THREE) {
        pageNumbers.push(getPageNumberMarkup(PageNumber.ONE));
        pageNumbers.push(getEllipsisMarkup('ellipsis-right'));
        for (let i = pages - PageNumber.THREE; i <= pages; i++) {
          pageNumbers.push(getPageNumberMarkup(i));
        }
      } else {
        pageNumbers.push(getPageNumberMarkup(PageNumber.ONE));
        pageNumbers.push(getEllipsisMarkup('ellipsis-left'));
        for (let i = selectedPage - PageNumber.ONE; i <= selectedPage + PageNumber.ONE; i++) {
          pageNumbers.push(getPageNumberMarkup(i));
        }
        pageNumbers.push(getEllipsisMarkup('ellipsis-right'));
        pageNumbers.push(getPageNumberMarkup(pages));
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      {Boolean(tweets.length) && (
        <div className="pagination__list">
          <button
            type="button"
            disabled={selectedPage === 1}
            className="pagination__arrow-button"
            onClick={() => setPageHandler(prevPage)}
          >
            <IoIosArrowBack
              size={24}
              className="pagination__arrow-icon pagination__arrow-icon_left"
            />
          </button>
          <ul className="pagination__list">{renderPageNumbers()}</ul>
          <button
            type="button"
            disabled={selectedPage === pages}
            className="pagination__arrow-button"
            onClick={() => setPageHandler(nextPage)}
          >
            <IoIosArrowBack
              size={24}
              className="pagination__arrow-icon pagination__arrow-icon_right"
            />
          </button>
        </div>
      )}
      {selectedPage !== pages && isVisibleButton && tweets.length && (
        <button type="button" className="pagination__button" onClick={showMoreHandler}>
          <span>Show more</span>
          <IoIosArrowBack size={24} className="pagination__button-icon" />
        </button>
      )}
      <div className="pagination__quantity">{tweets.length} Tweet(s)</div>
    </div>
  );
};

export default Pagination;
