export const metadata = {
  title: 'OEC CRM System - Customer Relationship Management',
  description: 'OEC Dubai CRM system for managing customer relationships, leads, and business operations.',
  robots: 'noindex, nofollow', // Keep CRM private from search engines
  other: {
    'Content-Security-Policy': "script-src 'self' 'unsafe-eval' 'unsafe-inline' *; default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http: *; style-src 'self' 'unsafe-inline' *; img-src 'self' data: blob: https: http: *; font-src 'self' data: https: http: *; connect-src 'self' https: http: wss: ws: data: *; media-src 'self' data: blob: https: http: *; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; worker-src 'self' blob: *; child-src 'self' blob: *;"
  }
};

export default function CRMLayout({ children }) {
  return children;
}