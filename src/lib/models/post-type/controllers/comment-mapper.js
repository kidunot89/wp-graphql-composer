import React from 'react';
import PropTypes from 'prop-types';
import v3 from 'uuid/v3';
import { findIndex, get, omit } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import { PostCommentsContext, postCommentsInitialState } from '../context';
import {
  NEW_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
  POST_COMMENTS_QUERY,
} from '../query';



/**
 * PostCommentStateManager - manages the state for a group of comment components
 * 
 * @param {React.Component} BaseComponent 
 */
export const postCommentsStateManager = (BaseComponent) => {
  const BaseFactory = React.createFactory(BaseComponent);
  
  class PostCommentsStateManager extends React.Component {
    constructor(props) {
      super(props);
      this.onChange = this.onChange.bind(this);
      this.onCreate = this.onCreate.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.onEdit = this.onEdit.bind(this);
      this.onUpdate = this.onUpdate.bind(this);
      this.state = postCommentsInitialState;
    }

    /**
     * Returns onChange event function for comment being edited
     * 
     * @returns {func} 
     */
    onChange(key) {
      return ({ target: { name, value } }) => {
        const { workingState } = this.state;
        workingState[key][name] = value;
        this.setState({ workingState });
      }
    }

    /**
     * Returns event function for creating new post comment
     * 
     * @param {string} - workingState key
     * @returns {func} 
     */
    onCreate(key) {
      const { mutate } = this.props.client;
      return () => {
        const postId = get(this.props, 'data.post.postId');
        const { userId } = this.props;

        const { workingState: { [key]: { author, authorEmail, authorUrl, content } } } = this.state;
        const now = new Date();
        const date = `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`;
        
        if ( !userId && (!author || !authorEmail) ) {
          const { errors } = this.state;
          errors['new'] = 'Unregistered users must enter an author name and email to comment';
          this.setState({ errors });
          return;
        }

        mutate({
          mutation: NEW_COMMENT_MUTATION,
          variables: {
            author,
            authorEmail,
            authorUrl,
            type: null,
            userId,
            parent: null,
            postId,
            content,
            date,
            clientId: v3(`${author}${key}`, v3.URL),
          },
          update: ( cache, { data: { createComment: { comment } } } ) => {
            const { post } = cache.readQuery({
              query: POST_COMMENTS_QUERY,
              variables: { id: this.props.id } 
            });
            
            post.comments.nodes.push(comment);
            cache.writeQuery({
              query: POST_COMMENTS_QUERY,
              data: { post: post }
            });
          }
        })
        .then(() => {
          console.log('create mutation success');
          const { editing, workingState } = this.state;
          delete editing[key];
          delete workingState[key];
          this.setState({ editing, workingState });
        })
        .catch(error => {
          console.warn('create mutation failed');
          const { workingState } = this.state;
          workingState[key]['error'] = error.message;
          this.setState({ workingState });
        });
      };
    }

    /**
     * Returns event function for delete existing post comment
     * 
     * @param {number} id - Global ID of comment object
     * @returns {func} 
     */
    onDelete(id) {
      const { mutate } = this.props.client;
      return () => {
        mutate({
          mutation: DELETE_COMMENT_MUTATION,
          variables: {
            id,
            clientId: v3(`${id}delete`, v3.URL),
          },
          update: (cache, { data: { deleteComment: { comment } } } ) => {
            const { post } = cache.readQuery({
              query: POST_COMMENTS_QUERY,
              variables: { id: this.props.id }
            });

            const index = findIndex(post.comments.nodes, ({ id }) => id === comment.id );
            post.comments.nodes.splice(index, 1);
            cache.writeQuery({
              query: POST_COMMENTS_QUERY,
              data: { post: post }
            });
          },
        })
        .then(() => {
          console.log('delete mutation success');
        })
        .catch(error => {
          console.log('delete mutation success');
          console.warn(error);
        });
      }
    }

    /**
     * Returns event function for editing existing post comment
     * 
     * @param {number} key - workingState key
     * @returns {func} 
     */
    onEdit(key, content = '') {
      const { userId } = this.props;

      let author;
      let authorEmail;
      let authorUrl;
      if (!userId && content === '') {
        author = '';
        authorEmail = ''
        authorUrl = '';
      }

      return () => {
        const { editing, workingState } = this.state;
        editing[key] = true;
        workingState[key] = { author, authorEmail, authorUrl, content }
        this.setState({ editing, content: workingState });
      }
    }

    /**
     * Returns event function for update existing post comment
     * 
     * @param {number} key - workingState key
     * @param {number} id - Global ID of comment object
     * @returns {func} 
     */
    onUpdate(key, id) {
      const { mutate } = this.props.client;

      return () => {
        const { workingState: { [key]: { content } } } = this.state;
        const now = new Date();
        const date = `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`
        mutate({
          mutation: UPDATE_COMMENT_MUTATION,
          variables: {
            type: null,
            id,
            content,
            date,
            clientId: v3(`${id}update`, v3.URL),
          },
          update: (cache, { data: { updateComment: { comment } } } ) => {
            const { post } = cache.readQuery({
              query: POST_COMMENTS_QUERY,
              variables: { id: this.props.id }
            });

            const index = findIndex(post.comments.nodes, ({ id }) => id === comment.id )
            post.comments.nodes[index] = comment;
            cache.writeQuery({
              query: POST_COMMENTS_QUERY,
              data: { post: post }
            });
          },
        })
        .then(() => {
          console.log('update mutation success');
          const { editing, workingState } = this.state;
          delete editing[key];
          delete workingState[key];
          this.setState({ editing, workingState });
        })
        .catch(error => {
          console.warn('update mutation failed');
          const { workingState } = this.state;
          workingState[key]['error'] = error.message;
          this.setState({ workingState });
        });
      }
    }

    render() {
      const { onChange, onCreate, onDelete, onEdit, onUpdate } = this;
      const { userId } = this.props;

      const context = {
        ...this.state,
        onChange,
        onCreate,
        onDelete,
        onEdit,
        onUpdate,
        userId,
      };

      return (
        <PostCommentsContext.Provider value={context}>
          <BaseFactory {...this.props} />
        </PostCommentsContext.Provider>
      );
    }
  }

  PostCommentsStateManager.propTypes = {
    id: PropTypes.string.isRequired,
    userId: PropTypes.number,
  };

  PostCommentsStateManager.defaultProps = {
    userId: null,
  };

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'postCommentsStateManager'))(PostCommentsStateManager)
  }

  return PostCommentsStateManager;
};

/**
 * Maps props to post-comments
 * @param {*} param0 
 */
export const commentsMapper = ({ data, ...rest }) => {
  const postId = get(data, 'post.postId');
  const commentStatus = get(data, 'post.commentStatus');
  const commentsData = get(data, 'post.comments.nodes');
  const newProps = omit(rest, 'userId', 'client');
  const title = get(data, 'post.title');

  return {
    postId,
    title,
    commentsData,
    open: commentStatus === 'open',
    ...newProps
  };
}