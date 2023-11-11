import { render, screen } from '@testing-library/react';
import ConvertMoney from './ConvertMoney';

test('renders learn react link', () => {
  render(<ConvertMoney />);
  const linkElement = screen.getByText(/Convert Money APP/i);
  expect(linkElement).toBeInTheDocument();
});
