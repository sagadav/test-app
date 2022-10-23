import Layout from '@/components/layout/Layout';
import NewsList from '@/features/news/NewsList';
import type { NextPage } from 'next';
import Head from 'next/head';

const NewsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>News</title>
      </Head>
      <Layout>
        <NewsList />
      </Layout>
    </>
  );
};

export default NewsPage;
