import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { BsBookmarks } from "react-icons/bs";
import { AuthContext } from "../../providers/AuthProvider";

import Swal from "sweetalert2";
import { useContext } from "react";
const CampCard = ({ singleCamp }) => {
    const { name, photo, audience, description, location, _id, fees, specializedServices, dateTime, healthcareProfessionals } = singleCamp;
    console.log(_id);

    const { user } = useContext(AuthContext);


   
    

    return (
        <div className="card w-96 bg-gray-400 shadow-xl">
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
                <Link to={`/blogDetails/${_id}`}><button className="btn bg-blue-300 text-black font-bold rounded-lg  border-none"><BiDetail></BiDetail>Details</button></Link>
               

                {/* check to see if user is logged in or not */}
                {
                    user? 
                    <button  className="btn font-bold text-black   bg-orange-300  rounded-lg border-none"><BsBookmarks></BsBookmarks>Wishlist</button>
                    :
                    <Link to={`/login`}><button className="btn font-bold text-black   bg-orange-300  rounded-lg border-none"><BsBookmarks></BsBookmarks>Wishlist</button></Link>
                   }
            </div>
        </div>
    </div>
    );
};

export default CampCard;