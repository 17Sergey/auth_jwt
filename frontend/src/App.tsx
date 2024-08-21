import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { createContext, useState } from 'react';

export type UserContextType = {
    user: {
        username: string;
        accessToken?: string;
    } | null;
    setUser: React.Dispatch<React.SetStateAction<UserContextType['user']>>;
};

export type UserType = {
    username: string;
    accessToken?: string;
};

export const UserContext = createContext<UserContextType | null>(null);

function App() {
    const [user, setUser] = useState<UserType | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route
                    path="/signup"
                    element={<SignupPage />}
                />
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/profile/:username?"
                    element={<ProfilePage />}
                />
            </Routes>
        </UserContext.Provider>
    );
}

export default App;
