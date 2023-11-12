import React from'react';
import ReactDOM from 'react-dom';
import ListCurrency from './ListCurrency';

describe('ListCurrency', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListCurrency />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});