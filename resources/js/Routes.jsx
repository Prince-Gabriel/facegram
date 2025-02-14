import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { CreatePost } from './pages/CreatePost';
import { PrivateRoute } from './components/PrivateRoute';

export const Routes = () => {
    return (
        <Layout>
            <RouterRoutes>
                <Route 
                    path="/" 
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/users/:username" 
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/create-post" 
                    element={
                        <PrivateRoute>
                            <CreatePost />
                        </PrivateRoute>
                    } 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </RouterRoutes>
        </Layout>
    );
}; 