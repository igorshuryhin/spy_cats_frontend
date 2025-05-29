'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Cat } from '@/lib/api';

interface CatFormProps {
  onSubmit: (cat: Omit<Cat, 'id'>) => void;
}

export default function CatForm({ onSubmit }: CatFormProps) {
  const [form, setForm] = useState({
    name: '',
    breed: '',
    experience: '',
    salary: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newCat: Omit<Cat, 'id'> = {
      name: form.name,
      breed: form.breed,
      experience: parseInt(form.experience),
      salary: parseFloat(form.salary),
    };
    onSubmit(newCat);
    setForm({ name: '', breed: '', experience: '', salary: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border rounded placeholder-gray-600 text-gray-600"
        required
      />
      <input
        name="breed"
        value={form.breed}
        onChange={handleChange}
        placeholder="Breed"
        className="w-full p-2 border rounded placeholder-gray-600 text-gray-600"
        required
      />
      <input
        type="number"
        name="experience"
        value={form.experience}
        onChange={handleChange}
        placeholder="Experience"
        className="w-full p-2 border rounded placeholder-gray-600 text-gray-600"
        required
      />
      <input
        type="number"
        name="salary"
        value={form.salary}
        onChange={handleChange}
        placeholder="Salary"
        className="w-full p-2 border rounded placeholder-gray-600 text-gray-600"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Add Cat
      </button>
    </form>
  );
}
