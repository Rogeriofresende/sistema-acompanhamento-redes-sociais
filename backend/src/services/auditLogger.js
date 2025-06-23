const prisma = require('../prisma');

/**
 * Registra um evento de audit log no banco.
 * @param {Object} params
 * @param {string} [params.userId] - ID do usuário responsável (opcional)
 * @param {string} params.action - Ação realizada (ex: 'UPDATE_PASSWORD')
 * @param {string} params.entity - Entidade afetada (ex: 'User')
 * @param {string} [params.entityId] - ID da entidade afetada (opcional)
 * @param {string} [params.ip] - IP de origem (opcional)
 * @param {Object} [params.details] - Detalhes adicionais (opcional, nunca inclua dados sensíveis)
 */
async function auditLog({ userId, action, entity, entityId, ip, details }) {
  // eslint-disable-next-line no-console
  console.log('[AUDIT_LOG_CALL]', { userId, action, entity, entityId, ip, details });
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        ip,
        details,
      },
    });
  } catch (err) {
    // Log temporário para depuração
    // eslint-disable-next-line no-console
    console.error('[AUDIT_LOG_ERROR]', err.stack || err.message);
    // Opcional: logar erro no logger centralizado
    // const logger = require('../../logger');
    // logger.error('Erro ao registrar audit log: %s', err.stack || err.message);
  }
}

module.exports = { auditLog }; 