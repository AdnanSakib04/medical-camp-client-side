import { Helmet } from "react-helmet";
import AboutUs from "./AboutUs";
import Volunteer from "./Volunteer";
import Banner from "./Banner";
import PopularCamps from "./PopularCamps";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Care Sync | Home</title>
            </Helmet>
            <Banner></Banner>
            <PopularCamps></PopularCamps>
            <AboutUs></AboutUs>
            <Volunteer></Volunteer>
            
        </div>
    );
};

export default Home;