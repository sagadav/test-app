import { useEffect, useState } from 'react';

interface ImageUIProps {
  src?: string;
  alt?: string;
  dontShowIfError?: boolean;
}

const ImageUI = ({ src, alt = '', dontShowIfError = false }: ImageUIProps) => {
  const [isImageError, setIsImageError] = useState(false);
  if ((dontShowIfError && isImageError) || src === null) {
    return <></>;
  }
  return <img src={src} alt={alt} onError={() => setIsImageError(true)} />;
};

export default ImageUI;
