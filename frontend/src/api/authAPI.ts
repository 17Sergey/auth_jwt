import axios, { AxiosError } from 'axios';

const signUp = async () => {};

const login = async (formData) => {
    const response = await axios.post('http://localhost:5500/api/auth/login', formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 200) {
        return response.data;
    }
};

const getMe = async (accessToken: string) => {
    const profileResponse = await axios.get(`http://localhost:5500/api/auth/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    console.log(profileResponse);
    if (profileResponse.status === 200) {
        return { ...profileResponse.data, accessToken };
    }
};

const refresh = async () => {
    const refreshResponse = await axios.get(`http://localhost:5500/api/refresh`);

    console.log(refreshResponse);

    if (refreshResponse.status === 200) {
        return refreshResponse.data;
    }
};

export const authAPI = {
    signUp,
    login,
    getMe,
    refresh,
};
