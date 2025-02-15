import 'dotenv/config';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  synchronize: false,
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
