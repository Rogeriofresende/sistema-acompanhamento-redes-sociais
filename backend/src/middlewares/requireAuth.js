const jwt = require('jsonwebtoken');
const logger = require('../../logger');

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger && logger.warn && logger.warn('Token JWT não fornecido na requisição protegida.');
    return res.status(401).json({ error: 'Token JWT não fornecido.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    logger && logger.warn && logger.warn('Token JWT inválido: %s', err.message);
    return res.status(401).json({ error: 'Token JWT inválido.' });
  }
}

module.exports = requireAuth; 