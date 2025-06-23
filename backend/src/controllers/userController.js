const logger = require('../config/logger');

const userController = {
  // Buscar perfil do usuário
  async getProfile(req, res) {
    try {
      const { userId } = req.params;

      // Verificar se o usuário está tentando acessar seu próprio perfil
      // ou se tem permissão para ver outros perfis
      if (userId !== req.userId && !req.isAdmin) {
        return res.status(403).json({
          error: 'Acesso negado'
        });
      }

      // Aqui você deve buscar o usuário no banco de dados
      // Por enquanto, vamos simular
      const user = {
        id: userId,
        email: 'usuario@example.com',
        name: 'Usuário Teste',
        picture: 'https://via.placeholder.com/150',
        bio: 'Criador de conteúdo',
        channelUrl: 'https://youtube.com/channel/exemplo',
        createdAt: new Date('2024-01-01'),
        stats: {
          totalVideos: 42,
          totalViews: 15000,
          subscribers: 1200
        }
      };

      logger.info(`Perfil do usuário ${userId} consultado`);

      res.json({
        success: true,
        user
      });

    } catch (error) {
      logger.error('Erro ao buscar perfil:', error);
      res.status(500).json({
        error: 'Erro ao buscar perfil do usuário'
      });
    }
  },

  // Atualizar perfil do usuário
  async updateProfile(req, res) {
    try {
      const { userId } = req.params;
      const { name, bio, channelUrl } = req.body;

      // Verificar se o usuário está tentando atualizar seu próprio perfil
      if (userId !== req.userId) {
        return res.status(403).json({
          error: 'Você só pode atualizar seu próprio perfil'
        });
      }

      // Validações básicas
      if (name && name.length < 2) {
        return res.status(400).json({
          error: 'Nome deve ter pelo menos 2 caracteres'
        });
      }

      // Aqui você deve atualizar o usuário no banco de dados
      // Por enquanto, vamos simular
      const updatedUser = {
        id: userId,
        email: 'usuario@example.com',
        name: name || 'Usuário Teste',
        bio: bio || 'Criador de conteúdo',
        channelUrl: channelUrl || 'https://youtube.com/channel/exemplo',
        updatedAt: new Date()
      };

      logger.info(`Perfil do usuário ${userId} atualizado`);

      res.json({
        success: true,
        message: 'Perfil atualizado com sucesso',
        user: updatedUser
      });

    } catch (error) {
      logger.error('Erro ao atualizar perfil:', error);
      res.status(500).json({
        error: 'Erro ao atualizar perfil'
      });
    }
  },

  // Buscar configurações do usuário
  async getSettings(req, res) {
    try {
      const userId = req.userId;

      // Aqui você deve buscar as configurações no banco de dados
      // Por enquanto, vamos simular
      const settings = {
        notifications: {
          email: true,
          push: false,
          newSubscriber: true,
          newComment: true
        },
        privacy: {
          profilePublic: true,
          showEmail: false,
          showStats: true
        },
        youtube: {
          autoSync: true,
          syncFrequency: 'daily'
        }
      };

      res.json({
        success: true,
        settings
      });

    } catch (error) {
      logger.error('Erro ao buscar configurações:', error);
      res.status(500).json({
        error: 'Erro ao buscar configurações'
      });
    }
  },

  // Atualizar configurações do usuário
  async updateSettings(req, res) {
    try {
      const userId = req.userId;
      const { notifications, privacy, youtube } = req.body;

      // Aqui você deve atualizar as configurações no banco de dados
      // Por enquanto, vamos simular
      const updatedSettings = {
        notifications: notifications || {},
        privacy: privacy || {},
        youtube: youtube || {},
        updatedAt: new Date()
      };

      logger.info(`Configurações do usuário ${userId} atualizadas`);

      res.json({
        success: true,
        message: 'Configurações atualizadas com sucesso',
        settings: updatedSettings
      });

    } catch (error) {
      logger.error('Erro ao atualizar configurações:', error);
      res.status(500).json({
        error: 'Erro ao atualizar configurações'
      });
    }
  },

  // Deletar conta do usuário
  async deleteAccount(req, res) {
    try {
      const userId = req.userId;
      const { confirmPassword } = req.body;

      // Validar senha antes de deletar
      if (!confirmPassword) {
        return res.status(400).json({
          error: 'Senha de confirmação necessária'
        });
      }

      // Aqui você deve:
      // 1. Verificar a senha
      // 2. Deletar todos os dados relacionados
      // 3. Deletar o usuário
      // Por enquanto, vamos simular

      logger.warn(`Conta do usuário ${userId} deletada`);

      res.json({
        success: true,
        message: 'Conta deletada com sucesso'
      });

    } catch (error) {
      logger.error('Erro ao deletar conta:', error);
      res.status(500).json({
        error: 'Erro ao deletar conta'
      });
    }
  },

  // Listar todos os usuários (admin)
  async listUsers(req, res) {
    try {
      // Verificar se é admin
      if (!req.isAdmin) {
        return res.status(403).json({
          error: 'Acesso negado - apenas administradores'
        });
      }

      const { page = 1, limit = 10, search = '' } = req.query;

      // Aqui você deve buscar usuários no banco com paginação
      // Por enquanto, vamos simular
      const users = [
        {
          id: '1',
          email: 'usuario1@example.com',
          name: 'Usuário 1',
          createdAt: new Date('2024-01-01'),
          lastLogin: new Date()
        },
        {
          id: '2',
          email: 'usuario2@example.com',
          name: 'Usuário 2',
          createdAt: new Date('2024-01-15'),
          lastLogin: new Date()
        }
      ];

      res.json({
        success: true,
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: 2,
          pages: 1
        }
      });

    } catch (error) {
      logger.error('Erro ao listar usuários:', error);
      res.status(500).json({
        error: 'Erro ao listar usuários'
      });
    }
  }
};

module.exports = userController; 