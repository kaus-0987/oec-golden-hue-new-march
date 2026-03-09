# Netlify Deployment Troubleshooting

## Common 404 Errors and Solutions

### 1. CRM Login Route 404

**Error:**
```
GET https://oecdubai.netlify.app/crm/login 404 (Not Found)
```

**Solution:**
The `netlify.toml` file now includes specific redirects for CRM routes:

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

**Verification:**
1. Ensure `public/crm/index.html` exists
2. Check that `netlify.toml` is in root directory
3. Verify the build deployed correctly

### 2. Courses Route 404

**Error:**
```
GET https://oecdubai.netlify.app/courses?_rsc=8pre9 404 (Not Found)
```

**Solution:**
Added redirect from legacy `/courses` to `/popular-courses`:

```toml
[[redirects]]
  from = "/courses"
  to = "/popular-courses"
  status = 301
```

**Root Cause:**
- The app uses `/popular-courses` route but some links/references point to `/courses`
- Next.js RSC (React Server Components) requests were failing

### 3. Blank Page with CSP Errors

**Error:**
```
Content Security Policy prevents evaluation of arbitrary strings as JavaScript
script-src blocked
```

**Solution:**
Added CSP headers for CRM routes in both `next.config.mjs` and `netlify.toml`:
```
Content-Security-Policy: script-src 'self' 'unsafe-eval' 'unsafe-inline'
```

**Why:** React CRM build uses webpack eval() which is blocked by default CSP.

### 4. Next.js Plugin Configuration

**Critical Setup:**
```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

This plugin is **essential** for:
- Dynamic routes (`[slug]`, `[country]`, etc.)
- API routes (if any)
- Server-side rendering
- Client-side routing

### 4. Asset Loading Issues

**CRM Assets:**
```toml
[[headers]]
  for = "/crm/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Next.js Rewrites:**
The `next.config.mjs` handles internal routing:
```javascript
{
  source: '/crm/login',
  destination: '/crm/index.html',
}
```

## Step-by-Step Fix Verification

### 1. Check Repository Files
Ensure these files are in your repository:
- ✅ `netlify.toml` (root directory)
- ✅ `next.config.mjs` (CRM rewrites configured)
- ✅ `public/crm/index.html` (CRM build exists)

### 2. Netlify Dashboard Settings
1. **Build Command:** `npm run build`
2. **Node Version:** 18
3. **Plugins:** `@netlify/plugin-nextjs` should be auto-detected

### 3. Deploy Logs Check
Look for these in deploy logs:
```
✅ Next.js plugin detected
✅ Building Next.js app
✅ Functions deployed (if any API routes)
```

### 4. Test Routes After Deploy
```bash
# Main site
curl -I https://yoursite.netlify.app/

# CRM launcher
curl -I https://yoursite.netlify.app/oeccrm/

# CRM login (should redirect to index.html)
curl -I https://yoursite.netlify.app/crm/login

# Legacy courses redirect
curl -I https://yoursite.netlify.app/courses
```

## Quick Fixes

### If CRM Still 404s:
1. Check if `public/crm/` folder was included in the deploy
2. Verify `netlify.toml` redirects are exactly as shown above
3. Clear Netlify cache: Site Settings → Build & Deploy → Clear Cache

### If Dynamic Routes 404:
1. Ensure Next.js plugin is active
2. Check that `generateStaticParams()` exists for SSG routes
3. Verify no conflicts between client components and SSG

### If Build Fails:
1. Run `npm run build` locally to test
2. Check Node.js version matches (18)
3. Use `./verify-build.sh` to diagnose issues

## Environment Variables

If needed, add in Netlify Dashboard → Site Settings → Environment Variables:

```
NODE_VERSION=18
NEXT_PUBLIC_SITE_URL=https://yoursite.netlify.app
```

## Success Indicators

After successful deployment, you should see:
1. ✅ Main site loads at root URL
2. ✅ `/oeccrm/` shows CRM launcher page
3. ✅ Clicking "Launch CRM" opens window at `/crm/login`
4. ✅ CRM application loads without 404 errors
5. ✅ `/courses` redirects to `/popular-courses`

## Still Having Issues?

1. **Check Deploy Logs:** Look for plugin errors or build failures
2. **Test Locally:** Run `npm run build && npm start` to verify
3. **Browser DevTools:** Check Network tab for exact failing URLs
4. **Netlify Functions:** If API routes exist, check function logs

---

**Configuration Updated:** October 2025  
**Status:** ✅ Ready for Production Deployment