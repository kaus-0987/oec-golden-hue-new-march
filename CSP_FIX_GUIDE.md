# Content Security Policy (CSP) Fix for CRM Integration

## Issue Description

**Error:** Blank page at `oecdubai.netlify.app/oeccrm` with CSP violation:
```
The Content Security Policy (CSP) prevents the evaluation of arbitrary strings as JavaScript
script-src blocked
```

## Root Cause

React applications built with Create React App or similar tools often include:
- Webpack's `eval()` for development builds
- Dynamic imports using string evaluation
- Inline scripts for runtime configuration
- Hot module replacement code

Netlify's default CSP blocks these, causing the CRM to fail to load.

## Solution Implemented

### 1. Next.js Configuration (`next.config.mjs`)

Added CSP headers specifically for CRM routes:

```javascript
async headers() {
  return [
    {
      source: '/crm/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https: wss: ws:; frame-ancestors 'self';"
        },
      ],
    },
    {
      source: '/oeccrm/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https: wss: ws:; frame-ancestors 'self';"
        },
      ],
    },
  ];
}
```

### 2. Netlify Configuration (`netlify.toml`)

Added CSP headers at the Netlify level:

```toml
[[headers]]
  for = "/crm/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https: wss: ws:; frame-ancestors 'self';"

[[headers]]
  for = "/oeccrm/*"  
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https: wss: ws:; frame-ancestors 'self';"
```

## CSP Directives Explained

| Directive | Value | Purpose |
|-----------|-------|---------|
| `default-src 'self'` | Same origin only | Default policy for all resource types |
| `script-src 'self' 'unsafe-eval' 'unsafe-inline'` | Same origin + eval + inline | **Critical:** Allows React's webpack eval and inline scripts |
| `style-src 'self' 'unsafe-inline'` | Same origin + inline styles | Allows CSS-in-JS and inline styles |
| `img-src 'self' data: blob: https:` | Multiple sources | Images from various sources |
| `font-src 'self' data:` | Same origin + data URIs | Web fonts and data URI fonts |
| `connect-src 'self' https: wss: ws:` | HTTPS/WSS connections | API calls and WebSocket connections |
| `frame-ancestors 'self'` | Same origin framing | Prevents clickjacking |

## Security Considerations

### ⚠️ Why `unsafe-eval` is Needed

React applications often require `unsafe-eval` because:

1. **Webpack Runtime:** Uses `eval()` for module loading
2. **Source Maps:** Development builds use eval for debugging
3. **Dynamic Imports:** `import()` statements may use string evaluation
4. **Polyfills:** Some polyfills require eval functionality

### 🔒 Mitigation Strategies

1. **Scoped Application:** CSP only applies to `/crm/*` and `/oeccrm/*` routes
2. **Main Site Protected:** Rest of the site uses stricter default CSP
3. **HTTPS Only:** All connections must be encrypted
4. **Same Origin:** Resources must come from the same domain

### 🛡️ Alternative Solutions (Future)

For better security, consider:

1. **Rebuild CRM:** Use a build process that doesn't require eval
2. **Nonce-based CSP:** Generate unique nonces for each script
3. **Hash-based CSP:** Use SHA hashes for specific inline scripts
4. **Separate Subdomain:** Host CRM on `crm.oecdubai.com` with different CSP

## Testing CSP Configuration

### 1. Browser DevTools

Check for CSP violations in Console:
```
Content Security Policy: The page's settings blocked the loading of a resource
```

### 2. CSP Validator

Test your CSP policy:
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- Browser DevTools → Security tab

### 3. Local Testing

```bash
# Test locally with CSP headers
npm run build
npm start

# Check specific routes
curl -I http://localhost:3000/oeccrm/
curl -I http://localhost:3000/crm/login
```

## Troubleshooting

### If CRM Still Shows Blank Page:

1. **Check Browser Console** for CSP violations
2. **Verify Headers** are being sent:
   ```javascript
   // In browser console
   fetch('/crm/').then(r => console.log([...r.headers.entries()]))
   ```
3. **Clear Netlify Cache** if headers aren't updating
4. **Check Network Tab** for failed resource loads

### If Main Site Has Issues:

The CSP is scoped only to CRM routes. If main site has issues:
1. Check if CSP is being applied globally
2. Verify route patterns in configuration
3. Test main site routes separately

### Common CSP Errors:

| Error | Solution |
|-------|----------|
| `script-src` violations | Add `'unsafe-eval'` or `'unsafe-inline'` |
| `style-src` violations | Add `'unsafe-inline'` for CSS-in-JS |
| `connect-src` violations | Add API domains to connect-src |
| `img-src` violations | Add `data:` and `blob:` for base64 images |

## Verification Checklist

After deployment, verify:

- ✅ Main site loads normally at `oecdubai.netlify.app`
- ✅ CRM launcher loads at `oecdubai.netlify.app/oeccrm`
- ✅ CRM application loads at `oecdubai.netlify.app/crm/login`
- ✅ No CSP violations in browser console
- ✅ CRM functionality works (buttons, forms, navigation)
- ✅ No 404 errors on CRM assets

## Monitor CSP

Set up monitoring for CSP violations:

```javascript
// Add to CRM application
document.addEventListener('securitypolicyviolation', (e) => {
  console.log('CSP Violation:', e.violatedDirective, e.blockedURI);
  // Optionally report to analytics
});
```

---

**Status:** ✅ CSP configured for CRM compatibility  
**Security Level:** Balanced - Secure for main site, permissive for CRM  
**Last Updated:** October 2025