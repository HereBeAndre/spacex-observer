import React from 'react';

interface IImageLogoProps {
  src?: string;
  alt: string;
  customStyle?: object;
}

const ImageLogo: React.FC<IImageLogoProps> = ({ src, alt, customStyle }) => (
  <img
    src={src || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'}
    alt={alt}
    style={{ maxWidth: '180px', ...customStyle }}
  />
);

export default ImageLogo;

// No_image_available.svg attribution: en:User:Cburnett, Public domain, via Wikimedia Commons
