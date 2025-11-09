import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const employeeAPI = {
  // Get all students
  getAllEmployees: async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  },

  // Get student by ID
  getEmployeeById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
    }
  },

  // Add new employee
  addEmployee: async (employee) => {
    try {
      const response = await axios.post(`${API_URL}`, student);
      return response.data;
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
  },

  // Update employee
  updateEmployee: async (id, employee) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, student);
      return response.data;
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  },

  // Delete Employee
  deleteEmployee: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  }
};