import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { getUserRole } from "./userRole";
import { FaEnvelope, FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaCashRegister } from "react-icons/fa";
import NavBar from "../pages/shared/NavBar/NavBar";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";
import Footer from "../pages/shared/Footer/Footer";
import { FaListUl } from "react-icons/fa6";
import { MdFeedback } from "react-icons/md";





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
        <div>
            <NavBar></NavBar>
            <div className="flex">
                {/* dashboard side bar */}
                <div className="w-64 min-h-screen bg-blue-300">
                    <ul className="menu p-4">
                    <li>
                                    <NavLink to="/dashboard/home">
                                        <FaHome></FaHome>
                                         User Home</NavLink>
                                </li>

                                {userRole === 'admin' &&
                            <>
                                <li>
                                    <NavLink to="/dashboard/participant-list">
                                        <FaListUl></FaListUl>
                                        Participant List</NavLink>
                                </li>
                                
                                <li>
                                    <NavLink to="/dashboard/organizer-list">
                                        <FaListUl></FaListUl>
                                        Organizer List</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/professional-list">
                                        <FaListUl></FaListUl>
                                        Healthcare Professional List</NavLink>
                                </li>


                            </>

                        }
                        {userRole === 'healthcareProfessional' &&
                            <>
                                <li>
                                    <NavLink to="/dashboard/professional-profile">
                                        <CgProfile></CgProfile>
                                        Health Professional Profile</NavLink>
                                </li>


                            </>

                        }



                        {
                            userRole === "participant" &&
                            <>
                                <li>
                                    <NavLink to="/dashboard/participant-profile">
                                        <CgProfile></CgProfile>
                                        Participant Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/registered-camps">
                                        <FaCashRegister></FaCashRegister>
                                        Registered Camps</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/payment-history">
                                        <FaHistory></FaHistory>
                                        Payment History</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/feedback-and-ratings">
                                        <MdFeedback></MdFeedback>
                                        Feedback and Ratings</NavLink>
                                </li>
                            </>
                        }



                        {
                            userRole === "organizer" &&
                            <>
                                <li>
                                    <NavLink to="/dashboard/organizer-profile">
                                        <CgProfile></CgProfile>
                                        Organizer Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-a-camp">
                                        <IoAdd></IoAdd>
                                        Add a Camp</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-camps">
                                        <MdOutlineManageAccounts></MdOutlineManageAccounts>
                                        Manage Camps</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-registered-camps">
                                        <MdManageHistory></MdManageHistory>
                                        Manage Registered Camps</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-upcoming-camp">
                                        <IoAddCircleOutline></IoAddCircleOutline>
                                        Add Upcoming Camp</NavLink>
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
                            <NavLink to="/contact-us">
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
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;
