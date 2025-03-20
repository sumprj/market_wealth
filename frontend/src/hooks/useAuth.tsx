'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const useAuth = () => {
  const [user, setUser] = useState({name: '', email: ''});
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('accessToken');

      if (!userId || !token) {
        handleUnauthorized();
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          handleUnauthorized();
        } else {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    const handleUnauthorized = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');

      router.push('/signin');
      setTimeout(() => {
        alert('Session expired. Please sign in again.');
      }, 500);
    };

    fetchUserData();
  }, [router]);

  return { user };
};
