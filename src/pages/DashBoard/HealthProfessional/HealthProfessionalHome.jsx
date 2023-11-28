import { useContext, useEffect, useState} from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const HealthProfessionalHome = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {

    fetch(`http://localhost:5000/get-user-data?email=${user.email}`)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userData]); 

  const handleUpdateProfile = event => {
      event.preventDefault();

      const form = event.target;
      const name = form.name.value;
      const phone = form.phone.value;
      const specialty = form.specialty.value;
      const certifications = form.certifications.value;
      const email = form.email.value;

      const updatedProfile = { name, phone, specialty, certifications, email }

      console.log(updatedProfile);

      fetch(`http://localhost:5000/update-healthcare-profile/${email}`, {
          method: 'PUT',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(updatedProfile)
      })
          .then(res => res.json())
          .then(data => {
              console.log(data);
              if (data.modifiedCount > 0) {
                  Swal.fire({
                      title: 'Success!',
                      text: 'Profile Updated Successfully',
                      icon: 'success',
                      confirmButtonText: 'OK'
                  })
              }
          })
  }

  

  return (
    <div>
      <div>
        <h1 className="text-3xl">Name: {userData?.name}</h1>
        <h1 className="text-3xl">Medical Specialty: {userData?.specialty}</h1>
        <h1 className="text-3xl">Certifications: {userData?.certifications}</h1>
        <h1 className="text-3xl">Phone: {userData?.phone}</h1>
      </div>

      <div className='max-w-7xl mx-auto mb-40'>

            <div className="  p-4 mt-8 rounded-3xl ">

                <form onSubmit={handleUpdateProfile} className="md:w-1/2 mx-auto card-body bg-blue-300 rounded-3xl">
                    <h1 className="text-4xl font-bold lg:text-5xl mt-8 text-center ">Update Profile</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-[18px] ">Email</span>
                        </label>
                        <input type="email" defaultValue={userData?.email} name="email" readOnly placeholder="Email" className="input input-bordered " required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-[18px] ">Name</span>
                        </label>
                        <input type="text" defaultValue={userData?.name} name="name" placeholder="Name" className="input input-bordered " required />
                    </div>
                


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-[18px] ">Specialty</span>
                        </label>
                        <input type="text" defaultValue={userData?.specialty} placeholder="Specialty" name="specialty" className="input input-bordered " required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-[18px] ">Certifications</span>
                        </label>
                        <input type="text" defaultValue={userData?.certifications} placeholder="Certifications" name="certifications" className="input input-bordered " required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-[18px] ">Phone</span>
                        </label>
                        <input type="text" defaultValue={userData?.phone} placeholder="Phone" name="phone" className="input input-bordered " required />
                    </div>



                    <div className="form-control mt-6">
                        <input type="submit" className="btn bg-blue-600 text-white border-none font-bold text-xl " value="Update Profile" />
                    </div>


                </form >

            </div >
        </div >
      </div>
  );
};

export default HealthProfessionalHome;
