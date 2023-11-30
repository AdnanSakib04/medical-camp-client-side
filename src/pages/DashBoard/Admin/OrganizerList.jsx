import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const OrganizerList = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://medical-camp-server-side.vercel.app/user-list`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userData === null) {
      fetchData();
    }
  }, [userData]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  const participantUsers = userData.filter(user => user.role === 'organizer');

  return (
   <div>
     <Helmet>
        <title>Care Sync | Organizer List</title>
      </Helmet>
     <div style={{ width: '100%', margin: 'auto', overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Photo</th>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th style={{ textAlign: 'left' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {participantUsers.map(user => (
            <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>
                {user.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={`User ${user.name}`}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <span>No Photo</span>
                )}
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </div>
  );
};


export default OrganizerList;