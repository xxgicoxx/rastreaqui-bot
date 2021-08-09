const postgresql = {
  username: process.env.POSTGRESQL_USERNAME || 'rastreaqui',
  password: process.env.POSTGRESQL_PASSWORD || '123456',
  database: process.env.POSTGRESQL_NAME || 'rastreaqui',
  host: process.env.POSTGRESQL_HOST || '127.0.0.1',
  dialect: process.env.POSTGRESQL_DIALECT || 'postgres',
};

module.exports = postgresql;
