'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Typography, Box, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

// Styled components for UI consistency
const FormContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'linear-gradient(120deg, #36d1dc, #5b86e5)',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  boxSizing: 'border-box',
});

const FormBox = styled(Box)({
  background: '#fff',
  padding: '3rem',
  borderRadius: '15px',
  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '500px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 18px 36px rgba(0, 0, 0, 0.15)',
  },
});

const Title = styled(Typography)({
  color: '#003366',
  fontWeight: '700',
  fontSize: '2.5rem',
  textAlign: 'center',
  marginBottom: '1.5rem',
  letterSpacing: '1px',
});

const ErrorText = styled(Typography)({
  color: '#ff6b6b',
  fontSize: '1rem',
  textAlign: 'center',
  marginBottom: '1rem',
});

const StyledButton = styled(Button)({
  marginTop: '1.5rem',
  borderRadius: '30px',
  padding: '12px 0',
  backgroundColor: '#36d1dc',
  color: '#fff',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#5b86e5',
  },
});

const Signin: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.username && !formData.email) {
      setError('Please enter either Username or Email.');
      setLoading(false);
      return;
    }

    try {
      const requestBody: any = { password: formData.password };
      if (formData.username) requestBody.username = formData.username;
      if (formData.email) requestBody.email = formData.email;

      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) throw new Error(data.message || 'Sign-in failed');

      // Store token and user ID
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('userId', data.userId);

      router.push('/home'); // Redirect to home
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormBox>
        <Title>Sign In</Title>

        {error && <ErrorText>{error}</ErrorText>}

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                name="username"
                value={formData.username}
                onChange={handleChange}
                InputLabelProps={{ style: { color: '#003366' } }}
                InputProps={{ style: { borderRadius: '25px' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email (Optional if Username is provided)"
                variant="outlined"
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleChange}
                InputLabelProps={{ style: { color: '#003366' } }}
                InputProps={{ style: { borderRadius: '25px' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                InputLabelProps={{ style: { color: '#003366' } }}
                InputProps={{ style: { borderRadius: '25px' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton type="submit" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </StyledButton>
            </Grid>
          </Grid>
        </form>
      </FormBox>
    </FormContainer>
  );
};

export default Signin;
