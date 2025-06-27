const { Sequelize } = require('sequelize')
const path = require('path')

// Database connection - Using environment configuration
const dbPath = process.env.DATABASE_URL 
  ? process.env.DATABASE_URL.replace('sqlite:', '') 
  : path.join(__dirname, '../../database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath.startsWith('sqlite:') ? dbPath.replace('sqlite:', '') : dbPath,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
})

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes)
const Product = require('./Product')(sequelize, Sequelize.DataTypes)
const Cart = require('./Cart')(sequelize, Sequelize.DataTypes)

// Define associations
const models = { User, Product, Cart }

// Set up associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection established successfully')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

// Sync database
const syncDatabase = async () => {
  try {
    // Use alter mode for schema changes without data loss
    await sequelize.sync({ alter: true })
    console.log('Database synchronized successfully')
    
    // Check if products table is empty and seed if needed
    const productCount = await Product.count()
    if (productCount === 0) {
      console.log('No products found, running seeder...')
      // Import and run seeder
      const seedProducts = require('../seeders/products')
      await seedProducts()
      console.log('Products seeded automatically!')
    } else {
      console.log(`Database has ${productCount} products`)
    }
  } catch (error) {
    console.error('❌ Database sync failed:', error.message)
    // If alter fails, try a gentle approach
    try {
      console.log('Trying basic sync...')
      await sequelize.sync()
      console.log('Basic sync successful')
    } catch (basicError) {
      console.error('Basic sync also failed:', basicError.message)
      throw error
    }
  }
}

// Initialize database
const initDatabase = async () => {
  await testConnection()
  await syncDatabase()
}

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  initDatabase
} 