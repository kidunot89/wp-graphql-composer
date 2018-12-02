import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { MemoryRouter } from 'react-router-dom';

import introspectionQueryResultData from '../fragmentTypes.json';
import { CUSTOM_LOGO_QUERY, HEADER_QUERY, Header, header } from '../../dist';

afterEach(cleanup);

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const mocks = [
  {
    request: { query: HEADER_QUERY, },
    result: {
      data: {
        allSettings: {
          generalSettingsTitle: 'ChumBucket',
          generalSettingsDescription: 'Eat here, dammit!!',
          homeUrl: 'https://buccogrease.net',
          __typename: 'Settings'
        },
        themeMods: {
          customLogo: 1,
          __typename: 'ThemeMods',
        }
      }
    }
  }, {
    request: {
      query: CUSTOM_LOGO_QUERY,
    },
    result: {
      data: {
        themeMods: {
          customLogo: {
            id: "YXR0YWNobWVudDoxNTk=",
            altText: 'dummy-image',
            mediaType: "image",
            sourceUrl: "https://source.unsplash.com/1250x833",
            mediaDetails: {
              sizes: [{
                width: "150",
                height: "150",
                sourceUrl: "https://source.unsplash.com/150x150",
                __typename: 'MediaSizes',
              }, {
                width: "300",
                height: "200",
                sourceUrl: "https://source.unsplash.com/300x200",
                __typename: 'MediaSizes',
              }, {
                width: "768",
                height: "512",
                sourceUrl: "https://source.unsplash.com/768x512",
                __typename: 'MediaSizes',
              }, {
                width: "1024",
                height: "682",
                sourceUrl: "https://source.unsplash.com/1024x682",
                __typename: 'MediaSizes',
              }],
              __typename: 'MediaDetails'
            },
            __typename: 'MediaItem',
          },
          __typename: 'ThemeMods',
        }
      }
    },
  }
];

const cache = new InMemoryCache({ fragmentMatcher });

it(`renders a header component with a logo, title, and description loaded with mock data`, async () => {
  

  const { getByText, getByTestId, getByAltText } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </MockedProvider>,
  );

  const title = await waitForElement(() => getByText('ChumBucket'));
  expect(title).toBeTruthy();
  expect(getByText('Eat here, dammit!!')).toBeTruthy();
  expect(getByTestId('home-link')).toBeTruthy();

  const image = await waitForElement(() => getByAltText(/ChumBucket/));
  expect(image).toBeTruthy();
  expect(image.getAttribute('class')).toEqual('custom-logo');
  expect(image.getAttribute('srcSet'))
    .toEqual('https://source.unsplash.com/150x150 150w, https://source.unsplash.com/300x200 300w, https://source.unsplash.com/768x512 768w, https://source.unsplash.com/1024x682 1024w');

  expect(image.getAttribute('sizes'))
    .toEqual('(max-width: 768px) 768px, (max-width: 1200px) 1024px');
});

it(`render a header component with a custom view layer`, async () => {
  const view = ({title, description, url}) => (
    <div>
      <h1 data-testid="header-title">{title}</h1>
      <h1><small data-testid="header-description">{description}</small></h1>
    </div>
  )

  const CustomHeader = header.compose({ view });
  
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} cache={cache} addTypename>
      <MemoryRouter>
        <CustomHeader />
      </MemoryRouter>
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
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </MockedProvider>,
  );

  const icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});

it(`renders error state`, async () => {
  const errorMocks = [{
    request: {
      query: HEADER_QUERY,
    },
    error: new Error('its broke'),
  }];

  const { getByTestId } = render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </MockedProvider>,
  );

  const icon = await waitForElement(() => getByTestId(/error-icon/));
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  const message = getByTestId(/error-message/);
  expect(message).toBeTruthy()
  expect(message.innerHTML === '').toBeFalsy();
})
