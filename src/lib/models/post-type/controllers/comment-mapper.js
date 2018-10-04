import React from 'react';
import v3 from 'uuid/v3';
import { get, isEmpty, map, omit } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import {
  NEW_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
  POST_COMMENTS_QUERY,
} from '../query';

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
      this.state = {
        editing: {},
        content: { new: '' },
        errors: {}, 
        author: '',
        email: '',
      };
    }

    /**
     * Returns onChange event function for comment being edited
     * 
     * @returns {func} 
     */
    onChange(id) {
      return ({ target: { name, value } }) => {
        if (name === 'author' || name === 'email' ) {
          this.setState({ [name]: value })
        }
        const { content } = this.state;
        const key = id || 'new'
        content[key] = value;
        this.setState({ content });
      }
    }

    /**
     * Returns event function for creating new post comment
     * 
     * @returns {func} 
     */
    onCreate(event) {
      const { client } = this.props;
      const id = get(this.props, 'data.post.id');
      const postId = get(this.props, 'data.post.postId');
      const userId = get(this.props, 'data.viewer.userId');

      const { content: { new: content }, author, email } = this.state;
      const now = new Date();
      const date = `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`;
      
      if ( !userId && (!author || !email) ) {
        const { errors } = this.state;
        errors['new'] = 'Unregistered users must enter an author name and email to comment';
        this.setState({ errors });
        return;
      }

      client.mutate({
        mutation: NEW_COMMENT_MUTATION,
        variables: {
          agent: null,
          approved: null,
          author,
          authorEmail: email,
          authorIp: null,
          authorUrl: null,
          type: null,
          userId: userId || null,
          parent: null,
          postId,
          content,
          date,
          clientId: v3(`${author}${email}`, v3.URL),
        },
        refetchQueries: [
          {
            query: POST_COMMENTS_QUERY,
            variables: { id }
          }
        ]
      })
      .then(payload => {
        console.log('create mutation success');
        const { content } = this.state;
        content['new'] = '';
        this.setState({ content, author: '', email: '' });
      })
      .catch(error => {
        console.warn('create mutation failed');
        const { errors } = this.state;
        errors['new'] = error.message;
        this.setState({ errors });
      });
    }

    /**
     * Returns event function for delete existing post comment
     * 
     * @param {number} id - Global ID of comment object
     * @returns {func} 
     */
    onDelete(id) {
      const { client } = this.props;

      return () => {
        client.mutate({
          mutation: DELETE_COMMENT_MUTATION,
          variables: { clientId: v3(`${id}delete`, v3.URL), id },
        })
        .then(payload => {

        })
        .catch(error => {
          const { errors } = this.state;
          errors[id] = error.message;
          this.setState({ errors });
        });
      }
    }

    /**
     * Returns event function for editing existing post comment
     * 
     * @param {number} id - Global ID of comment object
     * @returns {func} 
     */
    onEdit(id, content) {
      return () => {
        const { editing, content: workingContent } = this.state;
        editing[id] = true;
        workingContent[id] = content
        this.setState({ editing, content: workingContent })
      }
    }

    /**
     * Returns event function for update existing post comment
     * 
     * @param {number} id - Global ID of comment object
     * @returns {func} 
     */
    onUpdate(id) {
      const { client } = this.props;

      return (event) => {
        const content = this.state.content[id];
        const now = new Date();
        const date = `${(0 + now.getMonth()).slice(-2)}/${now.getDate()}/${now.getFullYear()}`
        client.mutate({
          mutation: UPDATE_COMMENT_MUTATION,
          variables: {
            clientId: v3(`${id}update`, v3.URL),
            id,
            content,
            date,
          }
        })
        .then(payload => {
          const { content } = this.state;
          delete content[id];
          this.setState({ content });
        })
        .catch(error => {
          const { errors } = this.state;
          errors[id] = error.message;
          this.setState({ errors });
        });
      }
    }

    render() {
      const { onChange, onCreate, onDelete, onEdit, onUpdate } = this;
      const { author, email, errors, editing, content } = this.state;
      const userId = get(this.props, 'data.viewer.userId');

      const newCommentState = {
        author: (!userId) ? author : undefined,
        email: (!userId) ? email: undefined,
        error: errors['new'],
        message: content['new'],
        onChange: onChange(),
        onSubmit: onCreate,
      };

      const state = (id, content) => {
        return {
          onChange: onChange(id), 
          onDelete: onDelete(id), 
          onEdit: onEdit(id, content), 
          onUpdate: onUpdate(id)
        };
      }

      return BaseFactory({
        ...this.props,
        newCommentState,
        editing,
        errors,
        state,
      });
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'postCommentsStateManager'))(PostCommentsStateManager)
  }

  return PostCommentsStateManager;
};

export const commentsMapper = ({
  data, editing, errors, state,
  EditCommentView, ...rest,
}) => {
  const postId = get(data, 'post.postId');
  const userId = get(data, 'data.viewer.userId');
  const commentStatus = get(data, 'post.commentStatus');
  const comments = get(data, 'post.comments.nodes');

  const commentsData = (comments && !isEmpty(comments)) ?
    map(comments, ({id, author, content, ...rest }) => {
      if (author.userId === userId) {
        return {
          id,
          author,
          content,
          ...rest,
          editing: editing[id],
          error: errors[id],
          ...state(id, content),
        }
      }

      return {
        id,
        author,
        content,
        ...rest,
      }
    }) :
    null;

  const newProps = omit(rest, 'client');

  return {
    postId,
    commentsData,
    open: commentStatus === 'open',
    ...newProps
  };
}