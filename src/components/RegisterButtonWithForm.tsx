import React, { useState } from 'react';
import RegisterForm from './Auth/RegisterForm';

const RegisterButtonWithForm: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm((prev) => !prev);

  return (
    <div className="text-center mt-10">
      <button
        onClick={toggleForm}
        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300"
      >
        {showForm ? 'Hide Register Form' : 'Register'}
      </button>

      {showForm && (
        <div className="mt-8 animate-fade-in-down">
          <RegisterForm />
        </div>
      )}
    </div>
  );
};

export default RegisterButtonWithForm;
