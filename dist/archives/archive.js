import _objectSpread from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import { map } from 'lodash';
import './archive.scss';

var archive = function archive(_ref) {
  var Attachment = _ref.Attachment,
      PostResult = _ref.PostResult,
      container = _ref.container,
      containerProps = _ref.containerProps,
      header = _ref.header,
      noHeader = _ref.noHeader,
      resultsData = _ref.resultsData,
      rest = _objectWithoutProperties(_ref, ["Attachment", "PostResult", "container", "containerProps", "header", "noHeader", "resultsData"]);

  var Results = function Results() {
    return React.createElement(React.Fragment, null, !noHeader && React.createElement("header", {
      className: "page-header"
    }, React.createElement("h1", {
      className: "page-title"
    }, header)), map(resultsData, function (_ref2) {
      var id = _ref2.id,
          r = _objectWithoutProperties(_ref2, ["id"]);

      return React.createElement(PostResult, Object.assign({}, r, {
        id: id,
        key: id
      }, _objectSpread({}, rest, {
        Attachment: Attachment
      })));
    }));
  };

  if (container === true) {
    return React.createElement("div", containerProps, React.createElement(Results, null));
  } else if (container) {
    var Container = container;
    return React.createElement(Container, containerProps, React.createElement(Results, null));
  }

  return React.createElement(Results, null);
};

archive.defaultProps = {
  container: undefined,
  containerProps: {},
  noHeader: false,
  header: undefined,
  resultsData: []
};
export default archive;