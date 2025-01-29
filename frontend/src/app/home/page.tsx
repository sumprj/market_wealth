'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Card, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/system';

// Styled components for consistent UI
const PageContainer = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(120deg, #36d1dc, #5b86e5)',
  padding: '2rem',
  boxSizing: 'border-box',
  position: 'relative',
});

const Header = styled(Typography)({
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '3rem',
  textAlign: 'center',
  marginBottom: '2rem',
});

const DataContainer = styled(Box)({
  background: '#fff',
  borderRadius: '15px',
  padding: '2rem',
  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
  marginBottom: '2rem',
});

// Styled user card
const UserCard = styled(Card)({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  minWidth: '250px',
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
});

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch('http://localhost:5000/users/1', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <PageContainer>
      <Header>Market Arpan</Header>

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      )}

      {!loading && !error && userData && (
        <>
          {/* User Card on Top-Right */}
          <UserCard>
            <Avatar sx={{ width: 56, height: 56, marginRight: '1rem', backgroundColor: '#5b86e5' }}>
              {userData.name.charAt(0)}
            </Avatar>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {userData.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {userData.email}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Salary: ₹{userData.salary}
              </Typography>
            </CardContent>
          </UserCard>
        </>
      )}
    </PageContainer>
  );
};

export default Home;
