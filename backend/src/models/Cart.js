module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1
      }
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'carts',
    timestamps: true,
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['productId']
      }
    ]
  })

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: 'userId' })
    Cart.belongsTo(models.Product, { foreignKey: 'productId' })
  }

  return Cart
} 