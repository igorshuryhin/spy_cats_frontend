import axios from 'axios';

export interface Cat {
  id?: number;
  name: string;
  breed: string;
  experience: number;
  salary: number;
}

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const fetchCats = () => API.get<Cat[]>('/cats');
export const addCat = (data: Omit<Cat, 'id'>) => API.post('/cats', data);
export const updateSalary = (id: number, salary: number) => API.put(`/cats/${id}/salary`, { salary });
export const deleteCat = (id: number) => API.delete(`/cats/${id}`);
