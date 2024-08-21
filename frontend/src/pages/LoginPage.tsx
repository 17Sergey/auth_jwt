import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { UserContext } from '../App';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { user, setUser } = useContext(UserContext);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await axios.post('http://localhost:5500/api/auth/login', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            setUser(response.data);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (user) return <Navigate to={`/profile/${user.username}`} />;

    return (
        <div>
            <h1>Войти в аккаунт</h1>
            <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-4 p-4 bg-blue-400 rounded-xl max-w-96 mx-auto"
            >
                <label
                    className={`flex flex-col items-start gap-2`}
                    htmlFor="username"
                >
                    <p>Имя пользователя</p>
                    <input
                        type="text"
                        name="username"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </label>
                <label
                    className={`flex flex-col items-start gap-2`}
                    htmlFor="password"
                >
                    <p>Пароль</p>
                    <input
                        type="password"
                        name="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
}
