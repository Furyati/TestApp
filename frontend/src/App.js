import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import './App.css';

function App() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStartBackend = async () => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const result = await fetch('https://testapp-production-96e1.up.railway.app/');
      if (result.ok) {
        const text = await result.text();
        setResponse(text);
      } else {
        throw new Error(`HTTP ${result.status}`);
      }
    } catch (err) {
      console.error('Błąd podczas wywoływania backendu:', err);
      setError(`Nie udało się uruchomić backendu: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          🚀 Test Aplikacji
        </Typography>

        <Typography variant="h6" color="text.secondary" paragraph>
          Nowoczesna aplikacja do testowania komunikacji z backendem
        </Typography>

        <Box sx={{ my: 4 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PlayArrow />}
            onClick={handleStartBackend}
            disabled={loading}
            sx={{
              px: 4,
              py: 2,
              fontSize: '1.1rem',
              borderRadius: 2,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1976D2 90%)',
              }
            }}
          >
            {loading ? 'Łączenie...' : 'Uruchom Backend'}
          </Button>
        </Box>

        {response && (
          <Alert
            severity="success"
            sx={{
              mt: 3,
              fontSize: '1.1rem',
              '& .MuiAlert-message': {
                width: '100%',
                textAlign: 'center'
              }
            }}
          >
            <Typography variant="h6">
              {response}
            </Typography>
          </Alert>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{
              mt: 3,
              '& .MuiAlert-message': {
                width: '100%',
                textAlign: 'center'
              }
            }}
          >
            {error}
          </Alert>
        )}
      </Paper>
    </Container>
  );
}

export default App;
