import { DataSource } from "typeorm"
import "dotenv/config"

const CONNECTION = process.env.TYPEORM_CONNECTION as "mysql" | "mariadb"
const HOST = process.env.TYPEORM_HOST
const USERNAME = process.env.TYPEORM_USERNAME
const PASSWORD = process.env.TYPEORM_PASSWORD as string | undefined
const DATABASE = process.env.TYPEORM_DATABASE
const PORT = process.env.TYPEORM_PORT as number | undefined

export const AppDataSource = new DataSource({
  type: CONNECTION,
  host: HOST,
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  port: PORT,
  timezone: 'Z',
  entities: [`${__dirname}/**/entities/*.{ts, js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts, js}`]
})