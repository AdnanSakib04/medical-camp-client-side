import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
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

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                toast.success('You have successfully logged in');
            })
            .catch(error => {
                console.error(error)
            })
    }
    return (
        <div className=" max-w-7xl mx-auto mb-40 ">
        <div className="  p-4 mt-8 rounded-3xl ">

            <form onSubmit={handleLogin} className="md:w-1/2 mx-auto card-body bg-gray-600  rounded-3xl">
                <h1 className="text-4xl font-bold lg:text-5xl mt-8 text-center text-white">Login</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium text-[18px] text-white">Email</span>
                    </label>
                    <input type="email" placeholder="email" name="email" className="input input-bordered  " required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium text-[18px] text-white">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="password" className="input input-bordered  " required />

                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-gray-400 border-none font-bold text-xl text-white">Login</button>
                </div>

                <p onClick={handleGoogleSignIn} className="mt-2 shadow-lg btn bg-transparent hover:  font-semibold hover:text-black py-2 px-4 border-2 border-gray-400 hover:border-transparent rounded-xl max-w-max mx-auto text-white">
                    <span className="text-3xl"><FcGoogle></FcGoogle></span> Continue with Google
                </p>

                

                <p className=" text-center mt-6 text-xl font-medium text-white">Want to create an account? <Link className=" text-green-500 font-bold" to={'/register'}>Register</Link></p>
            </form>
            
            
        </div>
        <ToastContainer></ToastContainer>
    </div>
    );
};

export default Login;