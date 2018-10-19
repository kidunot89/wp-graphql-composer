import React from 'react';

function smallerThan(size) {
  console.log(this);
  const { width } = this.state;

  switch (size) {
    case 'X-LARGE':
      return width < 1200;
    case 'LARGE':
      return width < 992;
    case 'MEDIUM':
      return width < 768;
    case 'SMALL':
      return width < 576;
    default: 
      return true;
  }
}

function biggerThan(size) {
  const { width } = this.state;

  switch (size) {
    case 'X-LARGE':
      return width >= 1200;
    case 'LARGE':
      return width >= 992;
    case 'MEDIUM':
      return width >= 768;
    case 'SMALL':
      return width >= 576;
    default: 
      return true;
  }
}

/**
 * Gets string representation of width based of width
 * 
 * @returns {String}
 */
const calculateDeviceWidth = () => {
  const width = window.innerWidth;

  switch(true) {
    case width >= 1200:
      return 'X-LARGE';
    case width >= 992:
      return 'LARGE';
    case width >= 768:
      return 'MEDIUM';
    case width >= 576:
      return 'SMALL';
    default:
      return 'X-SMALL'
  }

}

/**
 * Update AppContext width state variables
 * 
 * @returns {void}
 */
function updateWidthVars() {
  const width = window.innerWidth;
  const device = calculateDeviceWidth();
  this.setState({ width, device });
}

export const createAppState = (context) => ({
  width: window.innerWidth,
  device: calculateDeviceWidth(),
  biggerThan: biggerThan.bind(context),
  smallerThan: smallerThan.bind(context),
  updateWidthVars: updateWidthVars.bind(context),
});

export const bindContext = (context) => {
  return new Promise((resolve, reject) => {
    if(context) {
      context.setState({
       
      }, (state) => resolve(state));
    }
    reject(Error('Undefined Context'));
  });
}

export const AppContext = React.createContext();