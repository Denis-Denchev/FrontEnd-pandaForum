import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

interface Topic {
  id: string;
  title: string;
  created_at: string;
}

interface CategoryWithTopics {
  id: string;
  name: string;
  description: string;
  is_private: boolean;
  is_locked: boolean;
  topics: Topic[];
}

const CategoryDetailsPage = () => {
  const { name } = useParams<{ name: string }>();
  const [category, setCategory] = useState<CategoryWithTopics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoryWithTopics = async () => {
      try {
        const response = await api.get(`v1/category/${name}`, {
          params: {
            page: 1,
            per_page: 10,
            sort_by: 'id',
            sort_order: 'asc',
          },
        });
        setCategory(response.data);
      } catch (err: any) {
        setError('Failed to load category details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (name) fetchCategoryWithTopics();
  }, [name]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!category) return <div className="text-center py-10">No category found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-600">{category.description}</p>
        {category.is_locked && (
          <p className="text-red-600 font-semibold mt-2">This category is locked.</p>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Topics</h2>
        {!category.is_locked && (
          <Link
          to={`/categories/${category.name}/create-topic`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
>
          Create Topic
</Link>

        )}
      </div>

      {category.topics.length === 0 ? (
        <p>No topics yet.</p>
      ) : (
        <ul className="space-y-4">
          {category.topics.map((topic) => (
            <li key={topic.id} className="border p-4 rounded shadow hover:shadow-md transition">
              <Link to={`/topics/${topic.id}`} className="text-xl font-medium text-blue-600 hover:underline">
                {topic.title}
              </Link>
              <p className="text-sm text-gray-500">Created at: {new Date(topic.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDetailsPage;
