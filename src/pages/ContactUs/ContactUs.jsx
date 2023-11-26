import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";




const ContactUs = () => {
    const handleNewsletter = e => {
        e.preventDefault();

        toast.success('Thank you for contacting us.');

    }
    return (
        <div>
            <div className="px-8 mt-10">
                <div className=" max-w-7xl mx-auto px-5 bg-blue-300 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 py-5 gap-5">
                        <div className=" flex flex-col items-center bg-white p-3 rounded-lg space-y-2">
                            <FaPhone className=" text-2xl"></FaPhone>
                            <h1 className=" text-2xl font-semibold">Call Us</h1>
                            <p className=" text-xl">+8801921234567</p>
                        </div>
                        <div className=" flex flex-col items-center bg-white p-3 rounded-lg space-y-2">
                            <FaLocationDot className=" text-2xl"></FaLocationDot>
                            <h1 className=" text-2xl font-semibold">Location</h1>
                            <p className=" text-xl text-center">789 Green Avenue,
                                <br /> SH 54321 Maplewood</p>
                        </div>
                        <div className=" flex flex-col items-center bg-white p-3 rounded-lg space-y-2">
                            <IoMail className=" text-2xl"></IoMail>
                            <h1 className=" text-2xl font-semibold">Email Us</h1>
                            <p className=" text-xl">caresync@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="px-8">
            <div className=" max-w-7xl mx-auto md:w-1/2">
                <div className="bg-blue-300 shadow-lg p-3 border mb-40 rounded-3xl  mt-20 ">
                    <h1 className="mt-2 text-4xl text-center font-bold">Contact Us</h1>
                    <form onSubmit={handleNewsletter} className=" mx-auto card-body rounded-3xl">
                        <div className=" space-y-5 md:space-y-0 md:flex justify-between gap-3">
                        <div className="form-control w-full">
                            <input type="email" placeholder="Email Address" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control w-full">
                            <input type="text" placeholder="Name" name="name" className="input input-bordered" required />
                        </div>
                        </div>
                        <div className="form-control">
                            <textarea placeholder="Your Message" name="message" className="textarea textarea-bordered resize-y mt-3" required />
                        </div>
                        <div className="form-control mt-3 flex items-center">
                            <button type="submit" className="w-1/2 btn bg-blue-600 border-none font-bold text-xl text-white">Submit</button>
                        </div>
                    </form>

                    <ToastContainer></ToastContainer>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ContactUs;