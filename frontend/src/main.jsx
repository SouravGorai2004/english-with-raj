import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/inter';
import './styles/tokens.css';
import './styles/themes.css';
import './styles/base.css';
import './styles/components.css';
import App from './App.jsx';
import { ThemeProvider } from './theme/ThemeProvider.jsx';
import { SiteContentProvider } from './hooks/SiteContentProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <ThemeProvider>
                    <SiteContentProvider>
                        <App />
                    </SiteContentProvider>
                </ThemeProvider>
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>
);