import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import bcrypt from 'bcrypt'; // Importando a biblioteca bcrypt para criptografar senhas

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
    // Criptografa a senha antes de salvar no banco de dados
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);
    
    await pool.query(
      'INSERT INTO clientes (nome, sobrenome, email, senha_hash, cpf, forma_pagamento, telefone, endereco) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [nome, sobrenome, email, senhaHash, cpf, pagamento, telefone, endereco]
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

// POST - Rota de login para autenticação de usuário
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  
  try {
    // Busca o usuário no banco de dados pelo email
    const result = await pool.query('SELECT * FROM clientes WHERE email = $1', [email]);
    const usuario = result.rows[0];

    // Verifica se o usuário existe
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Compara a senha fornecida com a senha criptografada do banco de dados
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

    if (senhaCorreta) {
      // Se a senha estiver correta, o login é bem-sucedido
      res.status(200).json({ message: 'Login bem-sucedido!' });
    } else {
      // Se a senha estiver incorreta
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
