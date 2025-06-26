const express = require('express')
const productService = require('../services/products')
const { authenticateToken, requireAdmin } = require('../middleware/auth')

const router = express.Router()

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const options = {
      page: req.query.page,
      limit: req.query.limit,
      category: req.query.category,
      search: req.query.search,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder
    }

    const result = await productService.getAllProducts(options)
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get featured products (public)
router.get('/featured', async (req, res) => {
  try {
    const limit = req.query.limit || 6
    const products = await productService.getFeaturedProducts(limit)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get categories (public)
router.get('/categories', async (req, res) => {
  try {
    const categories = await productService.getCategories()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id)
    res.json(product)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

// Create product (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const productData = req.body

    // Validation
    const requiredFields = ['name', 'description', 'price', 'image', 'category']
    const missingFields = requiredFields.filter(field => !productData[field])
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      })
    }

    const product = await productService.createProduct(productData)
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update product (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body)
    res.json(product)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

// Delete product (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id)
    res.json(result)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

module.exports = router 