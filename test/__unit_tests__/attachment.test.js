import React from 'react';
import { render, cleanup, waitForElement, wait } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';

import { CUSTOM_LOGO_QUERY, ATTACHMENT_QUERY, Attachment, attachment } from '../../dist';

afterEach(cleanup);

it(`renders mock image at different sizes while maintaining the image's aspect ratio`, async () => {
  const mocks = [{
    request: {
      query: ATTACHMENT_QUERY,
      variables: { 
        mediaItemId: 1,
        id: null,
        slug: null,
        uri: null,
      },
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
  }]

  /**
   * Original Size and className
   */
  const { getByAltText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Attachment mediaItemId={1} className="dummy-image" alt="dummy-image" />
    </MockedProvider>
  );

  let image = await waitForElement(() => getByAltText(/dummy-image/));
  expect(image).toBeTruthy();
  expect(image.getAttribute('class')).toEqual('dummy-image');
  expect(image.getAttribute('srcSet'))
    .toEqual('https://source.unsplash.com/150x150 150w, https://source.unsplash.com/300x200 300w, https://source.unsplash.com/768x512 768w, https://source.unsplash.com/1024x682 1024w');

  expect(image.getAttribute('sizes'))
    .toEqual('(max-width: 768px) 768px, (max-width: 1200px) 1024px');

  /**
   * custom alt attribute
   */
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Attachment mediaItemId={1} alt="test image" />
    </MockedProvider>
  );

  image = await waitForElement(() => getByAltText(/test image/));
  expect(image).toBeTruthy();
});

it(`render theme custom logo`, async() => {
  const mocks = [{
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
      }
    },
  }];

  /**
   * Original Size and className
   */
  const { getByAltText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Attachment customLogo className="dummy-image" alt="dummy-image" />
    </MockedProvider>
  );

  let image = await waitForElement(() => getByAltText(/dummy-image/));
  expect(image).toBeTruthy();
  expect(image.getAttribute('class')).toEqual('dummy-image');
  expect(image.getAttribute('srcSet'))
    .toEqual('https://source.unsplash.com/150x150 150w, https://source.unsplash.com/300x200 300w, https://source.unsplash.com/768x512 768w, https://source.unsplash.com/1024x682 1024w');

  expect(image.getAttribute('sizes'))
    .toEqual('(max-width: 768px) 768px, (max-width: 1200px) 1024px');
});

it(`renders fallback image`, async () => {
  const mocks = [{
    request: {
      query: ATTACHMENT_QUERY,
      variables: { mediaItemId: 1 },
    },
    result: { data: { mediaItemBy: null } },
    error: new Error('not found'),
  }];

  const { getByAltText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Attachment src="https://source.unsplash.com/768x512" alt="dummy-image" fallback />
    </MockedProvider>
  );

  const image = await waitForElement(() => getByAltText(/dummy-image/));
  expect(image).toBeTruthy();
  expect(image.getAttribute('src') === 'https://source.unsplash.com/768x512').toBeTruthy();
})

it(`renders nothing if fallback flag set and no src attribute is provided`, async () => {
  const mocks = [{
    request: {
      query: ATTACHMENT_QUERY,
      variables: { mediaItemId: 1 },
    },
    data: { mediaItemBy: null },
    error: new Error('not found'),
  }];

  const { container, getByAltText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Attachment alt="dummy-image" fallback />
    </MockedProvider>
  );

  await wait(() => expect(container.querySelector('img')).toBeFalsy());
});

it(`renders fallback image with a custom attachment template component`, async () => {
  const NewAttachment = attachment.compose({
    view: props => <div data-testid="container"><img {...props} /></div>
  });
  const mocks = [{
    request: {
      query: ATTACHMENT_QUERY,
      variables: { mediaItemId: 1 },
    },
    result: { data: { mediaItemBy: null } },
    error: new Error('not found'),
  }];

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NewAttachment src="https://source.unsplash.com/768x512" alt="dummy-image" fallback />
    </MockedProvider>
  );

  const container = await waitForElement(() => getByTestId(/container/));
  expect(container).toBeTruthy();
  
  const image = container.querySelector('img[alt="dummy-image"]');
  expect(image).toBeTruthy();
  expect(image.getAttribute('src') === 'https://source.unsplash.com/768x512').toBeTruthy();
});

it(`renders loading state initially`, () => {
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Attachment mediaItemId={1} />
    </MockedProvider>,
  );

  const icon = getByTestId(/loading-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Loading\.\.\./)).toBeTruthy();
});

it(`render error state`, async () => {
  const mocks = [{
    request: {
      query: ATTACHMENT_QUERY,
      variables: { mediaItemId: 1 },
    },
    error: new Error('its broke'),
  }];

  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Attachment mediaItemId={1} />
    </MockedProvider>,
  );

  const icon = await waitForElement(() => getByTestId(/error-icon/));
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  const message = getByTestId(/error-message/);
  expect(message).toBeTruthy()
  expect(message.innerHTML === '').toBeFalsy();
})