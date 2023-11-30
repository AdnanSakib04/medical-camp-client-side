import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { getUserRole } from "../../layout/userRole";

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
            <h1 className=" text-4xl">Welcome, <span className=" text-blue-600">{user.displayName}</span></h1>
                    <h1 className=" text-3xl mt-3">You Role is: <span className=" text-blue-600">{userRole}</span></h1>
        </div>
    );
};

export default DashboardHome;