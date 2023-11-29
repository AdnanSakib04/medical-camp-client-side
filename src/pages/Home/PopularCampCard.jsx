import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { motion } from "framer-motion"

const PopularCampCard = ({ singleCamp }) => {
    const { name, photo, audience, description, location, _id, fees, specializedServices, dateTime, healthcareProfessionals } = singleCamp;
    console.log(_id);

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
               

              
            </div>
        </div>
    </motion.div>
    );
};

export default PopularCampCard;