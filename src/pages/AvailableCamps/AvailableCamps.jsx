import { useLoaderData } from "react-router-dom";
import CampCard from "./CampCard";
import { useState } from "react";
import { Helmet } from "react-helmet";

const AvailableCamps = () => {
    const loadedCamps = useLoaderData();
    const [camps, setCamps] = useState(loadedCamps);


    return (
        <div>
           <Helmet>
                <title>Care Sync | Available Camps</title>
            </Helmet>
          <div className="m-20">
        <h1 className="mt-10 text-5xl font-bold text-center mb-14 max-w-max mx-auto p-3 rounded-lg text-gray-600">All Camps</h1>
        <div className="max-w-7xl mx-auto">
  
          {/*all blog cards*/}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 md:p-0 gap-y-6 mb-20 justify-items-center">
            {camps?.map(singleCamp => (
              <CampCard
                key={singleCamp._id}
                singleCamp={singleCamp}
                camps={camps}
              />
            ))}
          </div>
        </div>
      </div>
        </div>
    );
};

export default AvailableCamps;