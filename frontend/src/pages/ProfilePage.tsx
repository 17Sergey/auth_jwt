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

    console.log('Profile');

    const { data: tokens, refetch } = useQuery({
        queryKey: ['refresh'],
        queryFn: authAPI.refresh,
        enabled: false,
    });

    console.log(tokens);

    const handleRefresh = () => {
        refetch();
    };

    return (
        <div>
            <h1>Профиль</h1>
            <button
                className="mt-4"
                onClick={handleRefresh}
            >
                Refresh
            </button>
            {profile && (
                <div>
                    <h2 className="text-xl mt-8">{profile?.username}</h2>
                    <h3 className="text-lg mt-4">Вход в систему в: {new Date().toString()}</h3>
                </div>
            )}
        </div>
    );
}
