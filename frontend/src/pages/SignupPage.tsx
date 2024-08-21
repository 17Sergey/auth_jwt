import { ChangeEvent, FormEvent, useState } from 'react';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [userData, setUserData] = useState<{ username: string } | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        const response = await fetch('http://localhost:5500/api/auth/signup2', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);

        if (response.ok) {
            const data = await response.json();
            setUserData(data);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>Регистрация</h1>
            <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-4 p-4 bg-blue-400 rounded-xl max-w-96 mx-auto"
            >
                <label
                    className={`flex flex-col items-start gap-2`}
                    htmlFor="username"
                >
                    <>Имя пользователя</>
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
