import { render, screen } from '@testing-library/react';
import ConvertMoney from './ConvertMoney';

test('renders ConvertMoney component', () => {
  render(<ConvertMoney />);

  // Check if the component renders without error
  const convertMoneyElement = screen.getByTestId('convert-money-container');
  expect(convertMoneyElement).toBeInTheDocument();

  // You might need to adjust the text you are looking for based on your actual component content
  // For example, if you have a title like "Your Currency Converter", you can use:
  const titleElement = screen.getByText(/Your Currency Converter/i);
  expect(titleElement).toBeInTheDocument();
});
