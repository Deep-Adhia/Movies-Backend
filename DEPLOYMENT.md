# 🚀 Backend Deployment Guide

This guide covers deploying the Movie Search Backend to various platforms.

## 📋 Prerequisites

- ✅ Backend code is ready and tested locally
- ✅ TMDb API key is available
- ✅ Git repository is set up and pushed
- ✅ Environment variables are configured

## 🚀 Railway Deployment (Recommended)

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway
```bash
railway login
```

### Step 3: Initialize Railway Project
```bash
cd MoviesApp-Backend
railway init
```

### Step 4: Set Environment Variables
```bash
railway variables set TMDB_API_KEY=your_actual_tmdb_api_key
railway variables set NODE_ENV=production
```

### Step 5: Deploy
```bash
railway up
```

### Step 6: Get Your Domain
```bash
railway domain
```

**Note:** Save this domain for frontend configuration.

## 🌐 Render Deployment

### Step 1: Connect Repository
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository

### Step 2: Configure Service
- **Name**: `movies-backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Branch**: `main`

### Step 3: Set Environment Variables
- `TMDB_API_KEY`: Your TMDb API key
- `NODE_ENV`: `production`

### Step 4: Deploy
Click "Create Web Service" and wait for deployment.

## 🦸 Heroku Deployment

### Step 1: Install Heroku CLI
Download from [devcenter.heroku.com](https://devcenter.heroku.com/articles/heroku-cli)

### Step 2: Login to Heroku
```bash
heroku login
```

### Step 3: Create App
```bash
heroku create your-movies-backend
```

### Step 4: Set Environment Variables
```bash
heroku config:set TMDB_API_KEY=your_actual_tmdb_api_key
heroku config:set NODE_ENV=production
```

### Step 5: Deploy
```bash
git push heroku main
```

## 🔧 Post-Deployment Configuration

### 1. Update CORS Origins
After getting your frontend domain, update `server.js`:

```javascript
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? [
        'https://your-frontend-domain.vercel.app', // Update this
        'https://your-frontend-domain.netlify.app'  // Update this
      ]
    : ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
```

### 2. Test Your Backend
```bash
# Test health endpoint
curl https://your-backend-domain.com/api/health

# Test TMDb proxy
curl "https://your-backend-domain.com/api/tmdb/genre/movie/list"
```

### 3. Update Frontend Configuration
In your frontend repository, update the API base URL:

```javascript
// src/services/tmdbApi.js
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://your-backend-domain.com/api'  // Update this
    : 'http://localhost:5000/api',
  timeout: 15000,
});
```

## 📊 Monitoring & Health Checks

### Health Check Endpoint
Monitor your backend at: `https://your-backend-domain.com/api/health`

### Expected Response
```json
{
  "status": "OK",
  "message": "Backend is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "production",
  "uptime": 3600
}
```

### Logs
- **Railway**: `railway logs`
- **Render**: Dashboard → Logs tab
- **Heroku**: `heroku logs --tail`

## 🚨 Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   - Ensure `package.json` has correct scripts
   - Check Node.js version compatibility
   - Verify all dependencies are in `dependencies` (not `devDependencies`)

2. **Environment Variable Issues**
   - Double-check variable names
   - Ensure no spaces around `=` in `.env` files
   - Restart service after setting variables

3. **CORS Errors**
   - Verify frontend domain is in CORS origins
   - Check `NODE_ENV` is set to `production`
   - Ensure HTTPS is used in production

4. **TMDb API Errors**
   - Verify API key is correct
   - Check API key has proper permissions
   - Monitor TMDb API status

### Debug Commands

```bash
# Check environment variables
railway variables list
# or
heroku config

# View logs
railway logs
# or
heroku logs --tail

# Test locally with production env
NODE_ENV=production npm start
```

## 🔒 Security Checklist

- ✅ TMDb API key is not exposed in frontend
- ✅ CORS origins are restricted to authorized domains
- ✅ Environment variables are properly set
- ✅ HTTPS is enforced in production
- ✅ Error messages don't leak sensitive information

## 📈 Performance Optimization

### Railway
- Uses Nixpacks for optimal builds
- Automatic scaling based on traffic
- Built-in CDN

### Render
- Global CDN
- Automatic scaling
- Health check monitoring

### Heroku
- Dyno scaling
- Add-on ecosystem
- Performance monitoring

## 🎯 Next Steps

After successful backend deployment:

1. ✅ Test all API endpoints
2. ✅ Update frontend with new backend URL
3. ✅ Deploy frontend
4. ✅ Test complete application
5. ✅ Monitor performance and errors

---

**Your backend is now production-ready! 🚀✨**
