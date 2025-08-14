import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const { Pool } = pkg;
const SECRET_KEY = '12345';

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

// ---------------- Middleware de autenticação ----------------
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, SECRET_KEY, (err, usuario) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.usuario = usuario;
    next();
  });
}

// ---------------- Rota de cadastro de usuário ----------------
app.post('/usuarios', async (req, res) => {
  const { nome, sobrenome, email, senha, cpf, pagamento, telefone, endereco } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    await pool.query(
      `INSERT INTO clientes 
      (nome, sobrenome, email, senha_hash, cpf, forma_pagamento, telefone, endereco) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [nome, sobrenome, email, senhaHash, cpf, pagamento, telefone, endereco]
    );

    res.status(201).json({ success: true, message: 'Usuário criado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// ---------------- Rota de login ----------------
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) return res.status(400).json({ message: 'Email e senha são obrigatórios' });

  try {
    const result = await pool.query('SELECT * FROM clientes WHERE email = $1', [email]);
    const usuario = result.rows[0];

    if (!usuario) return res.status(401).json({ message: 'Credenciais inválidas' });

    const senhaDigitada = senha.trim();
    const senhaCorreta = await bcrypt.compare(senhaDigitada, usuario.senha_hash);
    if (!senhaCorreta) return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, nome: usuario.nome },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ success: true, message: 'Login bem-sucedido', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// ---------------- Rotas protegidas ----------------

// Perfil do usuário
app.get('/perfil', autenticarToken, (req, res) => {
  res.json({ message: 'Token válido', usuario: req.usuario });
});

// Produtos
app.get('/produtos', autenticarToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produtos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.post('/produtos', autenticarToken, async (req, res) => {
  const { nome, codigo, preco, link_amazon, descricao, imagem_url } = req.body;
  try {
    await pool.query(
      'INSERT INTO produtos (nome, codigo, preco, link_amazon, descricao, imagem_url) VALUES ($1,$2,$3,$4,$5,$6)',
      [nome, codigo, preco, link_amazon, descricao, imagem_url]
    );
    res.json({ success: true, message: 'Produto adicionado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar produto' });
  }
});

app.delete('/produtos/:id', autenticarToken, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM produtos WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json({ success: true, message: 'Produto excluído com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
});

// Usuários
app.get('/usuarios', autenticarToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.delete('/usuarios/:id', autenticarToken, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json({ success: true, message: 'Usuário excluído com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
});

// ---------------- Servidor ----------------
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
