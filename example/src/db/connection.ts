// Aquí nos conectamos con la base de datos

import mysql from "mysql2";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
});

export default pool.promise();