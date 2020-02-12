const postgresql = {
  username: process.env.RASTREAQUI_POSTGRESQL_USERNAME || 'rastreaqui',
  password: process.env.RASTREAQUI_POSTGRESQL_PASSWORD || '123456',
  database: process.env.RASTREAQUI_POSTGRESQL_NAME || 'rastreaqui',
  host: process.env.RASTREAQUI_POSTGRESQL_HOST || '127.0.0.1',
  dialect: process.env.RASTREAQUI_POSTGRESQL_DIALECT || 'postgres',
};

module.exports = postgresql;
