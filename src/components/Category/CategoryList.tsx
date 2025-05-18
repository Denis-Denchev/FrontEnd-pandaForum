import { useEffect, useState } from 'react';
import api from '../../services/api';
import CategoryCard from './CategoryCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Category {
  id: string;
  name: string;
  description: string;
  created_at: string;
  is_private: boolean;
  is_locked: boolean;
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Check authentication first
        if (!isAuthenticated) {
          navigate('/login');
          return;
        }


        const response = await api.get('v1/category/', {
          params: {
            page: 1,
            per_page: 10,
            sort_by: 'id',
            sort_order: 'asc'
          }
        });

        // Filter private categories if needed (optional)
        const filteredCategories = response.data.filter((category: Category) => {
          if (category.is_private) {
            // Here you would check user access if needed
            return true; // Temporarily showing all, adjust as needed
          }
          return true;
        });

        setCategories(filteredCategories);
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError('Please login to view categories');
          navigate('/login');
        } else {
          setError('Failed to fetch categories');
          console.error('Error fetching categories:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <div className="text-center py-10">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Forum Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;