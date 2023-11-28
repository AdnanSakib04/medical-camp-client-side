import { Link, useLoaderData, useParams } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

const CampDetails = () => {
    const campData = useLoaderData();
    const { campId } = useParams();
    console.log("---", campId);
    const camp = campData.find(camp => camp._id === campId);
    const { user } = useContext(AuthContext);

    // let ownerscamp;

    // if (user.email === camp.userEmail) {
    //     ownerscamp = 1;
    // }
    // else {
    //     ownerscamp = 0;
    // }







    return (
        <div>
            <div className="max-w-7xl p-4 mx-auto mb-20 mt-8 text-gray-950">
                <div className="   bg-blue-300 rounded-lg  p-3">
                    <img className="w-full lg:h-[700px]" src={camp.photo} alt="" />
                    <h2 className=" text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-5 mb-5 ">{camp.name}</h2>
                    <h2 className="text-base md:text-2xl font-bold text-center mb-3">Audience: {camp.audience}</h2>
                    <h2 className="text-base md:text-2xl font-bold text-center mb-3">Venue: {camp.location}</h2>
                    <h2 className="text-base md:text-2xl font-bold text-center mb-3">Date: {camp.dateTime}</h2>
                    <h2 className="text-base md:text-2xl font-bold text-center mb-3">Fees: ${camp.fees}</h2>

                    <p className=" text-xl text-justify mb-10  font-normal"><span className=" font-bold">Description: </span>{camp.description}</p>
                    {
                        <div className="flex justify-center">
                            <Link to={`/updatecamp/${campId}`}> <button className="btn bg-green-500 border-none text-xl text-gray-950"> <BsFillPencilFill></BsFillPencilFill>Update</button></Link>
                        </div> 
                    }
                </div>
            </div>




           

        </div>

    );
};

export default CampDetails;