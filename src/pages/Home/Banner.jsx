import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Carousel showStatus={false} showThumbs={true}>
                <div className="relative">
                    <img  src={"https://i.ibb.co/vcMxKKk/camp-13.png"} alt="Camp 1" />
                    <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl md:text-5xl text-blue-600 font-medium bg-white p-2 rounded-3xl'>
                        Received recognition for outstanding healthcare outcomes
                    </p>
                </div>
                <div className="relative">
                    <img src={"https://i.ibb.co/LJXfD83/camp6.png"} alt="Camp 3" />
                    <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl md:text-5xl text-blue-600 font-medium bg-white p-2 rounded-3xl'>
                        Implemented specialized services for children in Camp
                    </p>
                </div>
                <div className="relative">
                    <img src={"https://i.ibb.co/2qbD7T2/camp-15.png"} alt="Camp Image" />
                    <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl md:text-5xl text-blue-600 font-medium bg-white p-2 rounded-3xl'>
                        Received recognition for outstanding healthcare outcomes
                    </p>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
