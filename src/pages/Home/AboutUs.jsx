import { FaBriefcaseMedical } from "react-icons/fa6";

const AboutUs = () => {
    return (
        <div>
            <div className="max-w-7xl px-8 mx-auto ">

                <div className=" bg-blue-300 shadow-lg border mt-40 mb-40 rounded-3xl px-8 text-blue-950 p-2">
                    <h1 className="mt-10 text-5xl font-bold text-center  max-w-max mx-auto p-2 rounded-lg ">About <br /> Care Sync </h1>
                    <h1 className=" text-blue-600 text-center text-5xl font-bold max-w-max mx-auto"><FaBriefcaseMedical></FaBriefcaseMedical></h1>

                    <div className=" mb-4">
                        <p className="  w-3/4 mx-auto text-center text-xl my-3 font-medium">Welcome to Care Sync – a community-driven initiative dedicated to promoting health and well-being. Our mission is to provide accessible medical services, raise awareness about health issues, and create a positive impact on the community.</p>
                    </div>

                    <div className=" text-black  italic grid grid-cols-1 lg:grid-cols-2 gap-2 ">
                        <div className="bg-blue-200  border-4   mx-auto rounded-lg mt-4 mb-4  ">
                            <p className="  p-2 mx-auto text-justify text-xl my-3"><span className=" font-bold">Our Vision:</span> We are a passionate team of healthcare professionals, volunteers, and community advocates committed to making a difference. Our diverse backgrounds and experiences converge with a shared goal – to improve lives through accessible healthcare.</p>
                        </div>

                        <div className="bg-blue-200  border-4   mx-auto rounded-lg mt-4 mb-4  ">
                            <p className="  p-2 mx-auto text-justify text-xl my-3"><span className=" font-bold">Who We Are: </span>
                                At Feather Blogs, we believe that every story is a feather in the cap of shared experiences. We curate content that transcends boundaries, resonates with authenticity, and sparks connections.</p>
                        </div>
                        <div className="bg-blue-200  border-4   mx-auto rounded-lg mt-4 mb-4 lg:max-h-[160px] ">
                            <p className="  p-2 mx-auto text-justify text-xl my-3"><span className=" font-bold">What We Do: </span>
                            We organize regular medical camps that offer free health check-ups, consultations, and essential medical services. Beyond medical services, we actively engage with the community.</p>
                        </div>
                        <div className="bg-blue-200  border-4   mx-auto rounded-lg mt-4 mb-8  ">
                            <p className="  p-2 mx-auto text-justify text-xl my-3"><span className="font-bold">Join Us in the Journey: </span>
                            Whether you are a healthcare professional, a volunteer, or someone passionate about community well-being, we invite you to join us in our mission. Together, we can create a healthier, more resilient community.</p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default AboutUs;