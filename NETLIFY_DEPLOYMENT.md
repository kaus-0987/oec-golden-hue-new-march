# Netlify Deployment Guide

This guide will help you deploy the OEC Dubai website with CRM integration to Netlify.

## Pre-Deployment Checklist

### 1. Verify Build Configuration

The project is configured for Next.js deployment with the following files:
- ✅ `next.config.mjs` - CRM rewrites and headers configured
- ✅ `netlify.toml` - Next.js plugin and redirects configured
- ✅ `package.json` - Standard Next.js build script

### 2. Build Process

The build process includes:
```bash
npm run build
```

This will:
1. Create an optimized Next.js build in `.next/` directory
2. Generate static pages where possible
3. Generate sitemap automatically

## Netlify Configuration

### netlify.toml Features

1. **Build Settings**
   ```toml
   [build]
     command = "npm run build"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **CRM Redirects**
   ```toml
   [[redirects]]
     from = "/crm/login"
     to = "/crm/index.html"
     status = 200

   [[redirects]]
     from = "/crm/*"
     to = "/crm/index.html"
     status = 200
   ```

3. **Legacy Route Handling**
   ```toml
   [[redirects]]
     from = "/oeccrm/*"
     to = "/crm/:splat"
     status = 200

   [[redirects]]
     from = "/courses"
     to = "/popular-courses"
     status = 301
   ```

## Deployment Steps

### Method 1: Git-based Deployment (Recommended)

1. **Push to Repository**
   ```bash
   git add .
   git commit -m "Configure for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `out`
   - Deploy!

### Method 2: Manual Upload (Not recommended for Next.js)

**Note:** For Next.js applications, Git-based deployment is strongly recommended as it properly handles serverless functions and dynamic routes.

## Post-Deployment Verification

### 1. Test Main Routes
- ✅ `https://yoursite.netlify.app/` - Home page
- ✅ `https://yoursite.netlify.app/about-us/` - About page
- ✅ `https://yoursite.netlify.app/popular-courses/` - Courses page

### 2. Test CRM Integration
- ✅ `https://yoursite.netlify.app/oeccrm/` - CRM launcher page
- ✅ Click "Launch CRM System" button
- ✅ Verify new window opens at `/crm/login`
- ✅ Verify CRM loads without 404 errors

### 3. Test Redirects
- ✅ `https://yoursite.netlify.app/courses` → redirects to `/popular-courses/`
- ✅ `https://yoursite.netlify.app/oeccrm/dashboard` → redirects to `/crm/dashboard`

## Troubleshooting

### Common Issues

1. **404 on CRM Routes**
   - Check if `public/crm/` directory exists
   - Verify `netlify.toml` redirects are correct
   - Ensure Next.js plugin is installed on Netlify

2. **API Routes Not Working**
   - API routes work with Netlify's Next.js plugin
   - Check function logs in Netlify dashboard

3. **Dynamic Routes 404**
   - Ensure Next.js plugin is enabled
   - Check if routes have proper fallback pages

### Build Debugging

```bash
# Test build locally
npm run build

# Test with local development server
npm run dev

# Check if CRM files exist
ls -la public/crm/
```

## Environment Variables

If you need environment variables, add them in Netlify:

1. Go to Site Settings
2. Build & Deploy → Environment Variables
3. Add your variables

Example:
```
NEXT_PUBLIC_API_URL=https://api.oecdubai.com
```

## Custom Domain

1. **Add Custom Domain in Netlify**
   - Site Settings → Domain Management
   - Add custom domain: `oecdubai.com`

2. **Update DNS Records**
   - Point your domain to Netlify's servers
   - Add CNAME record or A records as instructed

## Performance Optimization

The site includes:
- ✅ Static export for fast loading
- ✅ Image optimization disabled for compatibility
- ✅ Proper caching headers for CRM assets
- ✅ Compressed assets

## Support

If you encounter issues:
1. Check Netlify deploy logs
2. Use browser developer tools
3. Verify all redirects in `netlify.toml`
4. Test CRM files exist in `out/crm/`

---

**Last Updated:** October 2025
**Deployment Status:** ✅ Ready for Production