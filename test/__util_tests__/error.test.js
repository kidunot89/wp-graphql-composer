import React from 'react';
import { render, cleanup } from 'react-testing-library';

import { Error, Icon } from '../../dist';

afterEach(cleanup);
process.env.DEBUG_MODE = true;

it(`renders 404 error message and icon`, () => {
  const { getByText, getByTestId } = render(<Error type="404" />);
  const icon = getByTestId(/error-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Sorry, we can't locate the content you're looking for\. Please, try again later\./)).toBeTruthy();
});

it(`renders 403 error message and custom icon`, () => {
  const CustomIcon = () => (<Icon name="block" size="large" />);
  const { baseElement } = render(<CustomIcon />);
  const customIcon = baseElement.querySelector('div').innerHTML;

  const { getByText, getByTestId } = render(<Error type="403" />);
  const icon = getByTestId(/error-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === customIcon).toBeTruthy();
  expect(getByText(/Sorry, you aren't authorized to view this content\./)).toBeTruthy();
});

it(`renders query error message and icon`, () => {
  const CustomIcon = () => (<Icon name="error_outline" size="large" />)
  const { baseElement } = render(<CustomIcon />);
  const customIcon = baseElement.querySelector('div').innerHTML;

  const { getByText, getByTestId } = render(<Error type="query" />);
  const icon = getByTestId(/error-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === customIcon).toBeTruthy();
  expect(getByText(/Sorry, there was a problem loading the content you are trying to access\. Please, try again later\./)).toBeTruthy();
});

it(`renders unknown error message and icon`, () => {
  const CustomIcon = () => (<Icon name="sentiment_very_dissatisfied" size="large" />)
  const { baseElement } = render(<CustomIcon />);
  const customIcon = baseElement.querySelector('div').innerHTML;

  const { getByText, getByTestId } = render(<Error />);
  const icon = getByTestId(/error-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === customIcon).toBeTruthy();
  expect(getByText(/Wow, this is embarassing! We're not sure what happened\. Or\.\.\. a lazy dev just forgot to add a message here\. Sorry!/)).toBeTruthy();
});

it(`renders custom error message and icon`, () => {
  const CustomIcon = () => (<Icon name="stars" />)
  const { baseElement } = render(<CustomIcon />);
  const customIcon = baseElement.querySelector('div').innerHTML;

  const { getByText, getByTestId } = render(<Error message="BoomPow" icon={(<CustomIcon />)} />);
  const icon = getByTestId(/error-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === customIcon).toBeTruthy();
  expect(getByText(/BoomPow/)).toBeTruthy();
});