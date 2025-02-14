import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingOverlay } from './Loading';

export const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingOverlay />;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}; 