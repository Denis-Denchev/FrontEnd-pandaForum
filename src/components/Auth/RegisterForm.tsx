import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    city: '',
    country: '',
    birth_date: '',
    sex: 'MALE' as 'MALE' | 'FEMALE',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const formattedData = {
      ...userData,
      birth_date: new Date(userData.birth_date).toISOString(), // convert to ISO format
    };
    await register(formattedData);
    navigate('/login'); // or wherever you want to send them after register
  } catch (err) {
    setError('Registration failed. Please try again.');
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Register</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 dark:text-gray-200 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-gray-700 dark:text-gray-200 mb-2">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              value={userData.first_name}
              onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-gray-700 dark:text-gray-200 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              value={userData.last_name}
              onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 dark:text-gray-200 mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              value={userData.city}
              onChange={(e) => setUserData({ ...userData, city: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 dark:text-gray-200 mb-2">
              Country
            </label>
            <input
              type="text"
              id="country"
              value={userData.country}
              onChange={(e) => setUserData({ ...userData, country: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="birth_date" className="block text-gray-700 dark:text-gray-200 mb-2">
            Birth Date
          </label>
          <input
            type="date"
            id="birth_date"
            value={userData.birth_date}
            onChange={(e) => setUserData({ ...userData, birth_date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-200 mb-2">Gender</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="text-purple-600"
                name="sex"
                checked={userData.sex === 'MALE'}
                onChange={() => setUserData({ ...userData, sex: 'MALE' })}
              />
              <span className="ml-2 dark:text-gray-200">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="text-purple-600"
                name="sex"
                checked={userData.sex === 'FEMALE'}
                onChange={() => setUserData({ ...userData, sex: 'FEMALE' })}
              />
              <span className="ml-2 dark:text-gray-200">Female</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;