import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { AuthContext } from '../../../providers/AuthProvider';
// import useAxiosSecure from '../hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCamp = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  // const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      // Image upload to imgbb and then get a URL
      const imageFile = new FormData();
      imageFile.append('image', data.image[0]);

      const res = await axiosPublic.post(image_hosting_api, imageFile);

      if (res.data.success) {
        // Now send the camp data to the server with the image URL
        const campData = {
          name: data.name,
          photo: res.data.data.display_url,
          audience: data.audience,
          location: data.location,
          description: data.description,
          fees: data.fees,
          dateTime: data.dateTime,
          specializedServices: data.specializedServices,
          healthcareProfessionals: data.healthcareProfessionals

        };
        console.log(campData);

        const campRes = await axiosPublic.post('/add-camp-endpoint', campData);

        if (campRes.data.insertedId) {
          // Show success popup
          reset();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${data.name} is added to the camp.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
    catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mb-40">
      <div className="p-4 mt-8 rounded-3xl">
        <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 mx-auto card-body bg-blue-300 rounded-3xl">
          <h1 className="text-4xl font-bold lg:text-5xl mt-8 text-center">Add A Camp</h1>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-[18px]">Camp Name</span>
            </label>
            <input
              type="text"
              placeholder="Camp Name"
              {...register('name', { required: true })}
              required
              className="input input-bordered w-full" />
          </div>



          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-[18px]">Target Audience</span>
            </label>
            <select
              className="input input-bordered"
              {...register('audience', { required: true })}            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="children">Children</option>
              <option value="everyone">Everyone</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-[18px]">Venue Location</span>
            </label>
            <input
              type="text"
              placeholder="Venue Location"
              {...register('location', { required: true })}
              required
              className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-[18px]">Camp Fees</span>
            </label>
            <input
              type="number"
              placeholder="Camp Fees"
              {...register('fees', { required: true })}
              required
              className="input input-bordered w-full" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-[18px]">Description</span>
            </label>
            <input
              type="text"
              placeholder="Description"
              {...register('description', { required: true })}
              required
              className="input input-bordered w-full" />

          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-[18px]">Specialized Services Provided</span>
            </label>
            <input
              placeholder="Specialized Services Provided"
              {...register('specializedServices', { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-[18px]">Healthcare Professionals in
                Attendance</span>
            </label>
            <input
              placeholder="Healthcare Professionals in Attendance"
              {...register('healthcareProfessionals', { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-[18px]">Scheduled Date and Time</span>
            </label>
            <input
              type="datetime-local"
              {...register('dateTime', { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control ">
            <label className="label">
              <span className="label-text font-medium text-[18px]">Picture</span>
            </label>
            <input
              {...register('image', { required: 'Image is required' })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn bg-blue-600 border-none text-white font-bold text-xl"
              value="Add Camp"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCamp;
