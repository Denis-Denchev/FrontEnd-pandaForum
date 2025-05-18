import { Link } from 'react-router-dom';
import ThemeToggle from '../Common/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';


const Header = () => {
  const { theme } = useTheme();

  return (
    <header className={`shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Alpha Panda
            </span>
            <span className="text-2xl">🐼</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className={`font-medium ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className={`font-medium ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
            >
              About
            </Link>
          </nav>

          {/* Right-side items */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link 
              to="/login" 
              className={`px-4 py-2 rounded-md font-medium ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;