import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoutes() {
    const { data: user } = useQuery({ queryKey: ['userAuth'] });

    return user ? <Outlet /> : <Navigate to="/login" />;
}
