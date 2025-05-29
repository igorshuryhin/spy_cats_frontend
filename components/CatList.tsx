'use client';
import React from 'react';
import { Cat } from '@/lib/api';

interface CatListProps {
  cats: Cat[];
  onEdit: (cat: Cat) => void;
  onDelete: (id: number) => void;
}

export default function CatList({ cats, onEdit, onDelete }: CatListProps) {
  return (
    <div className="space-y-4">
      {cats.map((cat) => (
        <div key={cat.id} className="border p-4 rounded shadow flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">{cat.name}</h3>
            <p>Breed: {cat.breed}</p>
            <p>Experience: {cat.experience} years</p>
            <p>Salary: ${cat.salary}</p>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => onEdit(cat)} className="bg-blue-500 px-3 py-1 text-white rounded">Edit Salary</button>
            <button onClick={() => onDelete(cat.id!)} className="bg-red-500 px-3 py-1 text-white rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
