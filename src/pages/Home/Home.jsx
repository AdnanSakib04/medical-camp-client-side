import { Helmet } from "react-helmet";
import AboutUs from "./AboutUs";
import Volunteer from "./Volunteer";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Care Sync | Home</title>
            </Helmet>

            <AboutUs></AboutUs>
            <Volunteer></Volunteer>
            
        </div>
    );
};

export default Home;