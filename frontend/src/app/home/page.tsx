'use client';

import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/NavBar';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <Navbar />

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold">Welcome, {user.name || 'Trader'}!</h2>
        <p className="text-gray-600 mt-2">Manage your instruments, prices, and technical details here.</p>
      </div>

      <div className="mt-8 space-x-6">
        <button 
          onClick={() => router.push('/manage-prices')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Manage Prices
        </button>

        <button 
          onClick={() => router.push('/technicals')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          Technicals
        </button>
      </div>
    </div>
  );
}
