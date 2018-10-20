import _regeneratorRuntime from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/regenerator";
import _asyncToGenerator from "/home/geoff/Dev/web/wp-graphql-composer/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { Icon, Loading } from 'utils';
afterEach(cleanup);
it("displays default loading icon, and default loading message",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var _render, getByText, getByTestId, icon;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _render = render(React.createElement(Loading, null)), getByText = _render.getByText, getByTestId = _render.getByTestId;
          icon = getByTestId(/loading-icon/);
          expect(icon).toBeTruthy();
          expect(icon.innerHTML === '').toBeFalsy();
          expect(getByText(/Loading\.\.\./)).toBeTruthy();

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
it("displays custom loading icon, and custom loading message",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee2() {
  var CustomIcon, _render2, baseElement, customIcon, _render3, getByText, getByTestId, icon;

  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          CustomIcon = function CustomIcon() {
            return React.createElement(Icon, {
              name: "autorenew"
            });
          };

          _render2 = render(React.createElement(CustomIcon, null)), baseElement = _render2.baseElement;
          customIcon = baseElement.querySelector('div').innerHTML;
          _render3 = render(React.createElement(Loading, {
            icon: React.createElement(CustomIcon, null),
            message: "Coming soon...."
          })), getByText = _render3.getByText, getByTestId = _render3.getByTestId;
          icon = getByTestId(/loading-icon/);
          expect(icon).toBeTruthy();
          expect(icon.innerHTML === customIcon).toBeTruthy();
          expect(getByText(/Coming soon\.\.\./)).toBeTruthy();

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));