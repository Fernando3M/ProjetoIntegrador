import express from 'express';
import conexao from './conexao.js'

const app = express();
const PORTA = 3000;

app.use(express.json())

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`)
})

app.get("/servico", async (req, res) => {
    try {

        const [linhas] = await conexao.query('select * from usuario');

        res.json(linhas);
    } catch (erro) {

        res.status(500).json({
            mensagem: "Erro ao buscar informações no banco de dados"
        })
    }
})

app.post("/servico", async(req,res) =>{
    const {nome, descricao} = req.body
    try{
        const sql = `Insert into servico (nome, descricacao) values (?,?)`

        const [resultado = await conexao.query(sql[nome,descricao])]

        res.status(201).json({
            mensagem:'Servico cadastrado com sucesso',
            servico: {
            id: resultado.insertId,
            nome,
            descricao
            }
        })
    }catch (erro){
        console.log(erro)

        res.status(500).json({
            mensagem: "Erro ao inserir informações no banco de dados",
            erro: erro.mensagem
        })
    }
}) 

app.put("/servico", async(req,res)=>{
    const {id} = req.params
    const {nome,descricao} = req.body

    try{

        const sql = 
    }
})