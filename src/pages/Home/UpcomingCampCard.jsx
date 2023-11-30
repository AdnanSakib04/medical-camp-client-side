import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { motion } from "framer-motion"

const UpcomingCampCard = ({ singleCamp }) => {
    const { name, photo, audience, description, location, _id, fees, specializedServices, dateTime, healthcareProfessionals } = singleCamp;
    console.log(_id);

    return (
        <motion.div animate={{scale:1}} initial={{scale:0}} transition={{type:"tween", duration: 2}} 
        className="card w-96 bg-gray-300 shadow-xl">
        <figure><img className="h-[213px] w-full" src={photo} alt="" /></figure>
        <div className="card-body">
        <h2 className="text-[22px] font-bold text-blue-700"> {name}</h2>
            <h2 className="text-xl font-medium text-black"><span className="font-bold">Audience:</span> {audience}</h2>
            <h2 className="text-xl font-medium text-black"><span className="font-bold">Fees:</span> ${fees}</h2>
            <h2 className="text-xl font-medium text-black"><span className="font-bold">Venue:</span> {location}</h2>
            <h2 className="text-xl font-medium text-black"><span className="font-bold">Date:</span> {dateTime.split("T")[0]}</h2>
            <h2 className="text-xl font-medium text-black"><span className="font-bold">Time:</span> {dateTime.split("T")[1]}</h2>
            <h2 className="text-xl font-medium text-black"><span className="font-bold">Services:</span> {specializedServices}</h2>
            <h2 className="text-xl font-medium text-black"><span className="font-bold">Healthcare Professionals:</span> {healthcareProfessionals}</h2>
            <h2 className=" text-justify mb-2"> {description}</h2>


            <div className="flex justify-evenly mt-auto">
                <Link to={`/upcoming-camp-details/${_id}`}><button className="btn bg-blue-600 text-white font-bold rounded-lg  border-none"><BiDetail></BiDetail>Details</button></Link>
               

              
            </div>
        </div>
    </motion.div>
    );
};


export default UpcomingCampCard;