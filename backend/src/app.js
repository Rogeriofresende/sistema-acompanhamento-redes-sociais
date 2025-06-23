const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('../logger');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const client = require('prom-client');

const app = express();

// --- Middlewares Globais ---
// CORS: permite frontend acessar a API com cookies/autenticação
app.use(cors({ 
  origin: [
    'http://localhost:5173',
    'https://sistema-lancei-essa-9jra357as-lancei-essas-projects.vercel.app'
  ], 
  credentials: true 
}));
// JSON: parse automático de JSON no body
app.use(express.json());
// Morgan: logging HTTP integrado ao logger centralizado
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: logger.stream }));
// Rate limiting: limita requisições para evitar abuso/brute force
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
// Helmet: headers de segurança recomendados para produção
app.use(helmet());

// --- Rotas principais ---
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// --- Healthcheck ---
// Endpoint para monitoramento de saúde do backend
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- Métricas Prometheus ---
// Exposição de métricas básicas para Prometheus/Grafana
client.collectDefaultMetrics();
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// --- Middleware de erro genérico ---
// Captura erros não tratados e loga no logger centralizado
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

module.exports = app;
