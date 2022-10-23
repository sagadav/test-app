import SelectUI from '@/components/ui/SelectUI';
import { useIsMobileQuery } from '@/hooks/responsive';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import useInfiniteScroll from '@/hooks/useInfinityScroll';
import { useGetTopHeadlinesNewsQuery } from '@/services/api/news.api';
import { newsUIActions } from '@/state/ui/news-ui.slice';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import styles from './news.module.scss';
import NewsLink from './NewsLink';
import NewsListFilters from './NewsListFilters';

interface Filters {
  category: string;
  country: string;
}

const initialFilters: Filters = {
  category: 'general',
  country: 'ru',
};

const NewsList = () => {
  // const displatch = useDispatch();
  // const { savedNewsListScrollY } = useAppSelector((state) => state.newsUI);
  const [filters, setFilters] = useState(initialFilters);
  const { combinedData, loadMore, isFetching, isLoading, refresh } =
    useInfiniteScroll(useGetTopHeadlinesNewsQuery, {
      ...filters,
    });
  // const onLinkClick = () => {
  //   displatch(newsUIActions.setSavedNewsListScrollY(window.scrollY));
  // };
  // useEffect(() => {
  //   if (savedNewsListScrollY) {
  //     setTimeout(() => {
  //       window.scrollTo(0, savedNewsListScrollY);
  //     }, 1);
  //   }
  // }, []);
  const filtersChangeHandler = (key: string, value: string) => {
    refresh();
    setFilters({
      ...filters,
      [key]: value,
    });
  };
  return (
    <div>
      <div className={styles.newsMainTitle}>News</div>
      <NewsListFilters onChange={filtersChangeHandler} />
      <div>
        {!isLoading && isFetching && (
          <div>
            <span>Минутку...</span>
          </div>
        )}
        {isLoading ? (
          <div>Загрузка...</div>
        ) : (
          <div>
            <InfiniteScroll
              dataLength={combinedData.length}
              hasMore={true}
              next={() => loadMore()}
              loader={'...'}
            >
              {combinedData.map((item, index) => (
                <NewsLink article={item} key={index} />
              ))}
            </InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;
