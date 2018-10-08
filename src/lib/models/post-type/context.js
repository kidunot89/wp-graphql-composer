import React from 'react';

export const postCommentsInitialState = {
  editing: {},
  workingState: {},
};
export const PostCommentsContext = React.createContext(
  postCommentsInitialState
);