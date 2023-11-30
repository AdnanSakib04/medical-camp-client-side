import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const HealthProfessionalHome = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/get-healthcareProfessional-data?email=${user.email}`)
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
    const address = form.address.value;
    const email = form.email.value;

    const updatedProfile = { name, phone, specialty, certifications, email, address };

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
            position: 'top-end',
            icon: 'success',
            title: 'Profile Updated successfully.',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  };

  const openModal = () => {
    const modal = document.getElementById('my_modal_1');
    if (modal) {
      modal.showModal();
    }
  };

  const closeAndResetModal = () => {
    const modal = document.getElementById('my_modal_1');
    if (modal) {
      modal.close();
    }
    // Reset form or any other cleanup needed
  };

  return (
    <div>
      <Helmet>
        <title>Care Sync | Profile</title>
      </Helmet>
      <div className=" max-w-lg mx-auto ">
        <div className="space-y-2 border-blue-600 border-2 p-3 rounded-3xl">
          <h1 className="text-xl lg:text-4xl"><span className="text-blue-600 font-medium">Name:</span> {userData?.name}</h1>
          <h1 className="text-xl lg:text-4xl"><span className="text-blue-600 font-medium">Email:</span> {userData?.email}</h1>
          <h1 className="text-xl lg:text-4xl"><span className="text-blue-600 font-medium">Medical Specialty: </span>{userData?.specialty}</h1>
          <h1 className="text-xl lg:text-4xl"><span className="text-blue-600 font-medium">Certifications:</span> {userData?.certifications}</h1>
          <h1 className="text-xl lg:text-4xl"><span className="text-blue-600 font-medium">Phone:</span> {userData?.phone}</h1>
          <h1 className="text-xl lg:text-4xl"><span className="text-blue-600 font-medium">Address:</span> {userData?.address}</h1>
        </div>

        <div className='max-w-7xl mx-auto mb-40'>
          <div className="p-4 mt-8 rounded-3xl">
            <button className="btn bg-blue-600 text-white font-medium" onClick={openModal}>Update Profile</button>

            <dialog id="my_modal_1" className="modal ">
              <div className="modal-box bg-blue-300">
                <form onSubmit={handleUpdateProfile}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-[18px]">Email</span>
                    </label>
                    <input type="email" defaultValue={userData?.email} name="email" readOnly placeholder="Email" className="input input-bordered" required />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-[18px]">Name</span>
                    </label>
                    <input readOnly type="text" defaultValue={userData?.name} name="name" placeholder="Name" className="input input-bordered" required />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-[18px]">Specialty</span>
                    </label>
                    <input type="text" defaultValue={userData?.specialty} placeholder="Specialty" name="specialty" className="input input-bordered" required />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-[18px]">Certifications</span>
                    </label>
                    <input type="text" defaultValue={userData?.certifications} placeholder="Certifications" name="certifications" className="input input-bordered" required />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-[18px]">Phone</span>
                    </label>
                    <input type="text" defaultValue={userData?.phone} placeholder="Phone" name="phone" className="input input-bordered" required />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-[18px]">Address</span>
                    </label>
                    <input type="text" defaultValue={userData?.address} placeholder="address" name="address" className="input input-bordered" required />
                  </div>

                  <div className="form-control mt-6">
                    <input type="submit" className="btn bg-blue-600 text-white border-none font-bold text-xl" value="Update Profile" />
                  </div>
                </form>
                <div className="flex justify-center">
                  <button className="btn mt-3 bg-red-300 font-medium border-none" onClick={closeAndResetModal}>Close</button>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthProfessionalHome;
