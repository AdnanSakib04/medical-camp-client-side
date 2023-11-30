import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import { useContext } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const FeedbackForm = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const registerData = useLoaderData();
    console.log(registerData);


    const { regId } = useParams();
    //const idInt = parseInt(id);
    console.log("---", regId);
    const reg = registerData.find(reg => reg._id === regId);


    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            campName: reg?.campName,
            name: user?.displayName,
            location: reg?.location || '',
            fees: reg?.fees || '',
            dateTime: reg?.dateTime || '',
        },
    });

    const onSubmit = async (data) => {
        try {

            const feedbackData = {
                name: data.name,
                email: user?.email,
                location: data.location,
                fees: data.fees,
                dateTime: data.dateTime,
                campName: data.campName,
                rating: data.rating,
                feedback: data.feedback,
      
              };
              console.log(feedbackData);
      
              const campRes = await axiosPublic.post('/feedback-and-ratings', feedbackData);
      
              if (campRes.data.insertedId) {
                // Show success popup
                reset();
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: `Feedback is added to the camp.`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
        }
        catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    return (
        <div>
            <Helmet>
                <title>Care Sync | Feedback</title>
            </Helmet>
            <div className="max-w-7xl mx-auto mb-40">
                <div className="p-4 mt-8 rounded-3xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 mx-auto card-body bg-blue-300 rounded-3xl">
                        <h1 className="text-4xl font-bold lg:text-5xl mt-8 text-center">Feedback and Rating</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-[18px]">Name</span>
                            </label>
                            <input readOnly
                                type="text"
                                placeholder="Name"
                                {...register('name', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-[18px]">Camp Name</span>
                            </label>
                            <input readOnly
                                type="text"
                                placeholder="Camp Name"
                                {...register('campName', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>





                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-[18px]">Venue Location</span>
                            </label>
                            <input readOnly
                                type="text"
                                placeholder="Venue Location"
                                {...register('location', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-[18px]">Camp Fees $</span>
                            </label>
                            <input
                                type="number" readOnly
                                placeholder="Camp Fees"
                                {...register('fees', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>






                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-[18px]">Scheduled Date and Time</span>
                            </label>
                            <input readOnly
                                type="datetime-local"
                                {...register('dateTime', { required: true })}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-[18px]">Rating between 1 and 5</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Rating between 1 and 5"
                                {...register('rating', {
                                    required: true,
                                    min: 1,
                                    max: 5
                                })}
                                required
                                className="input input-bordered w-full" />
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-[18px]">Feedback</span>
                            </label>
                            <input 
                                type="text"
                                placeholder="Feedback"
                                {...register('feedback', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>




                        <div className="form-control mt-6">
                            <input
                                type="submit"
                                className="btn bg-blue-600 border-none text-white font-bold text-xl"
                                value="Update Camp"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeedbackForm;