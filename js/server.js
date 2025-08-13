import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'herois',
  password: 'senai',
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

// GET - listar clientes/usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
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

// POST - adicionar cliente/usuario
app.post('/usuarios', async (req, res) => {
  const { nome, sobrenome, email, senha, cpf, pagamento, telefone, endereco } = req.body;
  try {
    await pool.query(
      'INSERT INTO clientes (nome, sobrenome, email, senha_hash, cpf, forma_pagamento, telefone, endereco) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [nome, sobrenome, email, senha, cpf, pagamento, telefone, endereco]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar cliente' });
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
