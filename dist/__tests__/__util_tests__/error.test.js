import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { Error, Icon } from 'utils';
;
afterEach(cleanup);
it("renders 404 error message and icon", function () {
  var _render = render(React.createElement(Error, {
    type: "404"
  })),
      getByText = _render.getByText,
      getByTestId = _render.getByTestId;

  var icon = getByTestId(/error-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === '').toBeFalsy();
  expect(getByText(/Sorry, we can't locate the content you're looking for\. Please, try again later\./)).toBeTruthy();
});
it("renders 403 error message and custom icon", function () {
  var CustomIcon = function CustomIcon() {
    return React.createElement(Icon, {
      name: "block",
      size: "large"
    });
  };

  var _render2 = render(React.createElement(CustomIcon, null)),
      baseElement = _render2.baseElement;

  var customIcon = baseElement.querySelector('div').innerHTML;

  var _render3 = render(React.createElement(Error, {
    type: "403"
  })),
      getByText = _render3.getByText,
      getByTestId = _render3.getByTestId;

  var icon = getByTestId(/error-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === customIcon).toBeTruthy();
  expect(getByText(/Sorry, you aren't authorized to view this content\./)).toBeTruthy();
});
it("renders query error message and icon", function () {
  var CustomIcon = function CustomIcon() {
    return React.createElement(Icon, {
      name: "error_outline",
      size: "large"
    });
  };

  var _render4 = render(React.createElement(CustomIcon, null)),
      baseElement = _render4.baseElement;

  var customIcon = baseElement.querySelector('div').innerHTML;

  var _render5 = render(React.createElement(Error, {
    type: "query"
  })),
      getByText = _render5.getByText,
      getByTestId = _render5.getByTestId;

  var icon = getByTestId(/error-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === customIcon).toBeTruthy();
  expect(getByText(/Sorry, there was a problem loading the content you are trying to access\. Please, try again later\./)).toBeTruthy();
});
it("renders unknown error message and icon", function () {
  var CustomIcon = function CustomIcon() {
    return React.createElement(Icon, {
      name: "sentiment_very_dissatisfied",
      size: "large"
    });
  };

  var _render6 = render(React.createElement(CustomIcon, null)),
      baseElement = _render6.baseElement;

  var customIcon = baseElement.querySelector('div').innerHTML;

  var _render7 = render(React.createElement(Error, null)),
      getByText = _render7.getByText,
      getByTestId = _render7.getByTestId;

  var icon = getByTestId(/error-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === customIcon).toBeTruthy();
  expect(getByText(/Wow, this is embarassing! We're not sure what happened\. Or\.\.\. a lazy dev just forgot to add a message here\. Sorry!/)).toBeTruthy();
});
it("renders custom error message and icon", function () {
  var CustomIcon = function CustomIcon() {
    return React.createElement(Icon, {
      name: "stars"
    });
  };

  var _render8 = render(React.createElement(CustomIcon, null)),
      baseElement = _render8.baseElement;

  var customIcon = baseElement.querySelector('div').innerHTML;

  var _render9 = render(React.createElement(Error, {
    message: "BoomPow",
    icon: React.createElement(CustomIcon, null)
  })),
      getByText = _render9.getByText,
      getByTestId = _render9.getByTestId;

  var icon = getByTestId(/error-icon/);
  expect(icon).toBeTruthy();
  expect(icon.innerHTML === customIcon).toBeTruthy();
  expect(getByText(/BoomPow/)).toBeTruthy();
});