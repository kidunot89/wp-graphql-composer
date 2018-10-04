import React from 'react';
import PropTypes from 'prop-types';
import { isNull } from 'lodash';

const editComment = ({
  message, onChange, onSubmit,
  author, email, error, submitButtonText,
  ...rest
}) => (
  <form {...rest}>
    { !isNull(author) &&
      <input
        type="text"
        name="author"
        value={author}
        onChange={onChange}
        placeholder="Enter Name"
      />
    }
    { !isNull(email) &&
      (<input
        type="text"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Enter Email"
      />)
    }
    <textarea
      name="message"
      value={message}
      onChange={onChange}
      placeholder="Enter Message"
    />
    {error && <p>{error}</p>}
    <button onClick={onSubmit}>{submitButtonText}</button>      
  </form>
);

editComment.propTypes = {
  message: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  author: PropTypes.string,
  email: PropTypes.string,
  error: PropTypes.string,
  submitButtonText: PropTypes.string,
};

editComment.defaultProps = {
  author: undefined,
  email: undefined,
  error: undefined,
  submitButtonText: 'Leave Comment',
};

export default editComment;
