import { Helmet } from "react-helmet";
import { useLoaderData, useParams } from "react-router-dom";


const UpcomingCampDetails = () => {
    const campData = useLoaderData();
    const { campId } = useParams();
    console.log("---", campId);
    const camp = campData.find(camp => camp._id === campId);

    return (
        <div>
            <Helmet>
                <title>Care Sync | Camp Details</title>
            </Helmet>
            <div className="max-w-7xl p-4 mx-auto mb-20 mt-8 text-gray-950">
                <div className="   bg-blue-300 rounded-lg  p-3">
                <img className="w-full lg:h-[700px]" src={camp.photo} alt="" />
                        <h2 className=" text-blue-700 text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-5 mb-5 ">{camp.name}</h2>
                        <h2 className="text-base md:text-2xl font-bold text-center mb-3">Fees: ${camp.fees}</h2>
                        <h2 className="text-base md:text-2xl font-bold text-center mb-3">Time: {camp.dateTime.split("T")[1]}</h2>
                        <h2 className="text-base md:text-2xl font-bold text-center mb-3">Date: {camp.dateTime.split("T")[0]}</h2>
                        <h2 className="text-base md:text-2xl font-bold text-center mb-3">Audience: {camp.audience}</h2>
                        <h2 className="text-base md:text-2xl font-bold text-center mb-3">Venue: {camp.location}</h2>
                        
                        
                      
                        <h2 className="text-base md:text-2xl font-bold text-center mb-3">Specialized Services{camp.specializedServices}</h2>
                        <h2 className="text-base md:text-2xl font-bold text-center mb-3">Healthcare Professional: {camp.healthcareProfessionals}</h2>

                    <p className=" text-xl text-justify mb-10  font-normal"><span className=" font-bold">Description: </span>{camp.description}</p>

                </div>
            </div>







        </div>

    );
};

export default UpcomingCampDetails;