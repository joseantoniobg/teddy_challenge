// ormconfig.js
require('dotenv').config();
const { join } = require('path');

module.exports = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [join(__dirname, process.env.TYPEORM_ENTITIES)],
  migrations: [join(__dirname, process.env.TYPEORM_MIGRATIONS)],
  cli: {
    migrationsDir: join(__dirname, process.env.TYPEORM_MIGRATIONS_DIR),
  },
};