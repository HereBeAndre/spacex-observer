import React, { useState, useEffect, ComponentPropsWithoutRef } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';

import './ScrollTop.scss';

// ScrollTop component is inspired by https://github.com/HermanNygaard/react-scroll-to-top

function scrollToTop(smooth: boolean = true) {
  if (smooth) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  } else {
    document.documentElement.scrollTop = 0;
  }
}

interface IScrollTopProps extends ComponentPropsWithoutRef<'button'> {
  width?: string;
  height?: string;
  top?: number;
  smooth?: boolean;
}

const ScrollTop: React.FC<IScrollTopProps> = ({
  width = '28',
  height = '28',
  top = 360,
  smooth = true,
  color = '#202326',
  className = '',
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(document.documentElement.scrollTop >= top);
    };
    onScroll();
    document.addEventListener('scroll', onScroll);

    return () => document.removeEventListener('scroll', onScroll);
  }, [top]);

  return (
    <>
      {isVisible && (
        <button
          className={`scroll-top ${className}`}
          onClick={() => scrollToTop(smooth)}
          aria-label="Scroll top"
          data-testid="scroll-top"
          {...rest}
        >
          <ArrowUpOutlined width={width} height={height} color={color} />
        </button>
      )}
    </>
  );
};

export default ScrollTop;
