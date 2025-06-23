const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        unique: true,
        fields: ['google_id']
      }
    ]
  });

  User.associate = (models) => {
    User.hasMany(models.YouTubeToken, {
      foreignKey: 'userId',
      as: 'youtubeTokens'
    });
    User.hasMany(models.YouTubeChannel, {
      foreignKey: 'userId',
      as: 'youtubeChannels'
    });
    User.hasMany(models.Guest, {
      foreignKey: 'userId',
      as: 'guests'
    });
  };

  return User;
}; 