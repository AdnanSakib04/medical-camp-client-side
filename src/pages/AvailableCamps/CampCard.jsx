import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { AuthContext } from "../../providers/AuthProvider";
import { motion } from "framer-motion"
import { FaAnglesRight } from "react-icons/fa6";


import Swal from "sweetalert2";
import { useContext } from "react";
const CampCard = ({ singleCamp }) => {
    const { name, photo, audience, description, location, _id, fees, specializedServices, dateTime, healthcareProfessionals } = singleCamp;
    console.log(_id);

    const { user } = useContext(AuthContext);


   
    

    return (
        <motion.div animate={{scale:1}} initial={{scale:0}} transition={{type:"tween", duration: 2}} 
        className="card w-96 bg-blue-300 shadow-xl">
        <figure><img className="h-[213px] w-full" src={photo} alt="" /></figure>
        <div className="card-body">
            <h2 className="text-[22px] font-bold text-black"> {name}</h2>
            <h2 className="text-xl font-medium text-black">Audience: {audience}</h2>
            <h2 className="text-xl font-medium text-black">Fees: {fees}</h2>
            <h2 className="text-xl font-medium text-black">Venue Location: {location}</h2>
            <h2 className="text-xl font-medium text-black">Date and Time: {dateTime}</h2>
            <h2 className="text-xl font-medium text-black">Services: {specializedServices}</h2>
            <h2 className="text-xl font-medium text-black">Healthcare Professionals: {healthcareProfessionals}</h2>
            <h2 className=" text-justify mb-2"> {description}</h2>

            <div className="flex justify-evenly mt-auto">
                <Link to={`/camp-details/${_id}`}><button className="btn bg-blue-600 text-white font-bold rounded-lg  border-none"><BiDetail></BiDetail>Details</button></Link>
               

                {/* check to see if user is logged in or not */}
                {
                    user? 
                    <button  className="btn font-bold text-black   bg-orange-300  rounded-lg border-none"><FaAnglesRight></FaAnglesRight>Join Camp</button>
                    :
                    <Link to={`/login`}><button className="btn font-bold text-black   bg-orange-300  rounded-lg border-none"><FaAnglesRight></FaAnglesRight>Join Camp</button></Link>
                   }
            </div>
        </div>
    </motion.div>
    );
};

export default CampCard;