import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import React, { useState, useEffect, useCallback, useMemo } from 'react';

const calculateMaxPages = (total: number, size: number) => {
  return Math.ceil(total / size);
};

export const isValidNotEmptyArray = (array: any[]): boolean => {
  return !!(array?.length && array?.length > 0);
};

const useInfiniteScroll = (
  useGetDataListQuery: UseQuery<any>,
  queryParameters = {}
) => {
  const [localPage, setLocalPage] = useState(1);
  const [combinedData, setCombinedData] = useState<any[]>([]);
  const queryResponse = useGetDataListQuery({
    page: localPage,
    ...queryParameters,
  });

  // @ts-expect-error
  const { articles: fetchData = [], totalResults = 0 } =
    queryResponse?.data || {};

  useEffect(() => {
    if (isValidNotEmptyArray(fetchData)) {
      if (localPage === 1) setCombinedData(fetchData);
      else {
        setCombinedData((previousData) => [...previousData, ...fetchData]);
      }
    }
  }, [fetchData]);

  // const maxPages = useMemo<number>(() => {
  //   return calculateMaxPages(remoteTotal, remoteSize);
  // }, [remoteTotal, remoteSize]);

  const refresh = useCallback(() => {
    setLocalPage(1);
  }, []);

  const loadMore = () => {
    // if (localPage < maxPages && localPage === remotePage) {
    setLocalPage((page) => page + 1);
    // }
  };

  return {
    combinedData,
    localPage,
    loadMore,
    refresh,
    isLoading: queryResponse?.isLoading,
    isFetching: queryResponse?.isFetching,
  };
};

export default useInfiniteScroll;
