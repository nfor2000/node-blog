import sql from "mysql"
import dotenv from "dotenv";

dotenv.config("./.env")

const { HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env

const connection = sql.createConnection({
     host: HOST,
     user: DB_USER,
     password: DB_PASSWORD,
     database: DB_NAME
})

connection.connect((error) => {
     if (error) {
          console.log("error:", error.stack)
          return
     }
     console.log('connected as id ' + connection.threadId);
})

export { connection }