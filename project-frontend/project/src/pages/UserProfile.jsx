// src/pages/UserProfile.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api`;
function UserProfile() {
  const { id } = useParams(); // user ID from the URL
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Replace this URL with your actual backend endpoint
    axios.get(`${API_URL}/users/${id}`)
      .then(res => setUserData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!userData) return <div>Loading profile...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
      <p className="text-gray-700">{userData.role}</p>
      <p className="mt-2">{userData.bio}</p>
      <div className="mt-4">
        <h3 className="font-semibold">Skills:</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          {userData.skills?.map((skill, idx) => (
            <span key={idx} className="bg-gray-200 px-2 py-1 rounded">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
