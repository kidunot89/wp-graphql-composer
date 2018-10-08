import React from 'react';
import PropTypes from 'prop-types';
import { isNull } from 'lodash';

import { PostCommentsContext } from '../context';

const editComment = ({
  id, commentKey, update, submitButtonText,
  ...rest
}) => (
  <PostCommentsContext.Consumer>
    {({
      workingState: { [commentKey]: { author, authorEmail, authorUrl, content, error } },
      onChange: change, onUpdate, onCreate
    }) => {
      const onChange = change(commentKey);
      const onSubmit = update ? onUpdate(commentKey, id) : onCreate(commentKey);

      return (
        <form className="comment-form" {...rest}>
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
          <button onClick={onSubmit}>{submitButtonText}</button>      
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
};

editComment.defaultProps = {
  update: false,
  submitButtonText: 'Leave Comment',
};

export default editComment;
