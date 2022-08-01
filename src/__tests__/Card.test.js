import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Card from '../components/shared/Card/Card';

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

describe('<Card />', () => {
  it('Should render', () => {
    act(() => {
      render(<Card />);
    });

    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('card__style');
  });

  it('Should have clickable classname if onClick function is passed in via props', () => {
    const mockedFn = jest.fn();
    act(() => {
      render(<Card onClick={mockedFn} />);
    });

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('clickable');
  });

  it('Should display a title if one is passed in via props', () => {
    act(() => {
      render(<Card title="mock title" />);
    });

    expect(screen.getByText('mock title')).toBeInTheDocument();
  });

  it('Expects onClick callback function to be invoked once', () => {
    const mockedFn = jest.fn();
    act(() => {
      render(<Card onClick={mockedFn} />);
    });
    const card = screen.getByTestId('card');
    fireEvent.click(card);
    expect(mockedFn).toHaveBeenCalledTimes(1);
  });

  it("Expects 'Loading...' paragraph to be displayed", () => {
    act(() => {
      render(<Card isLoading />);
    });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('Expects children to be rendered', () => {
    act(() => {
      render(
        <Card>
          <h1>title</h1>
        </Card>,
      );
    });

    const card = screen.getByTestId('card');

    expect(card).toBeInTheDocument();
    expect(card).not.toBeEmptyDOMElement();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });
});
