import mysql from 'mysql2/promise';

const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "jp_obras_reformas"
});

export default conexao;