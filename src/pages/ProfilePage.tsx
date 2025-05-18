import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const BACKEND_URL = "http://127.0.0.1:8000"; // You can move this to an env variable if needed

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full border-4 border-white overflow-hidden">
              {user?.profile_picture ? (
                <img
                  src={`${BACKEND_URL}${user.profile_picture}`}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-purple-300 flex items-center justify-center text-3xl font-bold">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.username}</h1>
              <p className="opacity-90">{user?.email}</p>
              <p className="text-sm opacity-75">
                Joined {user?.created_at ? new Date(user?.created_at).toLocaleDateString() : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Personal Info</h2>
            <div className="space-y-3">
              <p><span className="font-medium">Name:</span> {user?.first_name} {user?.last_name}</p>
              <p><span className="font-medium">Location:</span> {user?.city}, {user?.country}</p>
              <p><span className="font-medium">Birthday:</span> {user?.birth_date}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Activity</h2>
            <div className="space-y-3">
              <p>Last login: {user?.last_login ? new Date(user?.last_login).toLocaleString() : "N/A"}</p>
              <p>Total posts: 42</p> {/* Placeholder stat */}
              <p>Member since: {user?.created_at ? new Date(user?.created_at).toLocaleDateString() : ""}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          <Link
            to="/settings"
            className="inline-block text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
          >
            Edit Profile →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;