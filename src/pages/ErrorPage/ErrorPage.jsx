import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
           
        <div className=" flex items-center justify-center mt-32 ">
        <img src="https://i.ibb.co/kMMKFDp/image.png" alt="" className="rounded-lg "/>
        </div>
       <div className="text-center mt-9">
       <Link to={'/'}><div className="btn bg-gray-600 text-white font-semibold rounded-lg border-none">go back to home  </div></Link>
       </div>

    </div>
    );
};

export default ErrorPage;