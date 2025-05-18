import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import PublicLayout from './components/layouts/PublicLayout';
import ProtectedLayout from './components/layouts/ProtectedLayout';

// Auth
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';

// Pages
import HomePage from './components/Home/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CreateTopicPage from './pages/CreateTopicPage';
import TopicDetailsPage from './pages/TopicDetailsPage';
import CreateReplyPage from './pages/CreateReplyPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Guidelines from './pages/Guidelines';

// Admin / Extra
import CategoryList from './components/Category/CategoryList';
import CategoryDetailsPage from './pages/CategoryDetailsPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
  {/* Public routes */}
  <Route element={<PublicLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/register" element={<RegisterForm />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/about" element={<About />} />
    <Route path="/guidelines" element={<Guidelines />} />
    <Route path="/categories" element={<CategoriesPage />} />
    <Route path="/topics/:id" element={<TopicDetailsPage />} />
    <Route path="/categories/:name" element={<CategoryDetailsPage />} /> {/* Moved here */}
  </Route>

  {/* Protected routes */}
  <Route element={<ProtectedLayout />}>
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/settings" element={<SettingsPage />} />
    <Route path="/categories-list" element={<CategoryList />} />
    <Route path="/categories/:id/create-topic" element={<CreateTopicPage />} />
    <Route path="/topics/:id/reply" element={<CreateReplyPage />} />
    <Route path="/categories/:name" element={<CategoryDetailsPage />} /> {/* Duplicated here */}
  </Route>
</Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
