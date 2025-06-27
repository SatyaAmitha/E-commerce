const { Cart, Product } = require('../models')

class CartService {
  async getUserCart(userId) {
    try {
      const cartItems = await Cart.findAll({
        where: { userId },
        include: [{
          model: Product,
          attributes: ['id', 'name', 'price', 'image', 'inStock', 'stockQuantity']
        }],
        order: [['createdAt', 'DESC']]
      })

      // Map cart items to include all necessary product information
      return cartItems.map(item => {
        if (!item.Product) {
          return null
        }

        return {
          id: item.Product.id,
          name: item.Product.name,
          price: item.Product.price,
          image: item.Product.image,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          inStock: item.Product.inStock,
          stockQuantity: item.Product.stockQuantity
        }
      }).filter(Boolean) // Remove any null items (in case product was deleted)
    } catch (error) {
      console.error('Error getting user cart:', error.message)
      throw error
    }
  }

  async addToCart(userId, productId, quantity, size, color) {
    try {
      // Check if product exists and is in stock
      const product = await Product.findByPk(productId)
      if (!product) {
        throw new Error('Product not found')
      }
      if (!product.inStock) {
        throw new Error('Product is out of stock')
      }

      const [cartItem, created] = await Cart.findOrCreate({
        where: { 
          userId,
          productId,
          size: size || null,
          color: color || null
        },
        defaults: { quantity }
      })

      if (!created) {
        // Update quantity if item already exists
        const newQuantity = cartItem.quantity + quantity
        if (newQuantity > product.stockQuantity) {
          throw new Error('Not enough stock available')
        }
        await cartItem.update({
          quantity: newQuantity
        })
      } else {
        // Check quantity for new items
        if (quantity > product.stockQuantity) {
          throw new Error('Not enough stock available')
        }
      }

      // Return full cart item with product details
      const updatedCartItem = await Cart.findOne({
        where: { id: cartItem.id },
        include: [{
          model: Product,
          attributes: ['id', 'name', 'price', 'image', 'inStock', 'stockQuantity']
        }]
      })

      return {
        id: updatedCartItem.Product.id,
        name: updatedCartItem.Product.name,
        price: updatedCartItem.Product.price,
        image: updatedCartItem.Product.image,
        quantity: updatedCartItem.quantity,
        size: updatedCartItem.size,
        color: updatedCartItem.color,
        inStock: updatedCartItem.Product.inStock,
        stockQuantity: updatedCartItem.Product.stockQuantity
      }
    } catch (error) {
      console.error('Error adding to cart:', error.message)
      throw error
    }
  }

  async updateCartItem(userId, productId, quantity, size, color) {
    try {
      const cartItem = await Cart.findOne({
        where: {
          userId,
          productId,
          size: size || null,
          color: color || null
        }
      })

      if (!cartItem) {
        throw new Error('Cart item not found')
      }

      if (quantity <= 0) {
        await cartItem.destroy()
        return null
      }

      await cartItem.update({ quantity })
      return cartItem
    } catch (error) {
      console.error('Error updating cart item:', error.message)
      throw error
    }
  }

  async removeFromCart(userId, productId, size, color) {
    try {
      const result = await Cart.destroy({
        where: {
          userId,
          productId,
          size: size || null,
          color: color || null
        }
      })
      return result > 0
    } catch (error) {
      console.error('Error removing from cart:', error.message)
      throw error
    }
  }

  async clearCart(userId) {
    try {
      await Cart.destroy({
        where: { userId }
      })
      return true
    } catch (error) {
      console.error('Error clearing cart:', error.message)
      throw error
    }
  }
}

module.exports = new CartService() 