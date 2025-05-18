import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../contexts/AuthContext';

const SettingsPage = () => {
  const { 
    user, 
    updateProfile, 
    changePassword, 
    logout 
  } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    city: user?.city || '',
    country: user?.country || '',
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // UI states
  const [profileImage, setProfileImage] = useState(user?.profile_picture || '');
  const [isLoading, setIsLoading] = useState({
    profile: false,
    password: false,
    picture: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState({
    profile: false,
    password: false
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
    setSuccess(prev => ({ ...prev, profile: false }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
    setSuccess(prev => ({ ...prev, password: false }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];

    // Check file size and type on frontend as desired

    try {
      setIsLoading((prev) => ({ ...prev, picture: true }));
      setErrors((prev) => ({ ...prev, profileImage: '' }));

      const formData = new FormData();
      formData.append('file', file); // 'file' **must match** FastAPI's parameter name

      const response = await fetch('http://127.0.0.1:8000/api/v1/user/upload-profile-picture', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          // DO NOT set Content-Type for FormData - let browser set it!
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to upload image');
      }

      const data = await response.json();
      setProfileImage(data.profile_picture_url);
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, profileImage: error.message || 'Failed to upload image' }));
    } finally {
      setIsLoading((prev) => ({ ...prev, picture: false }));
    }
  }
};


  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(prev => ({ ...prev, profile: true }));
      setErrors({ ...errors, profile: '' });
      
      await updateProfile(profileForm);
      setSuccess(prev => ({ ...prev, profile: true }));
    } catch (error) {
      setErrors({ ...errors, profile: 'Failed to update profile' });
    } finally {
      setIsLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrors({ ...errors, password: "Passwords don't match" });
      return;
    }
    
    try {
      setIsLoading(prev => ({ ...prev, password: true }));
      setErrors({ ...errors, password: '' });
      
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setSuccess(prev => ({ ...prev, password: true }));
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setErrors({ ...errors, password: 'Failed to change password' });
    } finally {
      setIsLoading(prev => ({ ...prev, password: false }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Account Settings</h1>
      
      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h2>
          
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                      onError={() => setProfileImage('')}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-3xl font-bold text-gray-500 dark:text-gray-300">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={isLoading.picture}
                >
                  {isLoading.picture ? (
                    <span className="text-white">Uploading...</span>
                  ) : (
                    <span className="text-white text-sm font-medium">Change</span>
                  )}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  disabled={isLoading.picture}
                />
              </div>
              {errors.profileImage && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.profileImage}</p>
              )}
            </div>

            {/* Profile Form */}
            <form onSubmit={handleProfileSubmit} className="flex-grow space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profileForm.username}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={profileForm.first_name}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={profileForm.last_name}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={profileForm.city}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={profileForm.country}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {errors.profile && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.profile}</p>
              )}
              {success.profile && (
                <p className="text-sm text-green-600 dark:text-green-400">Profile updated successfully!</p>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isLoading.profile}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70"
                >
                  {isLoading.profile ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Password Section */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Change Password</h2>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {errors.password && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.password}</p>
            )}
            {success.password && (
              <p className="text-sm text-green-600 dark:text-green-400">Password changed successfully!</p>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isLoading.password}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70"
              >
                {isLoading.password ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Delete Account</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Permanently delete your account and all associated data
              </p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
                  logout();
                  navigate('/');
                }
              }}
              className="mt-4 sm:mt-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;