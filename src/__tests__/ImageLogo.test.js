import React from 'react';
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ImageLogo from '../components/shared/ImageLogo/ImageLogo';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('<Image Logo />', () => {
  it('Should render', () => {
    act(() => {
      render(<ImageLogo />);
    });
    expect(screen.getByTestId('ImageLogo')).toBeInTheDocument();
  });

  it('Should use src provided via props', () => {
    act(() => {
      render(<ImageLogo src="src-mock" />);
    });
    expect(screen.getByTestId('ImageLogo')).toHaveAttribute('src', 'src-mock');
  });

  it('Should use default src when the one provided via props is null', () => {
    act(() => {
      render(<ImageLogo src={null} />);
    });
    expect(screen.getByTestId('ImageLogo')).toHaveAttribute(
      'src',
      'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
    );
  });

  it('Should use alternate text provided via props', () => {
    act(() => {
      render(<ImageLogo alt="Image description" />);
    });
    expect(screen.getByTestId('ImageLogo')).toHaveAttribute('alt', 'Image description');
  });

  it('Expects default max-width to equal 180px', () => {
    act(() => {
      render(<ImageLogo />);
    });
    expect(screen.getByTestId('ImageLogo')).toHaveStyle('max-height: 180px');
  });

  it('Expects default max-width to get overridden if one is passed in via customStyle prop', () => {
    act(() => {
      render(<ImageLogo customStyle={{ maxWidth: '200px' }} />);
    });
    expect(screen.getByTestId('ImageLogo')).toHaveStyle('max-width: 200px');
  });

  it('Expects inline style passed in via customStyle prop to be applied', () => {
    act(() => {
      render(<ImageLogo customStyle={{ borderRadius: '8px' }} />);
    });
    expect(screen.getByTestId('ImageLogo')).toHaveStyle('border-radius: 8px');
  });
});
