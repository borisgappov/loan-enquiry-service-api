import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'banking',
  synchronize: true,
  migrationsRun: false,
  migrationsTableName: 'migrations',
  entities: ['libs/common/src/**/*.entity.ts'],
  migrations: ['apps/loans/src/migrations/**/*.{ts,js}'],
});
