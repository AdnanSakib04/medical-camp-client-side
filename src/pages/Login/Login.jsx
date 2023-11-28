import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import { Helmet } from "react-helmet";

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        // console.log(email, password);

        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                toast.success('You have successfully logged in');
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            })
    }

   
    return (
        <div>
            <Helmet>
                <title>Care Sync | Login</title>
            </Helmet>
            <div className=" max-w-7xl mx-auto mb-40 ">
                <div className="  p-4 mt-8 rounded-3xl ">

                    <form onSubmit={handleLogin} className="md:w-1/2 mx-auto card-body bg-blue-300  rounded-3xl">
                        <h1 className="text-4xl font-bold lg:text-5xl mt-8 text-center ">Login</h1>
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

                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-blue-600 border-none font-bold text-xl text-white">Login</button>
                        </div>

                       



                        <p className=" text-center mt-6 text-xl font-medium ">Want to create an account? <Link className=" text-blue-500 font-bold" to={'/register'}>Register</Link></p>
                    </form>


                </div>
                <ToastContainer></ToastContainer>
            </div>
        </div>
    );
};

export default Login;