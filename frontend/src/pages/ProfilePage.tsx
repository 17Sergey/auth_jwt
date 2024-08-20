import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
    const { username } = useParams();
    console.log(params);

    return (
        <div>
            <h1>Профиль</h1>
            <p>123</p>
        </div>
    );
}
