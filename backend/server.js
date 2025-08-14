// /opt/assist/backend/server.js

require('dotenv').config();
const express = require('express');


const app = express();
app.use(express.json());

// Variáveis de ambiente
const PORT = process.env.PORT || 4000;
const AUTH_SERVICE_URL = 'http://127.0.0.1:4001'; // auth-service rodando localmente

// Rota teste simples para checar comunicação com auth-service
app.get('/test-auth', async (req, res) => {
  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/openai/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });

    const data = await response.json();
    res.json({ ok: true, authResult: data });
  } catch (err) {
    console.error('Erro ao acessar auth-service:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Rota health para verificar se backend está rodando
app.get('/health', (req, res) => res.json({ ok: true }));

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});

