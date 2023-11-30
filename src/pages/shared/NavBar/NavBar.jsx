import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBriefcaseMedical } from "react-icons/fa6";

import { AuthContext } from "../../../providers/AuthProvider";
import { getUserRole } from "../../../layout/userRole";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
      // Fetch user role when the component mounts
      if (user) {
        getUserRole(user.email)
          .then((role) => setUserRole(role))
          .catch((error) => console.error('Error fetching user role:', error));
      }
    }, [user]);

    // console.log("---------",user?.displayName);

    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }
    const navLinks = <>
        <li><NavLink className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "font-bold  text-blue-950 lg:text-blue-600 p-2 rounded-lg" : ""} to="/">Home</NavLink></li>

        <li><NavLink className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? " font-bold  text-blue-950 lg:text-blue-600 p-2 rounded-lg" : ""} to="/contact-us">Contact Us</NavLink></li>

       {user &&  <li><NavLink className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? " font-bold  text-blue-950 lg:text-blue-600 p-2 rounded-lg" : ""} to="/available-camps">Available Camps</NavLink></li>}

        {userRole==="participant" && <li><NavLink className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? " font-bold  text-blue-950 lg:text-blue-600 p-2 rounded-lg" : ""} to="/dashboard/participant-profile">Dashboard</NavLink></li>}
        {userRole==="healthcareProfessional" && <li><NavLink className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? " font-bold  text-blue-950 lg:text-blue-600 p-2 rounded-lg" : ""} to="/dashboard/professional-profile">Dashboard</NavLink></li>}
        {userRole==="organizer" && <li><NavLink className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? " font-bold  text-blue-950 lg:text-blue-600 p-2 rounded-lg" : ""} to="/dashboard/organizer-profile">Dashboard</NavLink></li>}

    </>
    return (
        <div className=" bg-blue-300">
            <div className="navbar   mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>

                            <FaBriefcaseMedical className=" text-2xl  text-blue-600">

                            </FaBriefcaseMedical>
                        </div>
                        <div className="text-center font-medium text-xl ">
                            <h1>Care Sync</h1>
                            {/* <h1>Blogs</h1> */}
                        </div>
                    </div>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-4 px-1">
                        {navLinks}
                    </ul>

                </div>
                <div className="navbar-end">


                    {
                        user ?
                        <><div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                          <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                          </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                          <li onClick={handleSignOut}><a>Logout</a></li>
                        </ul>
                      </div>


                     
                      </>
                            
                            :
                            <>
                               <div className=" flex gap-1">
                               <Link to="/register">
                                    <button className="btn bg-blue-600 text-white w-[90px] border-none">Register</button>
                                </Link>
                                <Link to="/login">
                                    <button className="btn bg-blue-600 text-white w-[90px] border-none">Login</button>
                                </Link>
                               </div>
                            </>
                    }

                </div>
            </div>
        </div>
    );
};

export default NavBar;