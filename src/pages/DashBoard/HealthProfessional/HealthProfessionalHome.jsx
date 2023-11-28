import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const HealthProfessionalHome = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            doctor home
            <h2 className="text-3xl">
                <span>Hi, Welcome</span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
        </div>
    );
};

export default HealthProfessionalHome;