import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Countdown from '../components/shared/Countdown/Countdown';

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

describe('<Countdown />', () => {
  it('Should render', () => {
    act(() => {
      render(<Countdown unixTime={123} />);
    });
  });

  expect(screen.getByRole('article')).toBeInTheDocument();
});
