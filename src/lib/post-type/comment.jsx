import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import classNames from 'classnames';

import { Attachment } from './';
import { PostCommentsContext } from './context';

import styles from './comment.module.scss';

// Comment Author V Card
const AuthorVCard = ({ userId, nicename, name, avatar }) => {
  const avatarClassName = classNames(
    styles.avatar,
    `avatar-${userId}`,
  );

  return (
    <div className={styles.author}>
      { avatar ? 
        <Attachment
          className={avatarClassName}
          src={avatar.url}
          fallback
        /> :
        <Attachment
          className={`avatar photo`}
          src="https://secure.gravatar.com/avatar/"
          fallback
        />
      }
      <strong className={styles.fn}>
        { nicename ? 
          (<Link to={`/author/${nicename}`}>{nicename}</Link>) :
          name
        }
      </strong>
      <span className={styles.says}> says:</span>
    </div>
  );
}

// Comment Metadata
const Metadata = ({ date, editable, onEdit, onDelete }) => {
  return (
    <div className={styles.metadata}>
      <time className={styles.datetime} dateTime={date}>
        {moment(date).format('LLL')}
      </time>
      {/* if logged in user is the comment author add update and delete buttons */}
      {editable && (
        <React.Fragment>
          <span className={`${styles.button} ${styles.edit}`}>
            <button onClick={onEdit}>Edit</button>
          </span>
          <span className={`${styles.button} ${styles.delete}`}>
            <button onClick={onDelete}>Delete</button>
          </span>
        </React.Fragment>
      )}
    </div>
  );
};

// Comment Content
const Content = ({ content }) => (
  <div className={styles.content}>{ReactHtmlParser(content)}</div>
);

/**
 * Comment View Layer Component
 * @param {*} param0 
 */
const comment = ({
  id, commentId, type, content,
  date, modified, author, EditCommentView,
  className: added, as: Container, ...rest
}) => {
  // const newCommentKey = `comment-${commentId}-reply`; - TODO...
  const updateCommentKey = `comment-${commentId}-edit`;
  return (
    <PostCommentsContext.Consumer>
      {({ editing, onEdit: edit, onDelete: deleted, userId }) => {
        const onEdit = edit(updateCommentKey, content);
        const isEditing = editing[updateCommentKey];
        const onDelete = deleted(id);

        const className = classNames(
          styles.comment,
          added,
        );

        // If editing render form for editing content
        if (isEditing) return (
          <Container id={`comment-${commentId}`} className={className}>
            <EditCommentView
              id={id}
              commentKey={updateCommentKey} 
              submitButtonText="Save Changes"
              update
            />
          </Container>
        );

        // else render comment
        return (
          <Container id={`comment-${commentId}`} className={className}>
            <article id={`div-comment-${commentId}`} className={styles.body} {...rest}>
              <footer className={styles.meta}>
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
          </Container>
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
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
};

comment.defaultProps = {
  author: {},
  date: undefined,
  type: undefined,
  as: 'div',
  className: undefined,
};

export default comment;
