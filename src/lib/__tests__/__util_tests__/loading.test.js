import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { render, cleanup, waitForElement } from 'react-testing-library';

import { Loading } from 'lib';

library.add(fas);

afterEach(cleanup);

it(`displays default loading icon, and default loading message`, async() => {
  const { getByText, getByTestId } = render(<Loading />);
  const icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});

it(`displays custom loading icon, and custom loading message`, async() => {
  const CustomIcon = () => (<FontAwesomeIcon size="2x" icon={['fas', 'arrow-alt-circle-right']} />);
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