import { useLoaderData, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaAnglesRight } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { getUserRole } from "../../layout/userRole";

const JoinCamp = () => {
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






    return (
        <div>
            <Helmet>
                <title>Care Sync | Join Camp</title>
            </Helmet>
            <div>
                


                <div className='max-w-7xl mx-auto mb-40'>
                    <div className="p-4 mt-8 rounded-3xl">
                        {/* <button className="btn bg-blue-600 text-white font-medium" onClick={openModal}>Update Profile</button> */}

                        
                                <form onSubmit={handleJoinCamp} className="md:w-1/2 mx-auto card-body bg-blue-300 rounded-3xl">
                                <h1 className="text-4xl font-bold lg:text-5xl mt-8 text-center">Join Camp</h1>

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
                                
                          
                    </div>
                </div>





            </div>
        </div>

    );
};

export default JoinCamp;