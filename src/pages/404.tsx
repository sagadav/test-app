import Layout from '@/components/layout/Layout';
import NewsList from '@/features/news/NewsList';
import type { NextPage } from 'next';
import Head from 'next/head';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 not found</title>
      </Head>
      <Layout>404</Layout>
    </>
  );
};

export default NotFoundPage;
