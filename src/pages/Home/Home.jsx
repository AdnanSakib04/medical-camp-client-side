import { Helmet } from "react-helmet";
import Footer from "../shared/Footer/Footer";
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
            <Footer></Footer>
        </div>
    );
};

export default Home;