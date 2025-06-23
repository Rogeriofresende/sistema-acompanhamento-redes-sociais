const CryptoJS = require('crypto-js');

class EncryptionService {
  constructor() {
    // Usar uma chave de criptografia do ambiente ou gerar uma padrão (não recomendado para produção)
    this.secretKey = process.env.ENCRYPTION_KEY || 'sistema-lancei-essa-default-key-2025';
    
    if (!process.env.ENCRYPTION_KEY) {
      console.warn('⚠️  AVISO: Usando chave de criptografia padrão. Configure ENCRYPTION_KEY no .env para produção!');
    }
  }

  /**
   * Criptografa um texto
   * @param {string} text - Texto a ser criptografado
   * @returns {string} Texto criptografado
   */
  encrypt(text) {
    if (!text) return null;
    
    try {
      const encrypted = CryptoJS.AES.encrypt(text, this.secretKey).toString();
      return encrypted;
    } catch (error) {
      console.error('Erro ao criptografar:', error);
      throw new Error('Falha na criptografia');
    }
  }

  /**
   * Descriptografa um texto
   * @param {string} encryptedText - Texto criptografado
   * @returns {string} Texto descriptografado
   */
  decrypt(encryptedText) {
    if (!encryptedText) return null;
    
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedText, this.secretKey);
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Erro ao descriptografar:', error);
      throw new Error('Falha na descriptografia');
    }
  }

  /**
   * Criptografa um objeto (útil para JSONs)
   * @param {Object} obj - Objeto a ser criptografado
   * @returns {string} Objeto criptografado como string
   */
  encryptObject(obj) {
    const jsonString = JSON.stringify(obj);
    return this.encrypt(jsonString);
  }

  /**
   * Descriptografa um objeto
   * @param {string} encryptedText - Texto criptografado
   * @returns {Object} Objeto descriptografado
   */
  decryptObject(encryptedText) {
    const decryptedString = this.decrypt(encryptedText);
    try {
      return JSON.parse(decryptedString);
    } catch (error) {
      console.error('Erro ao fazer parse do objeto descriptografado:', error);
      return null;
    }
  }

  /**
   * Gera uma chave de criptografia aleatória (para configuração inicial)
   * @returns {string} Chave aleatória
   */
  static generateKey() {
    return CryptoJS.lib.WordArray.random(256/8).toString();
  }
}

// Exportar como singleton
module.exports = new EncryptionService(); 