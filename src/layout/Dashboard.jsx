import  { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { getUserRole } from "./userRole";
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
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
    <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-blue-300">
                <ul className="menu p-4">
                    {userRole==='healthcareProfessional' &&
                         <>
                            <li>
                                <NavLink to="/dashboard/healthProfessionalHome">
                                    <FaHome></FaHome>
                                    Health Professional Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addItems">
                                    <FaUtensils></FaUtensils>
                                    Add Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageItems">
                                    <FaList></FaList>
                                    Manage Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaBook></FaBook>
                                    Manage Bookings</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                            </li>
                        </>
                            
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaSearch></FaSearch>
                            Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
  );
};

export default Dashboard;
