# Deployment Guide - MyReadShelf

This guide will help you deploy your MyReadShelf application to production. Since this is a full-stack application with a React frontend, Node.js/Express backend, and MongoDB database, you'll need to deploy each component separately.

## Prerequisites

- GitHub account (for version control)
- MongoDB Atlas account (free tier available)
- Accounts on chosen hosting platforms

## Architecture Overview

```
Frontend (React) → Backend API (Node/Express) → MongoDB Database
```

## Option 1: Recommended - Free Tier Deployment

### Step 1: Deploy MongoDB Database (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier: M0 Sandbox)
4. Create a database user with username and password
5. Whitelist IP addresses (set to 0.0.0.0/0 for development, or specific IPs for production)
6. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

**Your connection string will look like:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/myreadshelf?retryWrites=true&w=majority
```

### Step 2: Deploy Backend (Render.com - Free)

1. Go to [Render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository (push your code first)
4. Configure the service:
   - **Name**: myreadshelf-backend
   - **Region**: Choose nearest region
   - **Branch**: main
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add Environment Variables:
   - `PORT`: 5000
   - `MONGODB_URI`: Your MongoDB Atlas connection string
6. Click "Create Web Service"
7. Wait for deployment (2-3 minutes)
8. Copy your backend URL (e.g., `https://myreadshelf-backend.onrender.com`)

### Step 3: Deploy Frontend (Vercel - Free)

1. Go to [Vercel.com](https://vercel.com) and sign up
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: build
5. Add Environment Variables:
   - `REACT_APP_API_URL`: Your backend URL from Step 2
6. Click "Deploy"
7. Wait for deployment (1-2 minutes)
8. Your frontend will be live at `https://your-project.vercel.app`

### Step 4: Update Frontend API URL

After deploying, you need to update the frontend to use the production API URL:

**Option A: Using Environment Variables (Recommended)**

1. In Vercel dashboard, add environment variable:
   - `REACT_APP_API_URL`: `https://your-backend-url.onrender.com`

2. Update `frontend/src/App.js` to use the environment variable:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Replace all 'http://localhost:5000' with API_URL
// Example:
const response = await axios.get(`${API_URL}/api/books`);
```

**Option B: Hardcode the URL (Quick Fix)**

Update all API calls in `frontend/src/App.js`:
```javascript
// Change from:
await axios.get('http://localhost:5000/api/books');

// To:
await axios.get('https://your-backend-url.onrender.com/api/books');
```

## Option 2: Alternative Deployment Platforms

### Frontend Alternatives

**Netlify**
- Free tier available
- Automatic deployments from Git
- Easy to use
- Deploy: Connect GitHub → Select frontend folder → Deploy

**GitHub Pages**
- Free hosting
- Static site only
- Requires build configuration
- Good for simple React apps

### Backend Alternatives

**Heroku**
- Free tier (with sleep after 30 min inactivity)
- Easy deployment
- Good for Node.js apps
- Deploy: `heroku create`, `git push heroku main`

**Railway**
- Free tier available
- Simple deployment
- Good for full-stack apps
- Deploy: Connect GitHub → Auto-deploy

**Fly.io**
- Free tier available
- Global deployment
- Fast performance
- Deploy: `fly launch`, `fly deploy`

## Option 3: Single Platform Deployment (Render)

Render can host both frontend and backend:

1. Deploy backend as Web Service (as in Step 2 above)
2. Deploy frontend as Static Site:
   - Click "New +" → "Static Site"
   - Root directory: frontend/build
   - Or connect Git and set build command

## Environment Variables Configuration

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myreadshelf
```

### Frontend (.env.production)
Create `frontend/.env.production`:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## Pre-Deployment Checklist

- [ ] Push code to GitHub
- [ ] Set up MongoDB Atlas database
- [ ] Test backend locally with MongoDB Atlas
- [ ] Build frontend locally: `npm run build`
- [ ] Update API URLs in frontend code
- [ ] Add all environment variables
- [ ] Test deployed backend API
- [ ] Test deployed frontend
- [ ] Verify database connection
- [ ] Check CORS settings

## Post-Deployment Steps

1. **Test the application**
   - Add a new book
   - Edit a book
   - Delete a book
   - Search functionality
   - Dark/light mode toggle

2. **Monitor logs**
   - Check Render logs for backend errors
   - Check Vercel logs for frontend errors

3. **Set up monitoring** (optional)
   - Use Render's built-in monitoring
   - Set up error tracking (Sentry, etc.)

## Troubleshooting

### Backend Issues

**MongoDB Connection Error**
- Verify MongoDB Atlas connection string
- Check IP whitelist in Atlas
- Ensure database user has correct permissions
- Check if cluster is running

**CORS Error**
- Ensure backend has CORS enabled
- Check that frontend URL is allowed
- Verify environment variables are set

### Frontend Issues

**API Not Responding**
- Check backend URL is correct
- Verify backend is running
- Check browser console for errors
- Ensure environment variables are set

**Build Errors**
- Clear cache: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`
- Check for missing dependencies

## Cost Summary (Free Tiers)

- **MongoDB Atlas**: Free (512MB storage)
- **Render Backend**: Free (with sleep after 15 min inactivity)
- **Vercel Frontend**: Free (unlimited bandwidth)
- **Total**: $0/month

## Paid Upgrade Options

If you need better performance:

- **Render**: $7/month (no sleep, faster)
- **MongoDB Atlas**: $9/month (more storage)
- **Vercel**: $20/month (faster builds, more features)

## Security Best Practices

1. Never commit `.env` files to Git
2. Use strong passwords for database
3. Enable HTTPS (automatic on most platforms)
4. Implement rate limiting on API
5. Add authentication for production
6. Regularly update dependencies

## Support

For issues:
- Check platform documentation
- Review deployment logs
- Test locally first
- Check environment variables

## Quick Start Deployment Commands

```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Deploy backend on Render
# Follow Render.com UI steps

# 3. Deploy frontend on Vercel
# Follow Vercel.com UI steps

# 4. Update API URLs
# Edit frontend/src/App.js with production URLs
```

## Next Steps

After successful deployment:
1. Share your website URL
2. Add more features (authentication, user profiles)
3. Improve UI/UX
4. Add analytics
5. Set up custom domain (optional)

Congratulations! Your MyReadShelf is now live! 🎉
