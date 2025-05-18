import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider> {/* ✅ Wrap App with ThemeProvider */}
      <App />
    </ThemeProvider>
  </StrictMode>
);
