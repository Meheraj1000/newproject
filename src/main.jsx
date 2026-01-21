import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './AuthPage/AuthProvider.jsx'; // todo
import { AuthProvider as Main } from './context/AuthContext.jsx'; // todo

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Main>
          <App />
        </Main>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);


// text: err?.response?.data?.errorSources[0]?.message,
