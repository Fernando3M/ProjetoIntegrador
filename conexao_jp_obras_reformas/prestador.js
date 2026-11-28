import express from 'express';
import conexao from './conexao.js';

const app = express()
const PORTA = 3001;

app.use(express.json());

app.listen(PORTA, () => {
    console.log(`Sevidor rodando em http://localhost:${PORTA}`)
})

app.get("/prestador", async (req, res) => {
    try {
        const [linhas] = await conexao.query('select * from prestador')
        res.json(linhas);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar informações do banco de dados"
        })
    }
})

app.post("/prestador", async (req, res) => {

    const { id_usuario, nome_profissional, descricao_profissional, cidade } = req.body

    try {
        const sql = 'insert into prestador (id_usuario, nome_profissional, descricao_profissional, cidade) values (?,?,?,?)'
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
            erro: erro.message
        })
    }
})

app.put("/prestador/:id", async (req, res)=>{
    const {id} = req.params
    const {id_usuario, nome_profissional, descricao_profissional, cidade} = req.body

    try {
        const sql = 'update prestador set id_usuario = ?, nome_profissional = ?, descricao_profissional = ?, cidade = ? where id_prestador = ?'
        const [atualizado] = await conexao.query(sql, [id_usuario, nome_profissional, descricao_profissional, cidade, id])

        if (atualizado.affectedRows === 0){
            return res.status(404).json({
                mensagem: 'Prestador inexistente'
            })
        } 

        res.json({
            mensagem: 'Prestador atualizado'
        })

    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao atualizar o prestador'
        })
    }
})
