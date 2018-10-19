import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import { Attachment } from './';
import { PostCommentsContext } from './context';

// Comment Author V Card
const AuthorVCard = ({ userId, nicename, name, avatar }) => (
  <div className="comment-author vcard">
    { avatar ? 
      <Attachment
        className={`avatar avatar-${userId} photo`}
        src={avatar.url}
        fallback
      /> :
      <Attachment
        className={`avatar photo`}
        src="https://secure.gravatar.com/avatar/"
        fallback
      />
    }
    <strong className="fn">
      { nicename ? 
        (<Link to={`/author/${nicename}`}>{nicename}</Link>) :
        name
      }
    </strong>
    <span className="says"> says:</span>
  </div>
);

// Comment Metadata
const Metadata = ({ date, editable, onEdit, onDelete }) => {
  return (
    <div className="comment-metadata">
      <time dateTime={date}>
        {moment(date).format('LLL')}
      </time>
      {/* if logged in user is the comment author add update and delete buttons */}
      {editable && (
        <React.Fragment>
          <span className="edit-link">
            <button onClick={onEdit}>Edit</button>
          </span>
          <span className="delete-link">
            <button onClick={onDelete}>Delete</button>
          </span>
        </React.Fragment>
      )}
    </div>
  );
};

// Comment Content
const Content = ({ content }) => (
  <div className="comment-content">{ReactHtmlParser(content)}</div>
);

/**
 * Comment View Layer Component
 * @param {*} param0 
 */
const comment = ({
  id, commentId, type, content,
  date, modified, author, EditCommentView,
  ...rest
}) => {
  // const newCommentKey = `comment-${commentId}-reply`; - TODO...
  const updateCommentKey = `comment-${commentId}-edit`;
  return (
    <PostCommentsContext.Consumer>
      {({ editing, onEdit: edit, onDelete: deleted, userId }) => {
        const onEdit = edit(updateCommentKey, content);
        const isEditing = editing[updateCommentKey];
        const onDelete = deleted(id);

        // If editing render form for editing content
        if (isEditing) return (
          <div id={`comment-${commentId}`}>
            <EditCommentView
              id={id}
              commentKey={updateCommentKey} 
              submitButtonText="Save Changes"
              update
            />
          </div>
        );

        // else render comment
        return (
          <li id={`comment-${commentId}`} className="comment">
            <article id={`div-comment-${commentId}`} className="comment-body" {...rest}>
              <footer className="comment-meta">
                <AuthorVCard {...author} />
                <Metadata
                  date={date}
                  modified={modified}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  editable={author.userId === userId}
                />
              </footer>
              <Content content={content} />
            </article>
          </li>
        );

      }}
    </PostCommentsContext.Consumer>
  )
  
  
};

comment.propTypes = {
  id: PropTypes.string.isRequired,
  commentId: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  EditCommentView: PropTypes.func.isRequired,
  author: PropTypes.shape({}),
  date: PropTypes.string,
  type: PropTypes.string,
};

comment.defaultProps = {
  author: {},
  date: undefined,
  type: undefined,
};

export default comment;
