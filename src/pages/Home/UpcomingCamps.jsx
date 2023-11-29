import { useEffect, useState } from "react";
import UpcomingCampCard from "./UpcomingCampCard";

const UpcomingCamps = () => {
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
  }, []); 

  // Function to check if a camp is upcoming
  const isUpcomingCamp = (campDateTime) => {
    const currentDateTime = new Date();
    const campDateTimeObject = new Date(campDateTime);
    return campDateTimeObject > currentDateTime;
  };

  return (
    <div>
      <div className="m-20">
        <h1 className="mt-10 text-5xl font-bold text-center mb-14 max-w-max mx-auto p-3 rounded-lg text-gray-600">Upcoming Camps</h1>
        <div className="max-w-7xl mx-auto">
          {/* Show only upcoming camps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 md:p-0 gap-y-6 mb-20 justify-items-center">
            {campData?.filter(singleCamp => isUpcomingCamp(singleCamp.dateTime)).slice(0, 6).map(singleCamp => (
              <UpcomingCampCard
                key={singleCamp._id}
                singleCamp={singleCamp}
                campData={campData}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center">
        {campData?.length > 6 && <Link to={`/available-camps`}><button className="btn bg-blue-600 text-white font-bold rounded-lg border-none mb-14">See All Camps</button></Link>}
      </div> */}
    </div>
  );
};

export default UpcomingCamps;
