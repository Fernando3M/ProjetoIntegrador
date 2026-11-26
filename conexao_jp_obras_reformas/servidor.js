import express from 'express';
import conexao from './conexao.js'

const app = express();
const PORTA = 3000;

app.use(express.json())

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`)
})

app.get("/usuario", async (req, res) => {
    try {

        const [linhas] = await conexao.query('select * from usuario');

        res.json(linhas);
    } catch (erro) {

        res.status(500).json({
            mensagem: "Erro ao buscar informações no banco de dados"
        })
    }
})

app.post("/usuario", async (req, res) => {

    const { nome, email, senha, telefone, data_cadastro } = req.body
    try {

        const SQL = 'insert into usuario (nome, email, senha, telefone) values (?,?,?,?)'

        const [resultado] = await conexao.query(SQL, [nome, email, senha, telefone])

        res.status(201).json({
            mensagem: 'Usuario cadastrado com sucesso',
            usuario: {
                id: resultado.insertId,
                nome,
                email,
                senha,
                telefone
            }
        })
    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao inserir informações no banco de dados",
            erro: erro.message
        });
    }
})