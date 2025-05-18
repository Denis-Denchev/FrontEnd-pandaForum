import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const features = [
  {
    icon: '💬',
    title: 'Engaging Discussions',
    desc: 'Join conversations with like-minded people',
  },
  {
    icon: '🔒',
    title: 'Safe Space',
    desc: 'Moderated environment for healthy debates',
  },
  {
    icon: '🎯',
    title: 'Specialized Topics',
    desc: 'Find communities for your specific interests',
  },
];

const HomePage = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-purple-100'}`}>
      
      {/* Hero Section */}
      <section className="py-24 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Welcome to Alpha Panda Forum 🐼
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Connect, discuss, and grow with people who share your passion.
        </motion.p>

        <motion.div
          className="flex justify-center gap-6 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            to="/register"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          >
            Join Now
          </Link>
          <Link
            to="/categories"
            className="bg-white dark:bg-gray-900 dark:text-purple-300 text-purple-600 border-2 border-purple-600 font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 shadow-md"
          >
            Browse Topics
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-14">
          Why Join Our Community?
        </h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="bg-white dark:bg-gray-900/50 backdrop-blur-md bg-opacity-60 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
