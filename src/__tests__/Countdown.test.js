import React from 'react';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Countdown from '../components/shared/Countdown/Countdown';

// TODO Add more tests - i.e. one on running countdown

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  jest.useFakeTimers();
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.clearAllTimers();
});

describe('<Countdown />', () => {
  it('Should render', () => {
    const { getByTestId } = render(<Countdown />);

    /* <Countdown /> component is rendered after SpaceX API is fetched.
    Because of that, setTimeout is used to mock API request */
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(getByTestId('countdown')).toBeInTheDocument();
    expect(getByTestId('countdown')).not.toBeEmptyDOMElement();
  });

  it('Should render Loading...', () => {
    const { getByText } = render(<Countdown data={{ mock_key: 'mock_value' }} isLoading />);

    expect(getByText(/loading.../i)).toBeInTheDocument();
  });

  it('Should not be empty when data has length', () => {
    const { getByTestId } = render(<Countdown data={{ mock_key: 'mock_value' }} />);

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    const countdownComponent = getByTestId('countdown');

    expect(countdownComponent).toBeInTheDocument();
    expect(countdownComponent).not.toBeEmptyDOMElement();
  });

  it('Should render a title', () => {
    const { getByTestId } = render(<Countdown data={{ mock_key: 'mock_value' }} hasTitle />);

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(getByTestId('countdown-title')).toBeInTheDocument();
  });
});
