'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <nav className="w-full bg-blue-500 text-white py-3 px-6 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push('/home')}>
        Trading Dashboard
      </h1>

      <div className="flex space-x-6">
        <button onClick={() => router.push('/home')} className="hover:underline">Home</button>
        <button onClick={() => router.push('/manage-prices')} className="hover:underline">Manage Prices</button>
        <button onClick={() => router.push('/technicals')} className="hover:underline">Technicals</button>
      </div>

      {user ? (
        <div className="flex items-center space-x-3">
          <div className="text-sm">
            <p className="font-medium">{user.name}</p>
            <p className="text-xs opacity-80">{user.email}</p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => router.push('/signin')}
          className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-200"
        >
          Sign In
        </button>
      )}
    </nav>
  );
}
