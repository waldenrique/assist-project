/*require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const AUTH_SERVICE_TOKEN = process.env.AUTH_SERVICE_TOKEN;
const PORT = process.env.PORT || 4001;

// Autenticação simples
app.post('/auth/verify', (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ ok: true, username });
  }
  return res.status(401).json({ ok:false, error:'invalid' });
});

// Rota de teste (não expõe a chave real)
app.get('/secret', (req,res) => {
  return res.json({ ok:true, message: 'secret endpoint' });
});

// Health check
app.get('/health', (req,res) => res.json({ ok:true }));

app.listen(PORT, () => console.log(`Auth service rodando na porta ${PORT}`));

*/

require('dotenv').config();
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(express.json());

// Variáveis do .env
const PORT = process.env.PORT || 4001;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Configuração do OpenAI
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


// Endpoint de teste de autenticação (exemplo sem senha ainda)
app.post('/auth/verify', (req, res) => {
  // Futuramente você pode adicionar username/password do ADMIN aqui
  res.json({ ok: true, message: 'Auth endpoint ativo' });
});

// Endpoint de teste OpenAI
app.post('/openai/test', async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Escreva uma frase de teste." }],
      max_tokens: 50,
    });
    res.json({ ok: true, result: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Endpoint de healthcheck
app.get('/health', (req, res) => res.json({ ok: true }));

// Start server
app.listen(PORT, () => {
  console.log(`Auth-service rodando na porta ${PORT}`);
});

