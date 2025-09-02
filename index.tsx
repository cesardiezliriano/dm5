import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n'; // Initialize i18next
import { LoadingSpinner } from './components/LoadingSpinner'; // Import a loading component

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<LoadingSpinner message="Loading application..." />}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);