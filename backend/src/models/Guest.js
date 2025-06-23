const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Guest = sequelize.define('Guest', {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    socialMedia: {
      type: DataTypes.JSON,
      defaultValue: {},
      allowNull: true,
      comment: 'JSON object with social media profiles {instagram: "", twitter: "", linkedin: "", etc}'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: true
    }
  }, {
    tableName: 'guests',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['user_id']
      },
      {
        fields: ['name']
      },
      {
        fields: ['email']
      }
    ]
  });

  Guest.associate = (models) => {
    Guest.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  // Método para buscar por tags
  Guest.findByTags = function(userId, tags) {
    return this.findAll({
      where: {
        userId,
        tags: {
          [sequelize.Op.overlap]: tags
        }
      }
    });
  };

  // Método para adicionar tags
  Guest.prototype.addTags = async function(newTags) {
    const uniqueTags = [...new Set([...this.tags, ...newTags])];
    this.tags = uniqueTags;
    return await this.save();
  };

  return Guest;
}; 