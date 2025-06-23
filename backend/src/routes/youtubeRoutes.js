const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const { requireAuth } = require('../middlewares/requireAuth');
const logger = require('../config/logger');
const tokenService = require('../services/TokenService');
const analyticsService = require('../services/YouTubeAnalyticsService');

// Configuração do cliente OAuth2 do YouTube
const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

const YOUTUBE_SCOPES = [
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/yt-analytics.readonly'
];

// Rota para iniciar o fluxo OAuth2 do YouTube
router.get('/auth', requireAuth, (req, res) => {
  try {
    logger.info('Iniciando autenticação YouTube para userId:', req.userId);
    
    // Gera a URL de autenticação
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: YOUTUBE_SCOPES,
      state: req.userId // Passa o userId no state para recuperar depois
    });
    
    res.json({ authUrl });
  } catch (error) {
    logger.error('Erro ao gerar URL de autenticação:', error);
    res.status(500).json({ error: 'Erro ao iniciar autenticação' });
  }
});

// Rota de callback do OAuth2
router.get('/callback', async (req, res) => {
  console.log('=== CALLBACK DO YOUTUBE CHAMADO ===');
  console.log('Query params:', req.query);
  console.log('Headers:', req.headers);
  
  try {
    const { code, state } = req.query;
    const userId = state;
    
    if (!code) {
      throw new Error('Código de autorização não fornecido');
    }
    
    logger.info('Callback YouTube recebido para userId:', userId);
    console.log('UserId extraído do state:', userId);
    
    // Troca o código por tokens
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Tokens obtidos com sucesso');
    
    // Salvar tokens no banco de dados
    await tokenService.saveTokens(userId, tokens);
    logger.info('Tokens salvos com sucesso no banco de dados');
    
    // Redireciona de volta para o frontend
    res.redirect(`${process.env.FRONTEND_URL}/youtube/success`);
  } catch (error) {
    console.error('ERRO NO CALLBACK:', error);
    logger.error('Erro no callback do YouTube:', error);
    res.redirect(`${process.env.FRONTEND_URL}/youtube/error`);
  }
});

// Rota para verificar status da conexão
router.get('/status', requireAuth, async (req, res) => {
  try {
    console.log('🔍 STATUS CHECK - userId:', req.userId);
    
    // Verificar no banco se o usuário tem tokens salvos
    const hasTokens = await tokenService.hasValidTokens(req.userId);
    console.log('🔍 STATUS CHECK - hasTokens:', hasTokens);
    
    if (!hasTokens) {
      console.log('🔍 STATUS CHECK - Retornando: não conectado');
      return res.json({ 
        connected: false,
        message: 'YouTube não conectado'
      });
    }

    // Se tem tokens, verificar permissões e buscar info do canal
    try {
      const tokens = await tokenService.getTokens(req.userId);
      console.log('🔍 STATUS CHECK - tokens obtidos:', !!tokens);
      console.log('🔍 STATUS CHECK - scope:', tokens?.scope);
      
      const hasAnalytics = tokens && tokens.scope && tokens.scope.includes('yt-analytics.readonly');
      console.log('🔍 STATUS CHECK - hasAnalytics:', hasAnalytics);
      
      // Tentar buscar informações básicas do canal
      let channelInfo = null;
      try {
        channelInfo = await analyticsService.getChannelInfo(req.userId);
        console.log('🔍 STATUS CHECK - channelInfo obtido:', !!channelInfo);
      } catch (error) {
        console.log('🔍 STATUS CHECK - Erro ao buscar canal:', error.message);
      }
      
      const result = { 
        connected: true,
        hasAnalytics,
        channel: channelInfo,
        message: hasAnalytics ? 'YouTube conectado com Analytics' : 'YouTube conectado (sem Analytics)'
      };
      
      console.log('🔍 STATUS CHECK - Resultado final:', JSON.stringify(result, null, 2));
      
      res.json(result);
    } catch (error) {
      console.error('🔍 STATUS CHECK - Erro ao verificar permissões:', error);
    res.json({ 
        connected: true,
        hasAnalytics: false,
        message: 'YouTube conectado (verificação de permissões falhou)'
    });
    }
  } catch (error) {
    console.error('🔍 STATUS CHECK - Erro geral:', error);
    res.status(500).json({ error: 'Erro ao verificar status' });
  }
});

// Rota para desconectar
router.delete('/disconnect', requireAuth, async (req, res) => {
  try {
    // Remover tokens do banco
    const removed = await tokenService.removeTokens(req.userId);
    
    res.json({ 
      success: removed,
      message: removed ? 'Desconectado com sucesso' : 'Nenhuma conexão encontrada'
    });
  } catch (error) {
    logger.error('Erro ao desconectar:', error);
    res.status(500).json({ error: 'Erro ao desconectar' });
  }
});

