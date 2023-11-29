import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useLoaderData, useParams } from "react-router-dom";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);



const Payment = () => {
    const campData = useLoaderData();
    const { id } = useParams();
//const idInt = parseInt(id);
console.log("---", id);
const camp = campData.find(camp => camp._id === id);
console.log(camp?.fees);
    return (
        <div>
           
            <div>
                <h1 className=" text-3xl mb-2">Amount: {camp?.fees}</h1>
                <Elements stripe={stripePromise}>
                    <CheckOutForm
                    camp={camp}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;