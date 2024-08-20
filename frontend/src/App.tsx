import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
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
                path="/profile/:username"
                element={<ProfilePage />}
            />
        </Routes>
    );
}

export default App;
