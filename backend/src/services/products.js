const { Product } = require('../models')
const { Op } = require('sequelize')

class ProductService {
  async getAllProducts(options = {}) {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = options

    const offset = (page - 1) * limit
    const where = {}

    // Add category filter
    if (category) {
      where.category = category
    }

    // Add search filter (using LIKE for SQLite compatibility)
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ]
    }

    const { count, rows } = await Product.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
      attributes: { exclude: ['updatedAt'] }
    })

    return {
      products: rows,
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(count / limit)
    }
  }

  async getProductById(id) {
    const product = await Product.findByPk(id, {
      attributes: { exclude: ['updatedAt'] }
    })

    if (!product) {
      throw new Error('Product not found')
    }

    return product
  }

  async createProduct(productData) {
    const product = await Product.create(productData)
    return product
  }

  async updateProduct(id, productData) {
    const product = await Product.findByPk(id)
    
    if (!product) {
      throw new Error('Product not found')
    }

    await product.update(productData)
    return product
  }

  async deleteProduct(id) {
    const product = await Product.findByPk(id)
    
    if (!product) {
      throw new Error('Product not found')
    }

    await product.destroy()
    return { message: 'Product deleted successfully' }
  }

  async getCategories() {
    const categories = await Product.findAll({
      attributes: ['category'],
      group: ['category'],
      raw: true
    })

    return categories.map(item => item.category)
  }

  async getFeaturedProducts(limit = 6) {
    const products = await Product.findAll({
      where: { inStock: true },
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['updatedAt'] }
    })

    return products
  }
}

module.exports = new ProductService() 