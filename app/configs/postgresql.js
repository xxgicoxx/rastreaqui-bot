const postgresql = {
  username: process.env.DATABASE_USERNAME || 'rastreaqui',
  password: process.env.DATABASE_PASSWORD || '123456',
  database: process.env.DATABASE_NAME || 'rastreaqui',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  dialect: process.env.DATABASE_DIALECT || 'postgres',
};

module.exports = postgresql;
