import React from 'react';
import { createHistory, createMemorySource, LocationProvider } from '@reach/router';
import { fireEvent, render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import App from '../App';
import Button from '../components/shared/buttons/Button';
import { APP_ROUTES } from '../components/routes/routes';

// TODO: Move to dedicated file / folder
// USAGE ~ Provide to any test file for components which relies on router being in context
function renderWithRouter(
  ui,
  { route = '/', history = createHistory(createMemorySource(route)) } = {},
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

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

describe('<Button />', () => {
  it('Should render button element', () => {
    act(() => {
      render(<Button />, container);
    });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Should display text passed in via props', () => {
    act(() => {
      render(<Button text="Submit" />);
    });
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  it('Should apply correct variant passed in via props', () => {
    act(() => {
      render(<Button variant="primary" />);
    });
    expect(screen.getByTestId('primaryBtn')).toHaveStyle('background-color: red');
  });

  it('Expects onClick callback function to be invoked once', () => {
    const mockedFn = jest.fn();
    act(() => {
      render(<Button onClick={mockedFn} />);
    });
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockedFn).toHaveBeenCalledTimes(1);
  });

  // TODO Should probably be moved in test suite of <Dashboard /> component?
  it('Should navigate to <Launches /> page when button is displayed in <Dashboard /> page', async () => {
    const {
      history: { navigate: reachRouterNavigate },
    } = renderWithRouter(<App />);

    expect(screen.getByText(/upcoming launches/i)).toBeInTheDocument();
    // with reach-router we don't need to simulate a click event, we can just transition
    // to the page using the navigate function returned from the history object.
    await reachRouterNavigate(APP_ROUTES.launches);
    expect(screen.getByText(/Launches/)).toBeInTheDocument();
  });
});
