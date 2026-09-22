import axios from "axios"

const API_URL = "http://localhost:3000/api/tasks";

export const getTasks = () => axios.get(API_URL)
export const createTask = (data) => axios.post(API_URL, data)
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`)
