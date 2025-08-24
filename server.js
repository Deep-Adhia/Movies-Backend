const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// TMDb API configuration
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Proxy endpoint for TMDb API calls
app.get('/api/tmdb/*', async (req, res) => {
  try {
    const tmdbPath = req.params[0]; // Get the path after /api/tmdb/
    const queryParams = new URLSearchParams(req.query);
    queryParams.append('api_key', TMDB_API_KEY);
    
    const response = await axios.get(`${TMDB_BASE_URL}/${tmdbPath}?${queryParams}`);
    res.json(response.data);
  } catch (error) {
    console.error('TMDb API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch data from TMDb',
      details: error.response?.data || error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Movie Search Backend API',
    endpoints: {
      '/api/tmdb/*': 'Proxy for TMDb API calls',
      '/api/health': 'Health check'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`🔒 TMDb API key is protected`);
});
