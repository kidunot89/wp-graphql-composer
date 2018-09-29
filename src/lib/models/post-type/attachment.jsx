import React from 'react'
import _ from 'lodash';
import { compose, mapProps } from 'recompose';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import { whileLoading, forError, Error, Loading } from 'lib';

/**
 * 
 */
export const ATTACHMENT_QUERY = gql`
  query AttachmentQuery($mediaItemId: Int) {
    mediaItemBy(mediaItemId: $mediaItemId){
      id
      altText
      mediaType
      sourceUrl
      mediaDetails{
        sizes {
          width
          height
          sourceUrl
        }
      }
    }
  }
`;

/**
 * Maps image source for srcSet attribute
 * 
 * @param {string} sourceUrl - url to image,
 * @param {string} width - string representation of image width, 
 */
const mapSources = ({ sourceUrl, width }) => (`${sourceUrl} ${width}w`);

/**
 * Maps image source for sizes attribute
 * 
 * @param {string} rawWidth - string representation of image width
 */
const mapBreakpoints = ({ width: rawWidth }) => {
  const width = parseInt(rawWidth);
  if (width > 1200) return `${width}px` 
  else if (width <= 1200 && width > 992) return `(max-width: 1200px) ${width}px`;
  else if (width <= 992 && width > 768) return `(max-width: 992px) ${width}px`;
  else if (width <= 768 && width > 576) return `(max-width: 768px) ${width}px`;
  else return `(max-width: 576px) ${width}px`;
};

/**
 * Maps alternate images to breakpoints and returns an array of media query strings
 * 
 * @param {array} sizes - data about image sources
 * @returns {array}
 */
const reduceBreakpoints = (sizes) => {
  const breakpoints = _.map(
    _.filter(sizes, ({width}) => parseInt(width) >= 576),
    mapBreakpoints
  );

  const reduced = [];
  const sort = /^(?:\(max-width: \d+px\) )?(\d+)px$/;
  const sm = _.sortBy(
    _.filter(breakpoints, mediaQuery => /^\(max-width: 576px\)/.test(mediaQuery)),
    mediaQuery => parseInt(mediaQuery.match(sort)),
  );
  const md = _.sortBy(
    _.filter(breakpoints, mediaQuery => /^\(max-width: 768px\)/.test(mediaQuery)),
    mediaQuery => parseInt(mediaQuery.match(sort)),
  );
  const lg = _.sortBy(
    _.filter(breakpoints, mediaQuery => /^\(max-width: 992px\)/.test(mediaQuery)),
    mediaQuery => parseInt(mediaQuery.match(sort)),
  );
  const xl = _.sortBy(
    _.filter(breakpoints, mediaQuery => /^\(max-width: 1200px\)/.test(mediaQuery)),
    mediaQuery => parseInt(mediaQuery.match(sort)),
  );
  const max = _.sortBy(
    _.filter(breakpoints, mediaQuery => !/^\(max-width:/.test(mediaQuery)),
    mediaQuery => parseInt(mediaQuery.match(sort)),
  );

  if (!_.isEmpty(sm)) reduced.push(sm[0]);
  if (!_.isEmpty(md)) reduced.push(md[0]);
  if (!_.isEmpty(lg)) reduced.push(lg[0]);
  if (!_.isEmpty(xl)) reduced.push(xl[0]);
  if (!_.isEmpty(max)) reduced.push(max[0]);

  return reduced;
};

/**
 * Attachment base stateless component
 * 
 * @param {object} props 
 */
const attachment = (props) => (props.src) ? (<img {...props} />) : null;

attachment.compose = (template = attachment, loading = Loading, error = Error) => compose(
  graphql(
    ATTACHMENT_QUERY,
    {
      options: ({ mediaItemId }) => ({ mediaItemId }),
      skip: ({ mediaItemId }) => !mediaItemId
    }
  ),
  whileLoading(loading),
  forError(error, '404-image'),
  mapProps(({ data, src, alt, ...rest }) => {
    const imgSrc = _.get(data, 'mediaItemBy.sourceUrl') || src;
    const altText = alt || _.get(data, 'mediaItemBy.altText');

    const sizes = _.get(data, 'mediaItemBy.mediaDetails.sizes');
    if (sizes && sizes.length > 0) {
      const sources = _.map(sizes, mapSources);
      const srcSizes = reduceBreakpoints(sizes);

      return {
        src: imgSrc,  alt: altText, srcSet: sources.join(', '), sizes: srcSizes.join(', '),
        ..._.omit(rest, ['fallback', 'mediaItemId']),
      };
    }

    return { src: imgSrc,  alt: altText, ..._.omit(rest, ['fallback', 'mediaItemId']) };
  }),
  )(template);

export { attachment };

export default attachment.compose();