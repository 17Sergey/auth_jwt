import axios from 'axios';

import { useQuery } from '@tanstack/react-query';
import { authAPI } from '../api/authAPI';

export default function ProfilePage() {
    const { data: user } = useQuery({ queryKey: ['userAuth'] });

    const { data: profile } = useQuery({
        queryKey: ['getProfile'],
        queryFn: async () => {
            const profileResponse = await axios.get(
                `http://localhost:5500/api/profile/${user.username}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                }
            );

            if (profileResponse.status === 200) {
                return profileResponse.data;
            }
        },
    });

    return (
        <div>
            <h1>Профиль</h1>
            {profile && (
                <div>
                    <h2 className="text-xl mt-8">{profile?.username}</h2>
                    <h3 className="text-lg mt-4">Вход в систему в: {new Date().toString()}</h3>
                </div>
            )}
        </div>
    );
}
