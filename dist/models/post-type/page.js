import React from 'react';

var Page = function Page(_ref) {
  var id = _ref.id,
      title = _ref.title,
      content = _ref.content;

  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      null,
      title
    ),
    React.createElement(
      'div',
      null,
      content
    )
  );
};

export default Page;