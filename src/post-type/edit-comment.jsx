// edit-commment.jsx
/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { isNull } from 'lodash';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { PostCommentsContext } from './context';

/**
 * SCSS Modules
 */
import styles from './edit-comment.module.scss';

/**
 * Comment form component
 * 
 * @param {object} props
 * 
 * @returns {React.Component}
 */
const editComment = ({
  id, commentKey, update, className: added,
  submitButtonText, ...rest
}) => (
  <PostCommentsContext.Consumer>
    {({
      workingState: { [commentKey]: { author, authorEmail, authorUrl, content, error } },
      onChange: change, onUpdate, onCreate
    }) => {
      const onChange = change(commentKey);
      const onSubmit = update ? onUpdate(commentKey, id) : onCreate(commentKey);
      const className = classNames(
        styles.form,
        added,
      )
      return (
        <form
          className={className} 
          {...rest}
          onSubmit={onSubmit}
        >
          { !isNull(author) &&
            <input
              type="text"
              name="author"
              value={author}
              onChange={onChange}
              placeholder="Enter Name"
            />
          }
          { !isNull(authorEmail) &&
            (<input
              type="text"
              name="authorEmail"
              value={authorEmail}
              onChange={onChange}
              placeholder="Enter Email"
            />)
          }
          { !isNull(authorUrl) &&
            (<input
              type="text"
              name="authorUrl"
              value={authorUrl}
              onChange={onChange}
              placeholder="Enter Website"
            />)
          }
          <textarea
            name="content"
            value={content}
            onChange={onChange}
            placeholder="Enter Message"
          />
          {error && <p>{error}</p>}
          <button type="submit">{submitButtonText}</button>      
        </form>
      )
    }}
  </PostCommentsContext.Consumer>
);

editComment.propTypes = {
  commentKey: PropTypes.string.isRequired,
  id: PropTypes.string,
  submitButtonText: PropTypes.string,
  update: PropTypes.bool,
  className: PropTypes.string,
};

editComment.defaultProps = {
  update: false,
  submitButtonText: 'Leave Comment',
  className: undefined,
};

export { editComment };
