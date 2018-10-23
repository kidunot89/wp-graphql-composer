import React from 'react'
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import classNames from 'classnames';

import './post.global.scss';
import styles from './post.module.scss';

const page = ({
  as: Container, pageId, title, content,
  date, modified, className: added, ...rest
}) => {
  const className = classNames(
    styles.page,
    added,
  );

  return (
    <Container
      id={`page-${pageId}`}
      className={className}
      {...rest}
    >
      <div className="entry-content">{ReactHtmlParser(content)}</div>
    </Container>
  );
}

page.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  className: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

page.defaultProps = {
  title: undefined,
  content: '',
  className: undefined,
  as: 'article', 
};

export default page;
