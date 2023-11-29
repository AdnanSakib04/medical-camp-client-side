import { useEffect, useState } from "react";
import PopularCampCard from "./PopularCampCard";

const PopularCamps = () => {
    const [campData, setCampData] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/available-camps`)
      .then(response => response.json())
      .then(data => {
        setCampData(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [campData]);
    return (
        <div>
            <div className="m-20">
        <h1 className="mt-10 text-5xl font-bold text-center mb-14 max-w-max mx-auto p-3 rounded-lg text-gray-600">Popular Camps</h1>
        <div className="max-w-7xl mx-auto">
  
          {/*all blog cards*/}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 md:p-0 gap-y-6 mb-20 justify-items-center">
            {campData?.map(singleCamp => (
              <PopularCampCard
                key={singleCamp._id}
                singleCamp={singleCamp}
                campData={campData}
              />
            ))}
          </div>
        </div>
      </div>
        </div>
    );
};

export default PopularCamps;