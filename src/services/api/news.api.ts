import { NewsArticle } from '@/types/news.types';
import { nanoid } from '@reduxjs/toolkit';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { translitRusToEng } from '@/utils/translit';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' });

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const customParams = {
    apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
  };
  let customArgs: FetchArgs;
  if (typeof args === 'string') {
    customArgs = {
      url: args,
      params: customParams,
    };
  } else {
    customArgs = {
      ...args,
      params: {
        ...args?.params,
        ...customParams,
      },
    };
  }

  const result = await baseQuery(customArgs, api, extraOptions);
  return result;
};

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

interface NewsRequest {
  page?: number;
  pageSize?: number;
  category?: string;
  country?: string;
}

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    getAllNews: build.query<any, undefined>({
      query: () => ({
        url: '/everything',
      }),
    }),
    getTopHeadlinesNews: build.query<NewsResponse, NewsRequest>({
      query: ({ page = 1, pageSize = 10, ...args }) => ({
        url: '/top-headlines',
        params: {
          pageSize,
          page,
          ...args,
        },
      }),
      transformResponse: (response: NewsResponse, meta, arg) => {
        return {
          ...response,
          articles: response.articles.map((article) => ({
            ...article,
            page: arg.page ?? 1,
            translitedTitle: translitRusToEng(article.title)
              .toLowerCase()
              .replace(/[!?\-.,%—/]/g, '')
              .replace(/\s/g, '-'),
          })),
          id: nanoid(),
        };
      },
    }),
  }),
});

export const { useGetAllNewsQuery, useGetTopHeadlinesNewsQuery } = newsApi;
