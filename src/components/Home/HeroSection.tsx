import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const HeroSection = () => {
  const { theme } = useTheme();

  return (
    <section
      className={`relative overflow-hidden py-24 px-6 transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-purple-800 to-pink-800'
          : 'bg-gradient-to-r from-purple-500 to-pink-500'
      } text-white`}
    >
      {/* Decorative blurred circle background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-20 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />
        <div className="absolute -bottom-10 -right-20 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-4xl mx-auto text-center z-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-md">
          Welcome to Alpha Panda Forum 🐼
        </h1>
        <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto">
          Join our community to discuss topics, share knowledge, and connect with fellow pandas!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-purple-700 hover:bg-gray-100 font-semibold py-3 px-6 rounded-full text-lg transition-all duration-300 shadow-lg hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            to="/categories"
            className="bg-white/10 hover:bg-white/20 border border-white text-white font-semibold py-3 px-6 rounded-full text-lg transition-all duration-300 shadow-md hover:scale-105"
          >
            Browse Categories
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
