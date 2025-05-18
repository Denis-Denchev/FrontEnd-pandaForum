import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreateTopicPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [is_locked, setIsLocked] = useState(false);
  const [is_private, setIsPrivate] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !id) {
      setError('Title and category ID are required.');
      return;
    }

    try {
      const response = await api.post('v1/topic/create', {
        title,
        parent_category_id: id,
        is_locked,
        is_private,
      });

      if (response.data) {
        navigate(`/categories/${id}`);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to create topic. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">
        Create New Topic
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Topic Title"
          className="w-full border p-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={is_locked}
              onChange={(e) => setIsLocked(e.target.checked)}
            />
            <span>Locked</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={is_private}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
            <span>Private</span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Create Topic
        </button>
      </form>
    </div>
  );
};

export default CreateTopicPage;
