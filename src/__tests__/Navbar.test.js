import React from 'react';
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Navbar from '../components/layout/Navbar/Navbar';
import { APP_ROUTES } from '../components/routes/routes';

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

describe('<Navbar />', () => {
  it('Should render', () => {
    act(() => {
      render(<Navbar routes={APP_ROUTES} />);
    });

    const navbar = screen.getByTestId('Navbar');
    expect(navbar).toBeInTheDocument();
  });

  it('Should have className passed in via props', () => {
    act(() => {
      render(<Navbar routes={APP_ROUTES} className="mock_classname" />);
    });

    const navbar = screen.getByTestId('Navbar');
    expect(navbar).toHaveClass('mock_classname');
  });

  it('Should render expected routes', () => {
    act(() => {
      render(<Navbar routes={APP_ROUTES} />);
    });

    const navbar = screen.getByTestId('Navbar');
    expect(navbar).toContainElement(screen.getByText(/dashboard/i));
    expect(navbar).toContainElement(screen.getByText(/launches/i));
  });

  it('Should render children if provided', () => {
    act(() => {
      render(
        <Navbar routes={APP_ROUTES}>
          <h1>child title</h1>
        </Navbar>,
      );
    });

    const navbar = screen.getByTestId('Navbar');
    const childTitle = screen.getByText(/child title/i);

    expect(childTitle).toBeInTheDocument();
    expect(navbar).toContainElement(childTitle);
  });
});
