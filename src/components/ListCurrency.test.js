import { createRoot } from 'react-dom/client';
import ListCurrency from './ListCurrency';

it('renders without crashing', () => {
  const root = document.createElement('div');
  createRoot(root).render(<ListCurrency />);
});
