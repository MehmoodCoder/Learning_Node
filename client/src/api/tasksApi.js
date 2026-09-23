import axios from "axios";

const API_URL = "http://localhost:3000/api/tasks";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTasks = () => axios.get(API_URL, getAuthConfig());

export const createTask = (data) => axios.post(API_URL, data, getAuthConfig());

export const deleteTask = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthConfig());
