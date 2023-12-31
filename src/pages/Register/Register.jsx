import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";



const Register = () => {
    const { createUser, handleProfileUpdate } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();



    const handleRegister = e => {
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        const role = form.get('role');
        console.log(name, photo, email, password, role);




        if (password.length < 6) {
            toast.error('Password must be at least 6 characters or more.');
            return;
        }
        // else if (!/[A-Z]/.test(password)) {
        //     toast.error('Password must contain at least one uppercase letter.');
        //     return;
        // } else if (!/[0-9]/.test(password)) {
        //     toast.error('Password must contain at least one number.');
        //     return;
        // } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        //     toast.error('Password must contain at least one special character.');
        //     return;
        // }

        if(role === "healthcareProfessional"){
            const healthcareProfessionalInfo = {
                name: name,
                email: email,
                specialty: "",
                certifications: "",
                phone: "",
                address: ""
            }
    
            axiosPublic.post('/healthcareProfessional', healthcareProfessionalInfo)
            .then(res => console.log(res)
            )
        }

        if(role === "participant"){
            const participantInfo = {
                name: name,
                email: email,
                preferences: "",
                interests: "",
                phone: "",
                address: "",
            }
    
            axiosPublic.post('/participant', participantInfo)
            .then(res => console.log(res)
            )
        }

        if(role === "organizer"){
            const organizerInfo = {
                name: name,
                email: email,
                preferences: "",
                phone: "",
                address: "",
            }
    
            axiosPublic.post('/organizer', organizerInfo)
            .then(res => console.log(res)
            )
        }
        createUser(email, password)
            .then(result => {
                console.log(result.user)
                handleProfileUpdate(name, photo)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: name,
                            email: email,
                            photoUrl: photo,
                            role: role
                        }
                        axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                console.log('user added to the database')
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'User created successfully.',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate( '/dashboard/home');
                            }
                        })

                    })
            })
            .catch(error => {
                console.error(error)
                toast.error(error.message);
            })
    }

   
    return (
        <div>
            <Helmet>
                <title>Care Sync | Register</title>
            </Helmet>
            <div className='max-w-7xl mx-auto mb-40'>
                <div className="  p-4 mt-8 rounded-3xl ">

                    <form onSubmit={handleRegister} className="md:w-1/2 mx-auto card-body bg-blue-300 rounded-3xl">
                        <h1 className="text-4xl font-bold lg:text-5xl mt-8 text-center "> Register</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-[18px] ">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Name" className="input input-bordered  " required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-[18px] ">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered  " required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-[18px] ">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered  " required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-[18px] ">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered  " required />

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium text-[18px]">Select Your Role</span>
                                </label>
                                <select name="role" className="input input-bordered" required>
                                    <option value="organizer">Organizer</option>
                                    <option value="healthcareProfessional">Healthcare Professional</option>
                                    <option value="participant">Participant</option>
                                </select>
                            </div>

                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-blue-600  border-none font-bold text-xl text-white">Register</button>
                        </div>
                       
                        <p className="text-center mt-6 text-xl font-medium ">Already have an account? <Link className=" text-blue-600 font-bold" to={'/login'}>Login</Link></p>
                    </form>

                </div>
                <ToastContainer></ToastContainer>
            </div>
        </div>
    );
};

export default Register;