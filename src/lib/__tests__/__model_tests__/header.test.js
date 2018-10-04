import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';

import { HEADER_QUERY, Header, header, ATTACHMENT_QUERY } from 'lib';

afterEach(cleanup);

it(`renders a header component with a logo, title, and description loaded with mock data`, async () => {
  const mocks = [{
    request: { query: HEADER_QUERY, },
    result: {
      data: {
        allSettings: {
          generalSettingsTitle: 'ChumBucket',
          generalSettingsDescription: 'Eat here, dammit!!',
          homeUrl: 'https://buccogrease.net'
        },
        themeMods: {
          customLogo: 1,
        }
      }
    }
  }, {
    request: {
      query: ATTACHMENT_QUERY,
      variables: { mediaItemId: 1 },
    },
    result: {
      data: {
        mediaItemBy: {
          id: "YXR0YWNobWVudDoxNTk=",
          altText: 'dummy-image',
          mediaType: "image",
          sourceUrl: "https://source.unsplash.com/1250x833",
          mediaDetails: {
            sizes: [{
              width: "150",
              height: "150",
              sourceUrl: "https://source.unsplash.com/150x150"
            }, {
              width: "300",
              height: "200",
              sourceUrl: "https://source.unsplash.com/300x200"
            }, {
              width: "768",
              height: "512",
              sourceUrl: "https://source.unsplash.com/768x512"
            }, {
              width: "1024",
              height: "682",
              sourceUrl: "https://source.unsplash.com/1024x682"
            }]
          }
        }
      }
    },
  }];

  const { getByText, getByTestId, getByAltText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Header />
    </MockedProvider>,
  );

  const title = await waitForElement(() => getByText('ChumBucket'));
  expect(title).toBeTruthy();
  expect(getByText('Eat here, dammit!!')).toBeTruthy();
  expect(getByTestId('home-link')).toBeTruthy();

  const image = await waitForElement(() => getByAltText(/site logo/));
  expect(image).toBeTruthy();
  expect(image.getAttribute('class')).toEqual('site-logo');
  expect(image.getAttribute('srcSet'))
    .toEqual('https://source.unsplash.com/150x150 150w, https://source.unsplash.com/300x200 300w, https://source.unsplash.com/768x512 768w, https://source.unsplash.com/1024x682 1024w');

  expect(image.getAttribute('sizes'))
    .toEqual('(max-width: 768px) 768px, (max-width: 1200px) 1024px');
});

it(`render a header component with a custom template`, async () => {
  const mocks = [{
    request: { query: HEADER_QUERY, },
    result: {
      data: {
        allSettings: {
          generalSettingsTitle: 'ChumBucket',
          generalSettingsDescription: 'Eat here, dammit!!',
          homeUrl: 'https://buccogrease.net'
        },
        themeMods: {
          customLogo: 1,
        }
      }
    }
  }];

  const view = ({title, description, url}) => (
    <div>
      <h1 data-testid="header-title">{title}</h1>
      <h1><small data-testid="header-description">{description}</small></h1>
    </div>
  )

  const NewHeader = header.compose({ view });
  
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NewHeader />
    </MockedProvider>,
  );

  const title = await waitForElement(() => getByTestId(/header-title/));
  expect(title).toBeTruthy();
  expect(title.innerHTML).toMatch(/ChumBucket/);
  
  const description = getByTestId(/header-description/);
  expect(description).toBeTruthy();
  expect(description.innerHTML).toMatch(/Eat here, dammit!!/);
});

it(`renders loading state initially`, () => {
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Header />
    </MockedProvider>,
  );

  const icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});

it(`renders error state`, async () => {
  const mocks = [{
    request: {
      query: HEADER_QUERY,
    },
    error: new Error('its broke'),
  }];

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Header />
    </MockedProvider>,
  );

  const icon = await waitForElement(() => getByTestId(/error-icon/));
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  const message = getByTestId(/error-message/);
  expect(message).toBeTruthy()
  expect(message.innerHTML === '').toBeFalsy();
})
