const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration for production
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? [
        'https://your-frontend-domain.vercel.app', // Update this with your actual frontend domain
        'https://your-frontend-domain.netlify.app'  // Update this with your actual frontend domain
      ]
    : ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// TMDb API configuration
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Validate API key
if (!TMDB_API_KEY) {
  console.error('❌ TMDB_API_KEY environment variable is not set!');
  process.exit(1);
}

// Proxy endpoint for TMDb API calls
app.get('/api/tmdb/*', async (req, res) => {
  try {
    const tmdbPath = req.params[0]; // Get the path after /api/tmdb/
    const queryParams = new URLSearchParams(req.query);
    queryParams.append('api_key', TMDB_API_KEY);
    
    console.log(`🔍 Proxying request to TMDb: ${tmdbPath}`);
    
    const response = await axios.get(`${TMDB_BASE_URL}/${tmdbPath}?${queryParams}`, {
      timeout: 10000
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('❌ TMDb API Error:', error.response?.data || error.message);
    
    if (error.code === 'ECONNRESET') {
      res.status(503).json({
        error: 'Service temporarily unavailable',
        message: 'Connection to TMDb API was reset. Please try again.'
      });
    } else if (error.response?.status === 401) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid API key or authentication failed.'
      });
    } else if (error.response?.status === 429) {
      res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests to TMDb API. Please try again later.'
      });
    } else {
      res.status(error.response?.status || 500).json({
        error: 'Failed to fetch data from TMDb',
        details: error.response?.data || error.message
      });
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Movie Search Backend API',
    version: '1.0.0',
    environment: NODE_ENV,
    endpoints: {
      '/api/tmdb/*': 'Proxy for TMDb API calls',
      '/api/health': 'Health check'
    },
    documentation: 'This API acts as a secure proxy for TMDb API calls'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
  console.log(`🔒 TMDb API key is protected`);
  console.log(`📊 Health check available at: http://localhost:${PORT}/api/health`);
});