// Rota para buscar informações do canal
router.get('/channel', requireAuth, async (req, res) => {
  try {
    const channelInfo = await analyticsService.getChannelInfo(req.userId);
    res.json(channelInfo);
  } catch (error) {
    logger.error('Erro ao buscar informações do canal:', error);
    res.status(500).json({ error: 'Erro ao buscar informações do canal' });
  }
});

// Rota para buscar métricas de engajamento
router.get('/analytics/engagement', requireAuth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Validar datas
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate e endDate são obrigatórios' });
    }
    
    const metrics = await analyticsService.getEngagementMetrics(req.userId, startDate, endDate);
    res.json(metrics);
  } catch (error) {
    logger.error('Erro ao buscar métricas de engajamento:', error);
    res.status(500).json({ error: 'Erro ao buscar métricas de engajamento' });
  }
});

// Rota para buscar funil de engajamento
router.get('/analytics/funnel', requireAuth, async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    // Calcular datas baseado no período
    const endDate = new Date().toISOString().split('T')[0];
    let days = 7;
    
    switch (period) {
      case '28d':
        days = 28;
        break;
      case '90d':
        days = 90;
        break;
      default:
        days = 7;
    }
    
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const funnel = await analyticsService.getEngagementFunnel(req.userId, startDate, endDate);
    res.json(funnel);
  } catch (error) {
    logger.error('Erro ao buscar funil de engajamento:', error);
    res.status(500).json({ error: 'Erro ao buscar funil de engajamento' });
  }
});

// Rota para buscar espectadores recorrentes
router.get('/analytics/recurring-viewers', requireAuth, async (req, res) => {
  try {
    const { period = '7' } = req.query;
    const periodDays = parseInt(period);
    
    if (isNaN(periodDays) || periodDays < 1) {
      return res.status(400).json({ error: 'Período inválido' });
    }
    
    const viewers = await analyticsService.getRecurringViewers(req.userId, periodDays);
    res.json(viewers);
  } catch (error) {
    logger.error('Erro ao buscar espectadores recorrentes:', error);
    res.status(500).json({ error: 'Erro ao buscar espectadores recorrentes' });
  }
});

// Rota para buscar métricas detalhadas
router.get('/analytics/detailed-metrics', requireAuth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate e endDate são obrigatórios' });
    }
    
    const metrics = await analyticsService.getDetailedMetrics(req.userId, startDate, endDate);
    res.json(metrics);
  } catch (error) {
    logger.error('Erro ao buscar métricas detalhadas:', error);
    res.status(500).json({ error: 'Erro ao buscar métricas detalhadas' });
  }
});

// Rota para buscar métricas de retenção
router.get('/analytics/retention', requireAuth, async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    // Calcular datas baseado no período
    const endDate = new Date().toISOString().split('T')[0];
    let days = 7;
    
    switch (period) {
      case '28d':
        days = 28;
        break;
      case '90d':
        days = 90;
        break;
      default:
        days = 7;
    }
    
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const retention = await analyticsService.getRetentionMetrics(req.userId, startDate, endDate);
    res.json(retention);
  } catch (error) {
    logger.error('Erro ao buscar métricas de retenção:', error);
    res.status(500).json({ error: 'Erro ao buscar métricas de retenção' });
  }
});

// Rota para buscar resumo de métricas
router.get('/analytics/overview', requireAuth, async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    // Calcular datas baseado no período
    const endDate = new Date().toISOString().split('T')[0];
    let days = 7;
    
    switch (period) {
      case '28d':
        days = 28;
        break;
      case '90d':
        days = 90;
        break;
      default:
        days = 7;
    }
    
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    // Buscar todas as métricas em paralelo
    const [channelInfo, engagementMetrics, funnel, retention] = await Promise.all([
      analyticsService.getChannelInfo(req.userId),
      analyticsService.getEngagementMetrics(req.userId, startDate, endDate),
      analyticsService.getEngagementFunnel(req.userId, startDate, endDate),
      analyticsService.getRetentionMetrics(req.userId, startDate, endDate)
    ]);
    
    res.json({
      channel: channelInfo,
      engagement: engagementMetrics.summary,
      funnel,
      retention
    });
  } catch (error) {
    logger.error('Erro ao buscar resumo de métricas:', error);
    res.status(500).json({ error: 'Erro ao buscar resumo de métricas' });
  }
});

module.exports = router; 