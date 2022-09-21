import { DataSource } from "typeorm"

require("dotenv").config();
const entitiesPath = __dirname + process.env.PG_ENTITIES;
console.log("Entities path", entitiesPath);

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_ACCOUNT,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: Boolean(process.env.PG_SYNCHRONIZE),
    logging: Boolean(process.env.PG_LOGGING),
    entities: [entitiesPath]
});