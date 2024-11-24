import mysql, { ConnectionOptions } from 'mysql2';

const access: ConnectionOptions = {
  host: 'localhost',
  user: 'root',
  database: 'documentos',
  port: 3306,
  password: '12345678',
};

const conn = mysql.createConnection(access);

export default conn;