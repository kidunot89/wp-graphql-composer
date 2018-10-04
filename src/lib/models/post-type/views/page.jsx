import React from 'react'
import PropTypes from 'prop-types';
import { Parser as ReactParser } from 'html-to-react';

const parser = new ReactParser();

const page = ({ pageId, title, content, date, modified, ...rest }) => (
  <div id={`page-${title}`} {...rest}>
    <div>{parser.parse(content)}</div>
  </div>
);

page.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

page.defaultProps = {
  title: undefined,
  content: '',
};

export default page
