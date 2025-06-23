const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const YouTubeChannel = sequelize.define('YouTubeChannel', {
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
    channelId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      comment: 'YouTube Channel ID'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    subscriberCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    videoCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    viewCount: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastSyncedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'youtube_channels',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['channel_id']
      },
      {
        fields: ['user_id']
      }
    ]
  });

  YouTubeChannel.associate = (models) => {
    YouTubeChannel.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  // Método para verificar se precisa sincronizar (24 horas)
  YouTubeChannel.prototype.needsSync = function() {
    if (!this.lastSyncedAt) return true;
    
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.lastSyncedAt < twentyFourHoursAgo;
  };

  return YouTubeChannel;
}; 