import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App';
import './src/i18n'; // Initialize i18next from the correct path
import { LoadingSpinner } from './src/components/LoadingSpinner';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<LoadingSpinner message="Loading..." />}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);
