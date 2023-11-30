import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Testimonial = () => {
    const [reviews, setReviews] = useState([]);
  
    useEffect(() => {
      fetch('https://medical-camp-server-side.vercel.app/feedback-and-ratings')
        .then(res => res.json())
        .then(data => setReviews(data))
    }, []);
  
    // Reverse the reviews array
    const reversedReviews = [...reviews].reverse();
  
    return (
      <div className=" mb-40 mt-40">
        <div className="max-w-7xl mx-auto bg-blue-300 rounded-3xl">
          <h1 className=" text-center text-4xl pt-10 font-bold">Testimonials</h1>
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {reversedReviews.map(review => (
              <SwiperSlide key={review._id}>
                <div className="flex flex-col items-center mx-24 my-16">
                  <Rating
                    style={{ maxWidth: 180 }}
                    value={review.rating}
                    readOnly
                  />
                  <p className="pt-5 font-medium text-2xl text-blue-700">
                    <span className=" font-bold">Feedback:</span> {review.feedback}
                  </p>
                  <p className="pt-3 pb-1 font-medium text-xl">
                    <span className=" font-bold">Camp Name:</span> {review.campName}
                  </p>
                  <p className="py-1 font-medium ">
                    <span className=" font-bold">Date:</span> {review.dateTime.split("T")[0]}
                  </p>
                  <p className="py-1 font-medium ">
                    <span className=" font-bold">Time:</span> {review.dateTime.split("T")[1]}
                  </p>
                  <h3 className="text-2xl text-blue-500 italic font-bold">Participant: {review.name}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  };
  
  export default Testimonial;