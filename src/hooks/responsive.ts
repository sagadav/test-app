import { useMediaQuery } from 'react-responsive';

export const useIsTabletQuery = () => {
  return useMediaQuery({ query: '(max-width: 768px)' });
};

export const useIsMobileQuery = () => {
  return useMediaQuery({ query: '(max-width: 425px)' });
};
