import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/features/userSlice";
import { useAppDispatch } from "../Redux/hooks";
import Layout from "../components/Layout";
import { isAuthenticated } from "../utils/auth";

const TestProfile = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = isAuthenticated();
    const photo = localStorage.getItem('photo');


    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <Layout>
            <div className="w-full min-h-[700px] flex flex-col items-center justify-center gap-6">

                {photo && (
                    <img
                        src={photo}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-2 border-primary"
                        referrerPolicy="no-referrer"
                    />
                )}


                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-2xl font-semibold">
                        {user?.full_name || 'User'}
                    </h2>
                    <p className="text-gray-600">
                        {user?.email}
                    </p>
                </div>


                <button
                    onClick={handleLogout}
                    className="mt-8 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </div>
        </Layout>
    );
};

export default TestProfile; 