const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const YouTubeToken = sequelize.define('YouTubeToken', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Encrypted access token'
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Encrypted refresh token'
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    scope: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'youtube_tokens',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['user_id']
      },
      {
        fields: ['expires_at']
      }
    ]
  });

  YouTubeToken.associate = (models) => {
    YouTubeToken.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  // Método para verificar se o token está expirado
  YouTubeToken.prototype.isExpired = function() {
    return new Date() >= this.expiresAt;
  };

  // Método para verificar se precisa renovar (5 minutos antes de expirar)
  YouTubeToken.prototype.needsRefresh = function() {
    const fiveMinutesFromNow = new Date(Date.now() + 5 * 60 * 1000);
    return fiveMinutesFromNow >= this.expiresAt;
  };

  return YouTubeToken;
}; 