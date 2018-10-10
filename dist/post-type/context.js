import React from 'react';

export var postCommentsInitialState = {
  editing: {},
  workingState: {}
};
export var PostCommentsContext = React.createContext(postCommentsInitialState);