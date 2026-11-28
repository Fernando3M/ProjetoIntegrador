import express from 'express';
import conexao from './conexao.js';

const app = express()
const PORTA = 3000;

app.use(express.json());

app.listen(PORTA, ()=>{
    console.log(`Sevidor rodando em http://localhost:${PORTA}`)
})

app.get("/prestador", async (req, res)=>{
    try {
        const [linhas] = await conexao.query('select * from prestador')
        res.json(linhas);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar informações do banco de dados"
        })        
    }
})

app.post("/prestador", async (req, res)=>{

    const { id_usuario, nome_profissional, descricao_profissional, cidade } = req.boby

    try {
        const sql = 'insert into prestador (nome_profissional, descricao_profissional, cidade) values (?,?,?,?)'
        const [resultado] = await conexao.query(sql, [id_usuario, nome_profissional, descricao_profissional, cidade])

        res.status(200).json({
            mensagem: 'Usuário cadastrado com sucesso',
            prestador: {
                id: resultado.insertId,
                nome_profissional,
                descricao_profissional,
                cidade
            }
        })
    } catch (erro) {
        console.log(erro);
        res.status(500).json({
            mensagem: 'Erro ao inserir o prestador de serviço',
            erro: erro.mensagem
        })
    }
})
