import { NewsArticle } from '@/types/news.types';
import Link from 'next/link';
import styles from './news.module.scss';
import Image from 'next/image';
import ImageUI from '@/components/ui/ImageUI';
import { useIsMobileQuery } from '@/hooks/responsive';

interface NewsLinkProps {
  article: NewsArticle;
  style?: object;
  onLinkClick?: () => void;
}

const NewsLink = ({ article, onLinkClick, style = {} }: NewsLinkProps) => {
  const isMobile = useIsMobileQuery();
  if (!article) {
    return (
      <div className={styles.newsLinkContainer} style={style}>
        Loading...
      </div>
    );
  }
  return (
    <div className={styles.newsLinkContainer} style={style}>
      <Link href={`/news/a/${article.page}/${article.translitedTitle}`}>
        <a className={styles.newsLink} onClick={onLinkClick}>
          <p className={styles.newsLinkTitle}>{article.title}</p>
          {!isMobile && article.urlToImage !== null && (
            <div className={styles.newsLinkImage}>
              <ImageUI dontShowIfError src={article.urlToImage} />
            </div>
          )}
        </a>
      </Link>
    </div>
  );
};

export default NewsLink;
