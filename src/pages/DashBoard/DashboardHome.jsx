import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { getUserRole } from "../../layout/userRole";
import { Helmet } from "react-helmet";

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Fetch user role when the component mounts
        if (user) {
            getUserRole(user.email)
                .then((role) => setUserRole(role))
                .catch((error) => console.error('Error fetching user role:', error));
        }
    }, [user]);

    return (
        <div>
            <Helmet>
                <title>Care Sync | User Home</title>
            </Helmet>
            <h1 className=" text-4xl">Welcome, <span className=" text-blue-600 font-bold">{user.displayName}</span></h1>
            <h1 className=" text-3xl mt-3 font-semibold">You Role is: <span className=" text-blue-600">{userRole}</span></h1>
            <p className=" mt-2 italic text-red-500">Go to your profile from the dashboard menu and update your profile</p>
        </div>
    );
};

export default DashboardHome;