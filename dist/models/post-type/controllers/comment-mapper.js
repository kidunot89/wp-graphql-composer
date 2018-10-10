var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import v3 from 'uuid/v3';
import { findIndex, get, omit } from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import { PostCommentsContext, postCommentsInitialState } from '../context';
import { NEW_COMMENT_MUTATION, UPDATE_COMMENT_MUTATION, DELETE_COMMENT_MUTATION, POST_COMMENTS_QUERY } from '../query';

/**
 * PostCommentStateManager - manages the state for a group of comment components
 * 
 * @param {React.Component} BaseComponent 
 */
export var postCommentsStateManager = function postCommentsStateManager(BaseComponent) {
  var BaseFactory = React.createFactory(BaseComponent);

  var PostCommentsStateManager = function (_React$Component) {
    _inherits(PostCommentsStateManager, _React$Component);

    function PostCommentsStateManager(props) {
      _classCallCheck(this, PostCommentsStateManager);

      var _this = _possibleConstructorReturn(this, (PostCommentsStateManager.__proto__ || Object.getPrototypeOf(PostCommentsStateManager)).call(this, props));

      _this.onChange = _this.onChange.bind(_this);
      _this.onCreate = _this.onCreate.bind(_this);
      _this.onDelete = _this.onDelete.bind(_this);
      _this.onEdit = _this.onEdit.bind(_this);
      _this.onUpdate = _this.onUpdate.bind(_this);
      _this.state = postCommentsInitialState;
      return _this;
    }

    /**
     * Returns onChange event function for comment being edited
     * 
     * @returns {func} 
     */


    _createClass(PostCommentsStateManager, [{
      key: 'onChange',
      value: function onChange(key) {
        var _this2 = this;

        return function (_ref) {
          var _ref$target = _ref.target,
              name = _ref$target.name,
              value = _ref$target.value;
          var workingState = _this2.state.workingState;

          workingState[key][name] = value;
          _this2.setState({ workingState: workingState });
        };
      }

      /**
       * Returns event function for creating new post comment
       * 
       * @param {string} - workingState key
       * @returns {func} 
       */

    }, {
      key: 'onCreate',
      value: function onCreate(key) {
        var _this3 = this;

        var mutate = this.props.client.mutate;

        return function () {
          var postId = get(_this3.props, 'data.post.postId');
          var userId = _this3.props.userId;
          var _state$workingState$k = _this3.state.workingState[key],
              author = _state$workingState$k.author,
              authorEmail = _state$workingState$k.authorEmail,
              authorUrl = _state$workingState$k.authorUrl,
              content = _state$workingState$k.content;

          var now = new Date();
          var date = now.getMonth() + '/' + now.getDate() + '/' + now.getFullYear();

          if (!userId && (!author || !authorEmail)) {
            var errors = _this3.state.errors;

            errors['new'] = 'Unregistered users must enter an author name and email to comment';
            _this3.setState({ errors: errors });
            return;
          }

          mutate({
            mutation: NEW_COMMENT_MUTATION,
            variables: {
              author: author,
              authorEmail: authorEmail,
              authorUrl: authorUrl,
              type: null,
              userId: userId,
              parent: null,
              postId: postId,
              content: content,
              date: date,
              clientId: v3('' + author + key, v3.URL)
            },
            update: function update(cache, _ref2) {
              var comment = _ref2.data.createComment.comment;

              var _cache$readQuery = cache.readQuery({
                query: POST_COMMENTS_QUERY,
                variables: { id: _this3.props.id }
              }),
                  post = _cache$readQuery.post;

              post.comments.nodes.push(comment);
              cache.writeQuery({
                query: POST_COMMENTS_QUERY,
                data: { post: post }
              });
            }
          }).then(function () {
            console.log('create mutation success');
            var _state = _this3.state,
                editing = _state.editing,
                workingState = _state.workingState;

            delete editing[key];
            delete workingState[key];
            _this3.setState({ editing: editing, workingState: workingState });
          }).catch(function (error) {
            console.warn('create mutation failed');
            var workingState = _this3.state.workingState;

            workingState[key]['error'] = error.message;
            _this3.setState({ workingState: workingState });
          });
        };
      }

      /**
       * Returns event function for delete existing post comment
       * 
       * @param {number} id - Global ID of comment object
       * @returns {func} 
       */

    }, {
      key: 'onDelete',
      value: function onDelete(id) {
        var _this4 = this;

        var mutate = this.props.client.mutate;

        return function () {
          mutate({
            mutation: DELETE_COMMENT_MUTATION,
            variables: {
              id: id,
              clientId: v3(id + 'delete', v3.URL)
            },
            update: function update(cache, _ref3) {
              var comment = _ref3.data.deleteComment.comment;

              var _cache$readQuery2 = cache.readQuery({
                query: POST_COMMENTS_QUERY,
                variables: { id: _this4.props.id }
              }),
                  post = _cache$readQuery2.post;

              var index = findIndex(post.comments.nodes, function (_ref4) {
                var id = _ref4.id;
                return id === comment.id;
              });
              post.comments.nodes.splice(index, 1);
              cache.writeQuery({
                query: POST_COMMENTS_QUERY,
                data: { post: post }
              });
            }
          }).then(function () {
            console.log('delete mutation success');
          }).catch(function (error) {
            console.log('delete mutation success');
            console.warn(error);
          });
        };
      }

      /**
       * Returns event function for editing existing post comment
       * 
       * @param {number} key - workingState key
       * @returns {func} 
       */

    }, {
      key: 'onEdit',
      value: function onEdit(key) {
        var _this5 = this;

        var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var userId = this.props.userId;


        var author = void 0;
        var authorEmail = void 0;
        var authorUrl = void 0;
        if (!userId && content === '') {
          author = '';
          authorEmail = '';
          authorUrl = '';
        }

        return function () {
          var _state2 = _this5.state,
              editing = _state2.editing,
              workingState = _state2.workingState;

          editing[key] = true;
          workingState[key] = { author: author, authorEmail: authorEmail, authorUrl: authorUrl, content: content };
          _this5.setState({ editing: editing, content: workingState });
        };
      }

      /**
       * Returns event function for update existing post comment
       * 
       * @param {number} key - workingState key
       * @param {number} id - Global ID of comment object
       * @returns {func} 
       */

    }, {
      key: 'onUpdate',
      value: function onUpdate(key, id) {
        var _this6 = this;

        var mutate = this.props.client.mutate;


        return function () {
          var content = _this6.state.workingState[key].content;

          var now = new Date();
          var date = now.getMonth() + '/' + now.getDate() + '/' + now.getFullYear();
          mutate({
            mutation: UPDATE_COMMENT_MUTATION,
            variables: {
              type: null,
              id: id,
              content: content,
              date: date,
              clientId: v3(id + 'update', v3.URL)
            },
            update: function update(cache, _ref5) {
              var comment = _ref5.data.updateComment.comment;

              var _cache$readQuery3 = cache.readQuery({
                query: POST_COMMENTS_QUERY,
                variables: { id: _this6.props.id }
              }),
                  post = _cache$readQuery3.post;

              var index = findIndex(post.comments.nodes, function (_ref6) {
                var id = _ref6.id;
                return id === comment.id;
              });
              post.comments.nodes[index] = comment;
              cache.writeQuery({
                query: POST_COMMENTS_QUERY,
                data: { post: post }
              });
            }
          }).then(function () {
            console.log('update mutation success');
            var _state3 = _this6.state,
                editing = _state3.editing,
                workingState = _state3.workingState;

            delete editing[key];
            delete workingState[key];
            _this6.setState({ editing: editing, workingState: workingState });
          }).catch(function (error) {
            console.warn('update mutation failed');
            var workingState = _this6.state.workingState;

            workingState[key]['error'] = error.message;
            _this6.setState({ workingState: workingState });
          });
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var onChange = this.onChange,
            onCreate = this.onCreate,
            onDelete = this.onDelete,
            onEdit = this.onEdit,
            onUpdate = this.onUpdate;
        var userId = this.props.userId;


        var context = Object.assign({}, this.state, {
          onChange: onChange,
          onCreate: onCreate,
          onDelete: onDelete,
          onEdit: onEdit,
          onUpdate: onUpdate,
          userId: userId
        });

        return React.createElement(
          PostCommentsContext.Provider,
          { value: context },
          React.createElement(BaseFactory, this.props)
        );
      }
    }]);

    return PostCommentsStateManager;
  }(React.Component);

  PostCommentsStateManager.propTypes = {
    id: PropTypes.string.isRequired,
    userId: PropTypes.number
  };

  PostCommentsStateManager.defaultProps = {
    userId: null
  };

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'postCommentsStateManager'))(PostCommentsStateManager);
  }

  return PostCommentsStateManager;
};

/**
 * Maps props to post-comments
 * @param {*} param0 
 */
var commentsMapper = function commentsMapper(_ref7) {
  var data = _ref7.data,
      rest = _objectWithoutProperties(_ref7, ['data']);

  var postId = get(data, 'post.postId');
  var commentStatus = get(data, 'post.commentStatus');
  var commentsData = get(data, 'post.comments.nodes');
  var newProps = omit(rest, 'userId', 'client');
  var title = get(data, 'post.title');

  return Object.assign({
    postId: postId,
    title: title,
    commentsData: commentsData,
    open: commentStatus === 'open'
  }, newProps);
};
export { commentsMapper };