import { Helmet } from "react-helmet";
import AboutUs from "./AboutUs";
import Volunteer from "./Volunteer";
import Banner from "./Banner";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Care Sync | Home</title>
            </Helmet>
            <Banner></Banner>
            <AboutUs></AboutUs>
            <Volunteer></Volunteer>
            
        </div>
    );
};

export default Home;