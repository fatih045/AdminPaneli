import axios from 'axios';

// Base URL will need to be updated with your actual API endpoint
const API_URL = '/api/users/';

// Get all users
const getAllUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get user by id
const getUserById = async (id: string) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Create new user
const createUser = async (userData: any) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

// Update user
const updateUser = async (id: string, userData: any) => {
  const response = await axios.put(API_URL + id, userData);
  return response.data;
};

// Delete user
const deleteUser = async (id: string) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const userManagementService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userManagementService;
