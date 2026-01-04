export const envConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGO_DB_URI || '',
  port: Number(process.env.PORT) || 3002,
  default_limit: Number(process.env.DEFAULT_LIMIT) || 12,
});
