import React, { CSSProperties } from 'react';

interface IImageLogoProps {
  src?: string;
  alt: string;
  customStyle?: CSSProperties;
}

const ImageLogo: React.FC<IImageLogoProps> = ({ src, alt, customStyle }) => (
  <img
    data-testid="image-logo"
    src={src || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'}
    alt={alt}
    style={{ maxWidth: '180px', ...customStyle }}
  />
);

export default ImageLogo;

// No_image_available.svg attribution: en:User:Cburnett, Public domain, via Wikimedia Commons
