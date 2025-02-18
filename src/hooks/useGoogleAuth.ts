import { useNavigate } from 'react-router-dom';
import { loginWithGoogleAPI } from '../services/api';
import { setAuthToken } from '../utils/auth';

export const useGoogleAuth = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = async (credential: string) => {
        try {
            const response = await loginWithGoogleAPI(credential);

            const token = response.token;
            const tokenData = JSON.parse(atob(token.split('.')[1]));

            setAuthToken({
                token: response.token,
                email: response.email,
                expiresIn: response.expiresIn,
                photo: response.photo || tokenData.picture
            });

            const subscriptionId = localStorage.getItem("subscriptionId");
            if (!subscriptionId || subscriptionId === "undefined") {
                navigate(`/progress`);
                return;
            }

            const catId = localStorage.getItem("catId");
            if (!catId || catId === "undefined") {
                navigate('/progress');
                return;
            }

            navigate('/cat-assistant');
        } catch (error: any) {
            console.error('Google Login Error:', error);
            throw new Error(error.message || 'Failed to login with Google');
        }
    };

    return { handleGoogleLogin };
}; 