'use client';

import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';

// Styling for the container and form elements
const FormContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'linear-gradient(120deg, #ff7e5f, #feb47b)', // Gradient from pink to orange
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
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'confirmPassword') {
      setPasswordError(''); // Reset error when typing in the confirm password field
    }
    setError(''); // Reset general error when typing
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    // Check for empty fields
    for (const key in formData) {
      if (formData[key as keyof typeof formData].trim() === '') {
        setError('All fields are required.');
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch('http://localhost:5000/users/register', {
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
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit data');
      }

      alert('Signup successful');
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        gender: '',
        birthDate: '',
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
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
            {Object.keys(formData).map((field, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  fullWidth
                  label={
                    field === 'birthDate'
                      ? 'Birth Date'
                      : field === 'confirmPassword'
                        ? 'Confirm Password'
                        : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  type={field.includes('password') ? 'password' : field === 'birthDate' ? 'date' : 'text'}
                  variant="outlined"
                  margin="normal"
                  required
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { color: '#4B0082' },
                  }}
                  InputProps={{
                    style: { borderRadius: '25px' },
                  }}
                />
              </Grid>
            ))}
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
