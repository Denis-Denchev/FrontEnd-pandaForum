import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  description: string;
  created_at: string;
  is_private: boolean;
  is_locked: boolean;
}

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            <Link to={`/categories/${category.name}`} className="hover:text-purple-600 dark:hover:text-purple-400">
              {category.name}
            </Link>
          </h3>
          <div className="flex space-x-1">
            {category.is_private && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                Private
              </span>
            )}
            {category.is_locked && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                Locked
              </span>
            )}
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Created: {new Date(category.created_at).toLocaleDateString()}
          </span>
          <Link to={`/categories/${category.name}`} className="text-blue-500 hover:underline">
            View Topics →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
