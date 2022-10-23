import { ReactNode } from 'react';
import Footer from './Footer';
import styles from './layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '100vh',
      }}
    >
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
