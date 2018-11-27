/**
 * Attachment Props Mapper
 */
import {
  filter, get, isEmpty, map,
  omit, sortBy
} from 'lodash';

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
  const width = parseInt(rawWidth, 10);
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
  const breakpoints = map(
    filter(sizes, ({width}) => parseInt(width, 10) >= 576),
    mapBreakpoints
  );

  const reduced = [];
  const sort = /^(?:\(max-width: \d+px\) )?(\d+)px$/;
  const sm = sortBy(
    filter(breakpoints, mediaQuery => /^\(max-width: 576px\)/.test(mediaQuery)),
    mediaQuery => parseInt(mediaQuery.match(sort), 10),
  );
  const md = sortBy(
    filter(breakpoints, mediaQuery => /^\(max-width: 768px\)/.test(mediaQuery)),
    mediaQuery => parseInt(mediaQuery.match(sort), 10),
  );
  const lg = sortBy(
    filter(breakpoints, mediaQuery => /^\(max-width: 992px\)/.test(mediaQuery)),
    mediaQuery => parseInt(mediaQuery.match(sort), 10),
  );
  const xl = sortBy(
    filter(breakpoints, mediaQuery => /^\(max-width: 1200px\)/.test(mediaQuery)),
    mediaQuery => parseInt(mediaQuery.match(sort), 10),
  );
  const max = sortBy(
    filter(breakpoints, mediaQuery => !/^\(max-width:/.test(mediaQuery)),
    mediaQuery => parseInt(mediaQuery.match(sort), 10),
  );

  if (!isEmpty(sm)) reduced.push(sm[0]);
  if (!isEmpty(md)) reduced.push(md[0]);
  if (!isEmpty(lg)) reduced.push(lg[0]);
  if (!isEmpty(xl)) reduced.push(xl[0]);
  if (!isEmpty(max)) reduced.push(max[0]);

  return reduced;
};

export default ({ data, src, alt, ...rest }) => {
  const variables = [
    'id', 'mediaItemId', 'slug', 'uri'
  ];
  const imgSrc = get(data, 'mediaItemBy.sourceUrl') || src;
  const altText = alt || get(data, 'mediaItemBy.altText');

  const sizes = get(data, 'mediaItemBy.mediaDetails.sizes');
  if (sizes && sizes.length > 0) {
    const sources = map(sizes, mapSources);
    const srcSizes = reduceBreakpoints(sizes);

    return {
      src: imgSrc,  alt: altText, srcSet: sources.join(', '), sizes: srcSizes.join(', '),
      ...omit(rest, ['fallback', ...variables]),
    };
  }

  return { src: imgSrc,  alt: altText, ...omit(rest, ['fallback', ...variables]) };
};