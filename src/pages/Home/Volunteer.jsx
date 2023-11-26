import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
const Volunteer = () => {
    const handleNewsletter = e => {
        e.preventDefault();

        toast.success('Thank you for contacting us.');

    }
    return (
       
            <div className="px-8">
            <div className=" max-w-7xl mx-auto md:w-1/2">
                <div className="bg-blue-300 shadow-lg p-3 border mb-40 rounded-3xl  mt-20 ">
                    <h1 className="mt-2 text-4xl text-center font-bold">Volunteer Opportunities</h1>
                    <h1 className="mt-4 text-xl text-center font-bold">Do you want to be a volunteer?  <br />Fill up the form and get a chance to be a volunteer </h1>

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
                            <textarea placeholder="Write About Yourself and why you want to be a volunteer" name="message" className="textarea textarea-bordered resize-y mt-3" required />
                        </div>
                        <div className="form-control mt-3 flex items-center">
                            <button type="submit" className="w-1/2 btn bg-blue-600 border-none font-bold text-xl text-white">Submit</button>
                        </div>
                    </form>

                    <ToastContainer></ToastContainer>
                </div>
            </div>
            </div>
       
    );
};

export default Volunteer;