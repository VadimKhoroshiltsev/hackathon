export default {
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL ||
    'http://localhost:9000/azure-auth/login',
  AUTH_REDIRECT_URL: process.env.AUTH_REDIRECT_URL || 'http://localhost:3000',
  AUTH_JWT_SECRET: process.env.AUTH_JWT_SECRET || 'test-jwt-secret',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'test-cookie-secret'
};
