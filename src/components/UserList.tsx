import React, { useState } from 'react';
import axios from 'axios';

type User = {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  city: string;
  country: string;
  birth_date: string;
  created_at: string;
  sex: 'MALE' | 'FEMALE';
  role: 'ADMIN' | 'REGULAR';
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);

  const toggleUsers = () => {
    if (!fetched) {
      setLoading(true);
      axios.get<User[]>('http://127.0.0.1:8000/api/v1/user/all')
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
          setFetched(true);
          setVisible(true);
        })
        .catch((err) => {
          setError('Failed to fetch users');
          setLoading(false);
        });
    } else {
      setVisible(!visible); // toggle visibility if already fetched
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={toggleUsers}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {loading ? 'Loading...' : visible ? 'Hide Users' : 'Show Users'}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {visible && users.length > 0 && (
        <div className="overflow-x-auto">
          <h1 className="text-2xl font-bold mb-4">User List</h1>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Birth Date</th>
                <th className="p-2 border">Sex</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="p-2 border">{user.username}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.first_name} {user.last_name}</td>
                  <td className="p-2 border">{user.city}, {user.country}</td>
                  <td className="p-2 border">{new Date(user.birth_date).toLocaleDateString()}</td>
                  <td className="p-2 border">{user.sex}</td>
                  <td className="p-2 border">{user.role}</td>
                  <td className="p-2 border">{new Date(user.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
