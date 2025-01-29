'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Card, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import Chart from '../components/Chart'; // Import Chart component

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

  // Sample data for the chart
  const sampleData = [
    { time: new Date('2024-04-19').getTime() / 1000, open: 21861.5, high: 22179.55, low: 21777.65, close: 22147 },
    { time: new Date('2024-04-22').getTime() / 1000, open: 22336.9, high: 22375.65, low: 22198.15, close: 22336.4 },
    { time: new Date('2024-04-23').getTime() / 1000, open: 22447.05, high: 22447.55, low: 22349.45, close: 22368 },
    { time: new Date('2024-04-24').getTime() / 1000, open: 22421.55, high: 22476.45, low: 22384, close: 22402.4 },
    { time: new Date('2024-04-25').getTime() / 1000, open: 22316.9, high: 22625.95, low: 22305.25, close: 22570.35 },
    { time: new Date('2024-04-26').getTime() / 1000, open: 22620.4, high: 22620.4, low: 22385.55, close: 22419.95 },
    { time: new Date('2024-04-29').getTime() / 1000, open: 22475.55, high: 22655.8, low: 22441.9, close: 22643.4 },
    { time: new Date('2024-04-30').getTime() / 1000, open: 22679.65, high: 22783.35, low: 22568.4, close: 22604.85 },
    { time: new Date('2024-05-02').getTime() / 1000, open: 22567.85, high: 22710.5, low: 22567.85, close: 22648.2 },
    { time: new Date('2024-05-03').getTime() / 1000, open: 22766.35, high: 22794.7, low: 22348.05, close: 22475.85 },
    { time: new Date('2024-05-06').getTime() / 1000, open: 22561.6, high: 22588.8, low: 22409.45, close: 22442.7 },
    { time: new Date('2024-05-07').getTime() / 1000, open: 22489.75, high: 22499.05, low: 22232.05, close: 22302.5 },
    { time: new Date('2024-05-08').getTime() / 1000, open: 22231.2, high: 22368.65, low: 22185.2, close: 22302.5 },
    { time: new Date('2024-05-09').getTime() / 1000, open: 22224.8, high: 22307.75, low: 21932.4, close: 21957.5 },
    { time: new Date('2024-05-10').getTime() / 1000, open: 21990.95, high: 22131.3, low: 21950.3, close: 22055.2 },
    { time: new Date('2024-05-13').getTime() / 1000, open: 22027.95, high: 22131.65, low: 21821.05, close: 22104.05 },
    { time: new Date('2024-05-14').getTime() / 1000, open: 22112.9, high: 22270.05, low: 22081.25, close: 22217.85 },
    { time: new Date('2024-05-15').getTime() / 1000, open: 22255.6, high: 22297.55, low: 22151.75, close: 22200.55 },
    { time: new Date('2024-05-16').getTime() / 1000, open: 22319.2, high: 22432.25, low: 22054.55, close: 22403.85 },
    { time: new Date('2024-05-17').getTime() / 1000, open: 22415.25, high: 22502.15, low: 22345.65, close: 22466.1 },
    { time: new Date('2024-05-18').getTime() / 1000, open: 22512.85, high: 22520.25, low: 22470.05, close: 22502 },
    { time: new Date('2024-05-21').getTime() / 1000, open: 22404.55, high: 22591.1, low: 22404.55, close: 22529.05 },
    { time: new Date('2024-05-22').getTime() / 1000, open: 22576.6, high: 22629.5, low: 22483.15, close: 22597.8 },
    { time: new Date('2024-05-23').getTime() / 1000, open: 22614.1, high: 22993.6, low: 22577.45, close: 22967.65 },
    { time: new Date('2024-05-24').getTime() / 1000, open: 22930.75, high: 23026.4, low: 22908, close: 22957.1 },
    { time: new Date('2024-05-27').getTime() / 1000, open: 23038.95, high: 23110.8, low: 22871.2, close: 22932.45 },
    { time: new Date('2024-05-28').getTime() / 1000, open: 22977.15, high: 22998.55, low: 22858.5, close: 22888.15 },
    { time: new Date('2024-05-29').getTime() / 1000, open: 22762.75, high: 22825.5, low: 22685.45, close: 22704.7 },
    { time: new Date('2024-05-30').getTime() / 1000, open: 22617.45, high: 22705.75, low: 22417, close: 22488.65 },
    { time: new Date('2024-05-31').getTime() / 1000, open: 22568.1, high: 22653.75, low: 22465.1, close: 22530.7 },
    { time: new Date('2024-06-03').getTime() / 1000, open: 23337.9, high: 23338.7, low: 23062.3, close: 23263.9 },
    { time: new Date('2024-06-04').getTime() / 1000, open: 23179.5, high: 23179.5, low: 21281.45, close: 21884.5 },
    { time: new Date('2024-06-05').getTime() / 1000, open: 22128.35, high: 22670.4, low: 21791.95, close: 22620.35 },
    { time: new Date('2024-06-06').getTime() / 1000, open: 22798.6, high: 22910.15, low: 22642.6, close: 22821.4 },
    { time: new Date('2024-06-07').getTime() / 1000, open: 22821.85, high: 23320.2, low: 22789.05, close: 23290.15 },
    // More data can be added following the same format...
  ];
  

  const supportLevels = [22600, 22700, 23200];
  const resistanceLevels = [22500, 22300, 22000];

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
            </CardContent>
          </UserCard>

          {/* Chart component */}
          <DataContainer>
            <Chart data={sampleData} supportLevels={supportLevels} resistanceLevels={resistanceLevels} />
          </DataContainer>
        </>
      )}
    </PageContainer>
  );
};

export default Home;
