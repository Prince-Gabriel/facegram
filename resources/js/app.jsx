import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Routes } from './Routes';

createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <AuthProvider>
            <Routes />
        </AuthProvider>
    </BrowserRouter>
);