import "reflect-metadata"
import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "sa",
    database: "tsauth",
    entities: ['src/entity/*.ts'],  
    migrations: ['src/migration/*.ts'],
    subscribers: [],
})

export default AppDataSource;