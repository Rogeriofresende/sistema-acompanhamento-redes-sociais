const { google } = require('googleapis');
const db = require('../models');
const encryptionService = require('./EncryptionService');
const logger = require('../config/logger');

class TokenService {
  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.YOUTUBE_CLIENT_ID,
      process.env.YOUTUBE_CLIENT_SECRET,
      process.env.YOUTUBE_REDIRECT_URI
    );
  }

  /**
   * Salva ou atualiza tokens do YouTube para um usuário
   * @param {string} userId - ID do usuário
   * @param {Object} tokens - Tokens do OAuth
   * @returns {Promise<Object>} Token salvo
   */
  async saveTokens(userId, tokens) {
    try {
      // Criptografar tokens sensíveis
      const encryptedAccessToken = encryptionService.encrypt(tokens.access_token);
      const encryptedRefreshToken = tokens.refresh_token ? 
        encryptionService.encrypt(tokens.refresh_token) : null;

      // Calcular data de expiração
      const expiresAt = new Date(Date.now() + (tokens.expiry_date || tokens.expires_in * 1000));

      // Verificar se já existe token para este usuário
      const existingToken = await db.YouTubeToken.findOne({
        where: { userId }
      });

      if (existingToken) {
        // Atualizar token existente
        await existingToken.update({
          accessToken: encryptedAccessToken,
          refreshToken: encryptedRefreshToken || existingToken.refreshToken,
          expiresAt: expiresAt,
          scope: tokens.scope || existingToken.scope
        });
        
        logger.info('Tokens do YouTube atualizados para usuário:', userId);
        return existingToken;
      } else {
        // Criar novo token
        const newToken = await db.YouTubeToken.create({
          userId,
          accessToken: encryptedAccessToken,
          refreshToken: encryptedRefreshToken,
          expiresAt: expiresAt,
          scope: tokens.scope
        });
        
        logger.info('Novos tokens do YouTube salvos para usuário:', userId);
        return newToken;
      }
    } catch (error) {
      logger.error('Erro ao salvar tokens:', error);
      throw error;
    }
  }

  /**
   * Recupera tokens do YouTube para um usuário
   * @param {string} userId - ID do usuário
   * @returns {Promise<Object|null>} Tokens descriptografados ou null
   */
  async getTokens(userId) {
    try {
      const tokenRecord = await db.YouTubeToken.findOne({
        where: { userId }
      });

      if (!tokenRecord) {
        return null;
      }

      // Descriptografar tokens
      const decryptedTokens = {
        access_token: encryptionService.decrypt(tokenRecord.accessToken),
        refresh_token: tokenRecord.refreshToken ? 
          encryptionService.decrypt(tokenRecord.refreshToken) : null,
        expiry_date: tokenRecord.expiresAt.getTime(),
        scope: tokenRecord.scope
      };

      // Verificar se precisa renovar
      if (tokenRecord.needsRefresh() && decryptedTokens.refresh_token) {
        logger.info('Token precisa ser renovado para usuário:', userId);
        return await this.refreshTokens(userId, decryptedTokens.refresh_token);
      }

      return decryptedTokens;
    } catch (error) {
      logger.error('Erro ao recuperar tokens:', error);
      throw error;
    }
  }

  /**
   * Renova tokens usando o refresh token
   * @param {string} userId - ID do usuário
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object>} Novos tokens
   */
  async refreshTokens(userId, refreshToken) {
    try {
      this.oauth2Client.setCredentials({
        refresh_token: refreshToken
      });

      const { credentials } = await this.oauth2Client.refreshAccessToken();
      
      // Salvar novos tokens
      await this.saveTokens(userId, credentials);
      
      logger.info('Tokens renovados com sucesso para usuário:', userId);
      return credentials;
    } catch (error) {
      logger.error('Erro ao renovar tokens:', error);
      throw error;
    }
  }

  /**
   * Remove tokens do YouTube para um usuário
   * @param {string} userId - ID do usuário
   * @returns {Promise<boolean>} Success
   */
  async removeTokens(userId) {
    try {
      const result = await db.YouTubeToken.destroy({
        where: { userId }
      });

      logger.info('Tokens removidos para usuário:', userId);
      return result > 0;
    } catch (error) {
      logger.error('Erro ao remover tokens:', error);
      throw error;
    }
  }

  /**
   * Verifica se um usuário tem tokens válidos
   * @param {string} userId - ID do usuário
   * @returns {Promise<boolean>} Se tem tokens válidos
   */
  async hasValidTokens(userId) {
    try {
      const tokens = await this.getTokens(userId);
      return tokens !== null;
    } catch (error) {
      logger.error('Erro ao verificar tokens:', error);
      return false;
    }
  }
}

module.exports = new TokenService(); 