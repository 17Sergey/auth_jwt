import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

import ProtectedRoutes from './components/protectRoutes/ProtectedRoutes';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { authAPI } from './api/authAPI';
import { Spin } from 'antd';

function App() {
    const queryClient = useQueryClient();

    const cachedData = queryClient.getQueryData(['userAuth']);
    console.log(cachedData);

    const { data: userAuth, isPending } = useQuery({
        queryKey: ['userAuth'],
        queryFn: () => {
            const userAuth = queryClient.getQueryData(['userAuth']);
            return authAPI.getMe(userAuth.accessToken);
        },
        retry: false,
    });

    if (isPending) return <Spin size="large" />;

    return (
        <Routes>
            <Route element={<ProtectedRoutes />}>
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />
            </Route>
            <Route
                path="/signup"
                element={<SignupPage />}
            />
            <Route
                path="/login"
                element={<LoginPage />}
            />
        </Routes>
    );
}

export default App;
