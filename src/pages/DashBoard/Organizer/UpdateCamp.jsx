import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCamp = () => {
  const campData = useLoaderData();
  console.log(campData);


  const { campId } = useParams();
  //const idInt = parseInt(id);
  console.log("---", campId);
  const camp = campData.find(camp => camp._id === campId);


  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: camp?.name,
      audience: camp?.audience || 'male',
      location: camp?.location || '',
      fees: camp?.fees || '',
      description: camp?.description || '',
      specializedServices: camp?.specializedServices || '',
      healthcareProfessionals: camp?.healthcareProfessionals || '',
      dateTime: camp?.dateTime || '',
      photo: camp?.photo || '',
    },
  });

  const onSubmit = async (data) => {
    try {

      const campData = {
        name: data.name,
        photo: data.photo,

        audience: data.audience,
        location: data.location,
        description: data.description,
        fees: data.fees,
        dateTime: data.dateTime,
        specializedServices: data.specializedServices,
        healthcareProfessionals: data.healthcareProfessionals,
      };
      console.log(campData);


      fetch(`https://medical-camp-server-side.vercel.app/update-camp/${campId}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(campData)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.modifiedCount > 0) {
            Swal.fire({
              title: 'Success!',
              text: 'Camp Updated Successfully',
              icon: 'success',
              confirmButtonText: 'OK'
            })
          }
        })

    }
    catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Care Sync | Update Camp</title>
      </Helmet>
      <div className="max-w-7xl mx-auto mb-40">
        <div className="p-4 mt-8 rounded-3xl">
          <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 mx-auto card-body bg-blue-300 rounded-3xl">
            <h1 className="text-4xl font-bold lg:text-5xl mt-8 text-center">Update Camp</h1>

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
                <span className="label-text font-medium text-[18px]">Camp Fees $</span>
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

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-[18px]">Photo</span>
              </label>
              <input
                placeholder="photo"
                {...register('photo', { required: true })}
                required
                className="input input-bordered w-full"
              />
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

export default UpdateCamp;