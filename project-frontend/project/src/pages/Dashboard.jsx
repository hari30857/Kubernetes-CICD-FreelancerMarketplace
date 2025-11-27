import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedResumeUrl, setUploadedResumeUrl] = useState('');

  useEffect(() => {
    if (user?._id) {
      axios.get(`${API_URL}/applications/user/${user._id}`)
        .then(res => setApplications(res.data))
        .catch(err => console.error('Applications fetch failed:', err));

      axios.get(`${API_URL}/notifications/user/${user._id}`)
        .then(res => setNotifications(res.data))
        .catch(err => console.error('Notifications fetch failed:', err));

      axios.get(`${API_URL}/earnings/user/${user._id}`)
        .then(res => setEarnings(res.data.total))
        .catch(err => console.error('Earnings fetch failed:', err));

      axios.get(`${API_URL}/users/${user._id}/resume`)
        .then(res => setUploadedResumeUrl(res.data.resumeUrl || ''))
        .catch(err => console.error('Resume fetch failed:', err));
    }
  }, [user]);

  const handleResumeUpload = async () => {
    if (!resumeFile || !user?._id) return;

    const formData = new FormData();
    formData.append('file', resumeFile);
    formData.append('userId', user._id);

    try {
      const res = await axios.post(`${API_URL}/upload-resume`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadStatus('Resume uploaded successfully!');
      setUploadedResumeUrl(res.data.resumeUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setUploadStatus('Failed to upload resume.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Welcome</h2>
          <p className="mt-2 text-gray-600">{user?.username || 'User'}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Earnings</h2>
          <p className="mt-2 text-green-600 font-bold text-lg">₹{earnings}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Applications</h2>
          <p className="mt-2 text-blue-600 font-bold text-lg">{applications.length}</p>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
        {applications.length === 0 ? (
          <p className="text-gray-500">No applications submitted yet.</p>
        ) : (
          <ul className="space-y-2">
            {applications.slice(0, 5).map((app, index) => (
              <li key={index} className="border-b py-2">
                <span className="font-semibold">{app.jobTitle}</span> - {app.status}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Notifications */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No new notifications.</p>
        ) : (
          <ul className="space-y-2">
            {notifications.slice(0, 5).map((note, index) => (
              <li key={index} className="text-gray-700">{note.message}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Resume Upload Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResumeFile(e.target.files[0])}
          className="mb-4 block"
        />
        <button
          onClick={handleResumeUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Resume
        </button>
        {uploadStatus && <p className="mt-2 text-sm text-gray-700">{uploadStatus}</p>}
        {uploadedResumeUrl && (
          <p className="mt-2 text-sm">
            Download Resume:{" "}
            <a
              href={uploadedResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Click here
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
