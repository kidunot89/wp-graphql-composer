import React from 'react'
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

const page = ({ pageId, title, content, date, modified, ...rest }) => (
  <article id={`page-${title}`} className="page type-page" {...rest}>
    <div className="entry-content">{ReactHtmlParser(content)}</div>
  </article>
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
