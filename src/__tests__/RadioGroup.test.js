import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import RadioGroup from '../components/shared/buttons/RadioGroup/RadioGroup';

const optionsMock = [
  { label: 'one', value: '1' },
  { label: 'two', value: '2' },
];

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

describe('<RadioGroup />', () => {
  it('Should render', () => {
    act(() => {
      render(<RadioGroup options={optionsMock} />);
    });

    const radioButton1 = screen.getByText('one');
    const radioButton2 = screen.getByText('two');

    expect(radioButton1).toBeInTheDocument();
    expect(radioButton2).toBeInTheDocument();

    expect(radioButton1.firstChild.textContent).toEqual('one');
    expect(radioButton2.firstChild.textContent).toEqual('two');
  });

  it('Expects onChange to be fired once', () => {
    const mockedFn = jest.fn();
    const { getByText } = render(<RadioGroup options={optionsMock} onChange={mockedFn} />);

    const radioButton2 = getByText('two');

    fireEvent.click(radioButton2);
    expect(mockedFn).toHaveBeenCalledTimes(1);
  });

  it('Expects className to be applied', () => {
    const { getByTestId } = render(<RadioGroup options={optionsMock} className="rb-mock" />);

    const radioGroup = getByTestId('RadioGroup');

    expect(radioGroup).toHaveClass('rb-mock');
  });
});
