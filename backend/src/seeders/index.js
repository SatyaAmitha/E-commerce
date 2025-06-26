const { initDatabase } = require('../models')
const seedProducts = require('./products')

const runSeeders = async () => {
  try {
    console.log('🌱 Starting database seeding...')
    
    // Initialize database first
    await initDatabase()
    
    // Run seeders
    await seedProducts()
    
    console.log('✅ Database seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Database seeding failed:', error)
    process.exit(1)
  }
}

// Run seeders if this file is executed directly
if (require.main === module) {
  runSeeders()
}

module.exports = runSeeders 