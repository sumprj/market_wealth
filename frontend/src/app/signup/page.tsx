'use client';

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

// Styling for the container and form elements
const FormContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'linear-gradient(120deg, #ff7e5f, #feb47b)',  // Gradient from pink to orange
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
  color: '#4B0082',
  fontWeight: '700',
  fontSize: '2.8rem',
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
  backgroundColor: '#ff7e5f',
  color: '#fff',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#feb47b',
  },
});

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    gender: '',
    birthDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('Default');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'confirmPassword') {
      setPasswordError(''); // Reset error when typing in the confirm password field
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPasswordError('');

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          name: formData.name,
          email: formData.email,
          gender: formData.gender,
          birthDate: formData.birthDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      alert('Signup successful');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormBox>
        <Title>Sign Up</Title>

        {error && <ErrorText>{error}</ErrorText>}
        {passwordError && <ErrorText>{passwordError}</ErrorText>}

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                margin="normal"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: '#4B0082' },
                }}
                InputProps={{
                  style: { borderRadius: '25px' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: '#4B0082' },
                }}
                InputProps={{
                  style: { borderRadius: '25px' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                required
                name="username"
                value={formData.username}
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: '#4B0082' },
                }}
                InputProps={{
                  style: { borderRadius: '25px' },
                }}
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
                InputLabelProps={{
                  style: { color: '#4B0082' },
                }}
                InputProps={{
                  style: { borderRadius: '25px' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                margin="normal"
                required
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: '#4B0082' },
                }}
                InputProps={{
                  style: { borderRadius: '25px' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Gender"
                variant="outlined"
                margin="normal"
                required
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: '#4B0082' },
                }}
                InputProps={{
                  style: { borderRadius: '25px' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Birth Date"
                type="date"
                variant="outlined"
                margin="normal"
                required
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: '#4B0082' },
                }}
                InputProps={{
                  style: { borderRadius: '25px' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton type="submit" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
              </StyledButton>
            </Grid>
          </Grid>
        </form>
      </FormBox>
    </FormContainer>
  );
};

export default Signup;
