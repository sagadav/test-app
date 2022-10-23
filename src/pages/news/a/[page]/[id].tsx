import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  useGetAllNewsQuery,
  useGetTopHeadlinesNewsQuery,
} from '@/services/api/news.api';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { store } from '@/state/store';
import ImageUI from '@/components/ui/ImageUI';

const ArticleContent = () => {
  const router = useRouter();
  const { id, page } = router.query;
  const { data, isLoading } = useGetTopHeadlinesNewsQuery(
    {
      page: Number(page),
    },
    {
      selectFromResult: ({ data, isLoading }) => {
        return {
          data: data?.articles.find(
            (article) => article.translitedTitle === id
          ),
          isLoading,
        };
      },
    }
  );
  if (isLoading) {
    return <div>loading</div>;
  }
  if (!data) {
    return <div>Ничего не найдено</div>;
  }
  return (
    <div>
      <div>{data.title}</div>
      <div>{data.description}</div>
      <div>{data.content}</div>
      <ImageUI src={data.urlToImage} />
    </div>
  );
};

const NewsPage: NextPage = () => {
  // console.log(newsApi.endpoints.getTopHeadlinesNews.select()(store.getState()));
  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Link href={'/news'}>На главную</Link>
      <Layout>
        <ArticleContent />
      </Layout>
    </div>
  );
};

export default NewsPage;
