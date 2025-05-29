import axiosInstance from './baseService';

// Login user (admin)
const login = async (userData: any) => {
  const response = await axiosInstance.post('api/Admin/LoginAdmin', userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    if (response.data.jwtToken) {
      localStorage.setItem('token', response.data.jwtToken);
    }
  }
  
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Get current user
const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  
  return null;
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
