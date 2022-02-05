export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 8000,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiresIn: '3600s',
    refreshTokenExpiresIn: '5400s',
  },
  database: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    name: process.env.MYSQL_DB_NAME,
  },
});
