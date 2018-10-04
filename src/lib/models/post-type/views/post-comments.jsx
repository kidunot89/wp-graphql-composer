import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

const postComments = ({
  commentsData, commentView: CommentView, 
  editCommentView: EditCommentView,
  newCommentState, open, postId, ...rest
}) => (
  <div id={`post-${postId}-comments`} {...rest}>
    { console.log(commentsData) }
    {map(commentsData, ({id, ...rest}) => (<CommentView {...{...rest, EditCommentView }} className="comment" key={id} />))}
    { !!open &&
      <EditCommentView
        key="new"
        {...newCommentState}
      />
    }
  </div>
);

postComments.propTypes = {
  commentView: PropTypes.func.isRequired,
  editCommentView: PropTypes.func.isRequired,
  newCommentState: PropTypes.shape({}).isRequired,
  postId: PropTypes.number.isRequired,
  open: PropTypes.bool,
};

postComments.defaultProps = {
  open: false,
};

export default postComments;
