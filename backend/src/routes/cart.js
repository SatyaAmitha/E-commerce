const express = require('express')
const router = express.Router()
const cartService = require('../services/cart')
const { authenticateToken } = require('../middleware/auth')
const { User, Product, Cart } = require('../models')

// Get user's cart
router.get('/', authenticateToken, async (req, res) => {
  try {
    const cartItems = await cartService.getUserCart(req.user.userId)
    res.json(cartItems)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart' })
  }
})

// Add item to cart
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity = 1, size, color } = req.body
    const userId = req.user.userId

    // Verify user exists
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Verify product exists and get stock info
    const product = await Product.findByPk(productId)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    if (!product.inStock || product.stockQuantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' })
    }

    // Check if item already exists in cart
    const existingCartItem = await Cart.findOne({
      where: {
        userId,
        productId,
        size: size || null,
        color: color || null
      }
    })

    if (existingCartItem) {
      // Update quantity
      const newQuantity = existingCartItem.quantity + quantity
      if (product.stockQuantity < newQuantity) {
        return res.status(400).json({ error: 'Insufficient stock for requested quantity' })
      }
      
      existingCartItem.quantity = newQuantity
      await existingCartItem.save()
      
      res.json({ message: 'Cart updated successfully', cartItem: existingCartItem })
    } else {
      // Create new cart item
      const cartItem = await Cart.create({
        userId,
        productId,
        quantity,
        size: size || null,
        color: color || null
      })
      
      res.status(201).json({ message: 'Item added to cart successfully', cartItem })
    }
  } catch (error) {
    console.error('Error adding to cart:', error)
    res.status(500).json({ error: 'Failed to add item to cart' })
  }
})

// Update cart item
router.put('/update', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body
    const cartItem = await cartService.updateCartItem(req.user.userId, productId, quantity, size, color)
    res.json(cartItem)
  } catch (error) {
    res.status(500).json({ error: 'Error updating cart item' })
  }
})

// Remove item from cart
router.delete('/remove', authenticateToken, async (req, res) => {
  try {
    const { productId, size, color } = req.body
    const success = await cartService.removeFromCart(req.user.userId, productId, size, color)
    res.json({ success })
  } catch (error) {
    res.status(500).json({ error: 'Error removing from cart' })
  }
})

// Clear cart
router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    await cartService.clearCart(req.user.userId)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Error clearing cart' })
  }
})

module.exports = router 