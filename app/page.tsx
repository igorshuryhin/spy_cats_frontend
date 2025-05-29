'use client';

import { useEffect, useState } from 'react';
import { fetchCats, addCat, deleteCat, updateSalary, Cat } from '@/lib/api';
import CatList from '@/components/CatList';
import CatForm from '@/components/CatForm';

export default function Home() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [error, setError] = useState<string>('');

  const loadCats = async () => {
    try {
      const { data } = await fetchCats();
      setCats(data);
    } catch {
      setError('Failed to fetch cats.');
    }
  };

  const handleAdd = async (cat: Omit<Cat, 'id'>) => {
  try {
    await addCat(cat);
    loadCats();
  } catch (e: unknown) {
    if (typeof e === 'object' && e !== null && 'response' in e) {
      const err = e as { response?: { data?: { message?: string } } };
      setError(err.response?.data?.message || 'Failed to add cat.');
    } else {
      setError('Failed to add cat.');
    }
  }
};


  const handleEdit = async (cat: Cat) => {
    const newSalary = prompt('Enter new salary', cat.salary.toString());
    if (newSalary) {
      try {
        await updateSalary(cat.id!, parseFloat(newSalary));
        loadCats();
      } catch {
        setError('Failed to update salary.');
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCat(id);
      loadCats();
    } catch {
      setError('Failed to delete cat.');
    }
  };

  useEffect(() => {
    loadCats();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Spy Cat Management</h1>
      {error && <div className="text-red-500">{error}</div>}
      <CatForm onSubmit={handleAdd} />
      <hr className="my-6" />
      <CatList cats={cats} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
}
