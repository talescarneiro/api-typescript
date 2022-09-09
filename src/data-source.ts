import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";

require("dotenv").config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "tercerizai.clumwuxvww7e.us-east-1.rds.amazonaws.com",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: ["src/migrations/*.ts"]
});

AppDataSource.initialize()
    .then(() => console.log("Data Source Initialized"))
    .catch(error => {
    console.error("Error during Data Source Initialization", error)
})