import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';

export default function ProfilePage() {
    const { username } = useParams();

    const { user } = useContext(UserContext);

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        let profileResponse;
        (async () => {
            profileResponse = await axios.get(`http://localhost:5500/api/profile/${username}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            console.log(profileResponse);
            if (profileResponse.status === 200) {
                setProfile(profileResponse.data);
            }
        })();
    }, [username, user.accessToken]);

    return (
        <div>
            <h1>Профиль</h1>
            {profile && (
                <div>
                    <h2 className="text-xl mt-8">{profile.username}</h2>
                    <h3 className="text-lg mt-4">
                        Вход в систему в: {profile.loggedIn.toString()}
                    </h3>
                </div>
            )}
        </div>
    );
}
