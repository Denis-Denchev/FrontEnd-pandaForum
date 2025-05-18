import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import {
  login as loginService,
  logout as logoutService,
  getCurrentUser,
  register as registerService,
} from '../services/auth';

interface RegisterData {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  city: string;
  country: string;
  birth_date: string; // should be ISO string
  sex: 'MALE' | 'FEMALE';
}

interface UserProfile {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  profile_picture?: string;
  city?: string;
  country?: string;
  birth_date?: string;
  sex?: 'MALE' | 'FEMALE';
}

interface AuthContextType {
  user: any;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    const data = await loginService(credentials);
    localStorage.setItem('access_token', data.access_token);
    const userData = await getCurrentUser();
    setUser(userData);
  };

  const logout = () => {
    logoutService();
    setUser(null);
    localStorage.removeItem('access_token');
  };

  const register = async (data: RegisterData) => {
    await registerService(data);
  };

  const updateProfile = async (profileData: any) => {
  try {
    const formData = new FormData();
    if (profileData instanceof File) {
      formData.append('file', profileData);
    } else if (profileData.profilePicture instanceof File) {
      formData.append('file', profileData.profilePicture);
    } else {
      throw new Error('No file provided');
    }

    const response = await fetch('http://127.0.0.1:8000/api/v1/user/upload-profile-picture', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Upload failed');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Profile update error:', error);
    throw new Error(error.message || 'Upload failed');
  }
};




const changePassword = async (currentPassword: string, newPassword: string) => {
  try {
    setLoading(true);
    const response = await fetch(`/api/v1/user/change-password/${user.username}?old_password=${currentPassword}&new_password=${newPassword}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify({
        old_password: currentPassword,
        new_password: newPassword
      })
    });

    if (!response.ok) throw new Error('Password change failed');

    const userData = await getCurrentUser();
    setUser(userData);
  } catch (error) {
    console.error('Password change error:', error);
    throw error;
  } finally {
    setLoading(false);
  }
};
  const uploadProfilePicture = async (file: File) => {
  try {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://127.0.0.1:8000/api/v1/user/upload-profile-picture', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Upload failed');
    }

    const data = await response.json();
    
    // Fetch updated user info!
    const updatedUser = await getCurrentUser();
    setUser(updatedUser);

    // You can return the new profile picture URL if you want
    return data.profile_picture_url;
  } catch (error) {
    console.error('Profile picture upload error:', error);
    throw error;
  } finally {
    setLoading(false);
  }
};



  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        loading,
        updateProfile,
        changePassword,
        uploadProfilePicture
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;