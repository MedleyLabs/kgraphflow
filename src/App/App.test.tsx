import { render, screen } from '@testing-library/react';

import App from './index';

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/React Flow - CRA Example/i);
  expect(headerElement).toBeInTheDocument();
});
