# 🎬 Movie Search Backend

A secure Node.js backend proxy for the Movie Search App that protects your TMDb API key and provides a clean API interface.

## 🚀 Features

- **Secure Proxy**: Protects your TMDb API key from frontend exposure
- **CORS Support**: Configurable CORS for production and development
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **Health Checks**: Built-in health check endpoint for monitoring
- **Request Logging**: Detailed request logging for debugging
- **Production Ready**: Environment-based configuration

## 🛠️ Tech Stack

- **Node.js** (>=16.0.0)
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Axios** - HTTP client for TMDb API calls
- **dotenv** - Environment variable management

## 📋 Prerequisites

- Node.js (>=16.0.0)
- npm (>=8.0.0)
- TMDb API key ([Get one here](https://www.themoviedb.org/settings/api))

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/MoviesApp-Backend.git
cd MoviesApp-Backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
# Copy environment example
cp env.example .env

# Edit .env file with your actual values
nano .env
```

**Required Environment Variables:**
```bash
TMDB_API_KEY=your_actual_tmdb_api_key_here
PORT=5000
NODE_ENV=development
```

### 4. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and uptime information.

### TMDb Proxy
```
GET /api/tmdb/*
```
Proxies all TMDb API calls. Examples:
- `/api/tmdb/search/movie?query=mahesh+babu`
- `/api/tmdb/genre/movie/list`
- `/api/tmdb/movie/12345/credits`

### Root
```
GET /
```
Returns API information and available endpoints.

## 🔧 Configuration

### CORS Settings
The backend automatically configures CORS based on the environment:

- **Development**: Allows `http://localhost:3000`
- **Production**: Allows your configured frontend domains

Update the CORS origins in `server.js` after deploying your frontend.

### Environment Variables
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `TMDB_API_KEY` | Your TMDb API key | - | ✅ |
| `PORT` | Server port | 5000 | ❌ |
| `NODE_ENV` | Environment mode | development | ❌ |

## 🚀 Deployment

### Railway (Recommended)
1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Deploy: `railway up`

### Render
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Heroku
1. Install Heroku CLI
2. Create app: `heroku create your-app-name`
3. Set config: `heroku config:set TMDB_API_KEY=your_key`
4. Deploy: `git push heroku main`

## 📊 Monitoring

### Health Check
Monitor your backend health at `/api/health`

### Logs
The server logs all requests and errors for debugging.

## 🔒 Security

- **API Key Protection**: TMDb API key is never exposed to the frontend
- **CORS Configuration**: Restricts access to authorized domains
- **Input Validation**: Validates all incoming requests
- **Error Handling**: Prevents information leakage in error responses

## 🐛 Troubleshooting

### Common Issues

1. **"TMDB_API_KEY environment variable is not set"**
   - Ensure you have a `.env` file with `TMDB_API_KEY`
   - Check that the `.env` file is in the root directory

2. **CORS errors in production**
   - Update the CORS origins in `server.js` with your frontend domains
   - Ensure `NODE_ENV=production` is set

3. **TMDb API errors**
   - Verify your API key is valid
   - Check TMDb API status at [status.themoviedb.org](https://status.themoviedb.org)

### Debug Mode
Set `NODE_ENV=development` for detailed logging.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDb](https://www.themoviedb.org/) for providing the movie database API
- [Express.js](https://expressjs.com/) for the web framework
- [Railway](https://railway.app/) for deployment platform

## 📞 Support

If you encounter any issues:
1. Check the [Issues](https://github.com/yourusername/MoviesApp-Backend/issues) page
2. Create a new issue with detailed information
3. Include your environment and error logs

---

**Happy Coding! 🎬✨**
