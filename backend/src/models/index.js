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

// Define associations
const models = { User, Product }

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
    console.log('✅ Database connection established successfully')
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error)
  }
}

// Sync database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true })
    console.log('📊 Database synchronized successfully')
  } catch (error) {
    console.error('❌ Database sync failed:', error)
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
  initDatabase
} 