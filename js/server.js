import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com PostgreSQL
const pool = new Pool({
  user: 'postgres',       // Seu usuário do pgAdmin
  host: 'localhost',
  database: 'herois',   // Nome do seu banco
  password: 'senai',  // Sua senha do PostgreSQL
  port: 5432
});

// GET - listar produtos
app.get('/produtos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produtos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// POST - adicionar produto
app.post('/produtos', async (req, res) => {
  const { nome, codigo, preco, link_amazon, descricao, imagem_url } = req.body;
  try {
    await pool.query(
      'INSERT INTO produtos (nome, codigo, preco, link_amazon, descricao, imagem_url) VALUES ($1, $2, $3, $4, $5, $6)',
      [nome, codigo, preco, link_amazon, descricao, imagem_url]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar produto' });
  }
});

// DELETE - excluir produto
app.delete('/produtos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM produtos WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
