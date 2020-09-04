import React from 'react';
import { render } from '@testing-library/react';
import App from './components/App';
/*
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/




test('renders Manage Task header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Manage Task/i);
  expect(headerElement).toBeInTheDocument();
});

