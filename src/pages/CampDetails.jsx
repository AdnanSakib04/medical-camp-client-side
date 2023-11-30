import { useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { getUserRole } from "../layout/userRole";
import { FaAnglesRight } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Helmet } from "react-helmet";

const CampDetails = () => {
    const campData = useLoaderData();
    const { campId } = useParams();
    console.log("---", campId);
    const camp = campData.find(camp => camp._id === campId);
    const { user } = useContext(AuthContext);

    const [userRole, setUserRole] = useState(null);

    const axiosPublic = useAxiosPublic();


    useEffect(() => {
        // Fetch user role when the component mounts
        if (user) {
            getUserRole(user.email)
                .then((role) => setUserRole(role))
                .catch((error) => console.error('Error fetching user role:', error));
        }
    }, [user]);


    const handleJoinCamp = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const gender = form.gender.value;
        const bloodGroup = form.bloodGroup.value;
        const address = form.address.value;
        const fees = form.fees.value;
        const email = user.email;
        const campID = campId;
        const campName = camp.name;
        const dateTime = camp.dateTime;
        const location = camp.location;
        const organizerEmail = camp.organizerEmail;
        const paymentStatus = "Unpaid";
        const confirmationStatus = "Pending";



        const registrationInfo = { name, phone, gender, bloodGroup, address, fees, email, campID, campName, dateTime, location, paymentStatus, confirmationStatus, organizerEmail };

        console.log(registrationInfo);

        axiosPublic.post('/register-camp', registrationInfo)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Registration done successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
    };

    const openModal = () => {
        const modal = document.getElementById('my_modal_1');
        if (modal) {
            modal.showModal();
        }
    };

    const closeAndResetModal = () => {
        const modal = document.getElementById('my_modal_1');
        if (modal) {
            modal.close();
        }
        // Reset form or any other cleanup needed
    };





    return (
        <div>
            <Helmet>
                <title>Care Sync | Camp Details</title>
            </Helmet>
            <div>
                <div className="max-w-7xl p-4 mx-auto mb-20 mt-8 text-gray-950">
                    <div className="   bg-blue-300 rounded-lg  p-3">
                        <img className="w-full lg:h-[700px]" src={camp.photo} alt="" />
                        <h2 className=" text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-5 mb-5 ">{camp.name}</h2>
                        <h2 className="text-base md:text-2xl font-bold text-center mb-3">Audience: {camp.audience}</h2>
                        <h2 className="text-base md:text-2xl font-bold text-center mb-3">Venue: {camp.location}</h2>
                        <h2 className="text-base md:text-2xl font-bold text-center mb-3">Date: {camp.dateTime}</h2>
                        <h2 className="text-base md:text-2xl font-bold text-center mb-3">Fees: ${camp.fees}</h2>

                        <p className=" text-xl text-justify mb-10  font-normal"><span className=" font-bold">Description: </span>{camp.description}</p>
                        {
                            userRole === 'participant' && <div className="flex justify-center">
                                <button onClick={openModal} className="btn bg-green-500 border-none text-xl text-gray-950" > <FaAnglesRight></FaAnglesRight>Join Camp</button>
                            </div>
                        }
                        {
                            userRole != 'participant' && <div className="flex justify-center">
                                <button className="btn bg-green-500 border-none text-xl text-gray-950" disabled> <FaAnglesRight></FaAnglesRight>Join Camp</button>
                            </div>
                        }
                    </div>
                </div>


                <div className='max-w-7xl mx-auto mb-40'>
                    <div className="p-4 mt-8 rounded-3xl">
                        {/* <button className="btn bg-blue-600 text-white font-medium" onClick={openModal}>Update Profile</button> */}

                        <dialog id="my_modal_1" className="modal ">
                            <div className="modal-box bg-blue-300">
                                <form onSubmit={handleJoinCamp}>
                                    {/* <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium text-[18px]">Email</span>
                                    </label>
                                    <input type="email" name="email" defaultValue={user.email} readOnly placeholder="Email" className="input input-bordered" required />
                                </div> */}

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium text-[18px]">Name</span>
                                        </label>
                                        <input type="text" name="name" placeholder="Name" defaultValue={user.displayName} readOnly className="input input-bordered" required />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium text-[18px]">Blood Group</span>
                                        </label>
                                        <select name="bloodGroup" className="input input-bordered" required>
                                            <option value="">Select Blood Group</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium text-[18px]">Fees</span>
                                        </label>
                                        <input type="number" readOnly defaultValue={camp.fees} placeholder="fees" name="fees" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium text-[18px]">Gender</span>
                                        </label>
                                        <select name="gender" className="input input-bordered" required>
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium text-[18px]">Age</span>
                                        </label>
                                        <input type="number" placeholder="Age" name="age" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium text-[18px]">Phone</span>
                                        </label>
                                        <input type="text" placeholder="Phone" name="phone" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium text-[18px]">Address</span>
                                        </label>
                                        <input type="text" placeholder="address" name="address" className="input input-bordered" required />
                                    </div>

                                    <div className="form-control mt-6">
                                        <input type="submit" className="btn bg-blue-600 text-white border-none font-bold text-xl" value="Submit" />
                                    </div>
                                </form>
                                <div className="flex justify-center">
                                    <button className="btn mt-3 bg-red-300 font-medium border-none" onClick={closeAndResetModal}>Close</button>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>





            </div>
        </div>

    );
};

export default CampDetails;