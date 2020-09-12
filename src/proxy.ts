import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app: any) => {
  app.use(
    createProxyMiddleware('/api'), {
      target: 'http://localhost:3001'
    }
  )
};