import React from 'react';
import { render, cleanup } from 'react-testing-library';

import { Icon, Loading } from '../../dist';

afterEach(cleanup);

it(`displays default loading icon, and default loading message`, async() => {
  const { getByText, getByTestId } = render(<Loading />);
  const icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});

it(`displays custom loading icon, and custom loading message`, async() => {
  const CustomIcon = () => (<Icon name="autorenew" />);
  const { baseElement } = render(<CustomIcon />);
  const customIcon = baseElement.querySelector('div').innerHTML;

  const { getByText, getByTestId } = render(
    <Loading
      icon={(<CustomIcon />)}
      message="Coming soon...."
    />
  );

  const icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();

  expect(icon.innerHTML === customIcon).toBeTruthy();
  expect(getByText(/Coming soon\.\.\./)).toBeTruthy();
});