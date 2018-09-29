import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { render, cleanup, waitForElement } from 'react-testing-library';

import { Error } from 'lib';

library.add(fas);

afterEach(cleanup);

it(`renders 404 error message and icon`, () => {
  const { getByText, getByTestId } = render(<Error type="404" />);
  const icon = getByTestId(/error-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Sorry, we can't locate the page you\'re looking for\. Please, try again later\./)).toBeTruthy();
});

it(`renders 403 error message and custom icon`, () => {
  const CustomIcon = () => (<FontAwesomeIcon color="Tomato" size="2x" icon={['fas', 'ban']}/>);
  const { baseElement } = render(<CustomIcon />);
  const customIcon = baseElement.querySelector('div').innerHTML;

  const { getByText, getByTestId } = render(<Error type="403" />);
  const icon = getByTestId(/error-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === customIcon).toBeTruthy();
  expect(getByText(/Sorry, you aren\'t authorized to view this content\./)).toBeTruthy();
});

it(`renders query error message and icon`, () => {
  const CustomIcon = () => (<FontAwesomeIcon color="Tomato" size="2x" icon={['fas', 'exclamation-circle']} />);
  const { baseElement } = render(<CustomIcon />);
  const customIcon = baseElement.querySelector('div').innerHTML;

  const { getByText, getByTestId } = render(<Error type="query" />);
  const icon = getByTestId(/error-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === customIcon).toBeTruthy();
  expect(getByText(/Sorry, there was a problem loading the content you are trying to access\. Please, try again later\./)).toBeTruthy();
});

it(`renders unknown error message and icon`, () => {
  const CustomIcon = () => (<FontAwesomeIcon size="2x" icon={['fas', 'grin-beam-sweat']} />);
  const { baseElement } = render(<CustomIcon />);
  const customIcon = baseElement.querySelector('div').innerHTML;

  const { getByText, getByTestId } = render(<Error />);
  const icon = getByTestId(/error-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === customIcon).toBeTruthy();
  expect(getByText(/Wow, this is embarassing! We\'re not sure what happened\. Or\.\.\. a lazy dev just forgot to add a message here\. Sorry!/)).toBeTruthy();
});

it(`renders custom error message and icon`, () => {
  const CustomIcon = () => (<FontAwesomeIcon size="2x" icon={['fas', 'circle']} />);
  const { baseElement } = render(<CustomIcon />);
  const customIcon = baseElement.querySelector('div').innerHTML;

  const { getByText, getByTestId } = render(<Error message="BoomPow" icon={(<CustomIcon />)} />);
  const icon = getByTestId(/error-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === customIcon).toBeTruthy();
  expect(getByText(/BoomPow/)).toBeTruthy();
});