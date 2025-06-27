import api from './api'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

class CartService {
  private getLocalCart(): CartItem[] {
    try {
      const cart = localStorage.getItem('cart')
      return cart ? JSON.parse(cart) : []
    } catch (error) {
      console.error('Error reading local cart:', error)
      return []
    }
  }

  private setLocalCart(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  private async syncWithBackend() {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await api.get('/cart')
      const backendCart = response.data
      this.setLocalCart(backendCart)
      
      // Dispatch cart update event to refresh UI
      window.dispatchEvent(new CustomEvent('cartUpdated'))
    } catch (error) {
      console.error('Error syncing with backend:', error)
    }
  }

  async getCart(): Promise<CartItem[]> {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        return this.getLocalCart()
      }

      const response = await api.get('/cart')
      return response.data
    } catch (error) {
      console.error('Error fetching cart:', error)
      return this.getLocalCart()
    }
  }

  async addToCart(item: CartItem): Promise<void> {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        const cart = this.getLocalCart()
        const existingItem = cart.find(i => 
          i.id === item.id && 
          i.size === item.size && 
          i.color === item.color
        )

        if (existingItem) {
          existingItem.quantity += item.quantity
        } else {
          cart.push(item)
        }
        this.setLocalCart(cart)
        return
      }

      await api.post('/cart/add', {
        productId: item.id,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      })
      await this.syncWithBackend()
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  async updateQuantity(item: CartItem, quantity: number): Promise<void> {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        const cart = this.getLocalCart()
        const existingItem = cart.find(i => 
          i.id === item.id && 
          i.size === item.size && 
          i.color === item.color
        )

        if (existingItem) {
          if (quantity <= 0) {
            this.removeFromCart(item)
            return
          }
          existingItem.quantity = quantity
          this.setLocalCart(cart)
        }
        return
      }

      await api.put('/cart/update', {
        productId: item.id,
        quantity,
        size: item.size,
        color: item.color
      })
      await this.syncWithBackend()
    } catch (error) {
      console.error('Error updating cart quantity:', error)
    }
  }

  async removeFromCart(item: CartItem): Promise<void> {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        const cart = this.getLocalCart()
        const updatedCart = cart.filter(i => 
          !(i.id === item.id && 
            i.size === item.size && 
            i.color === item.color)
        )
        this.setLocalCart(updatedCart)
        return
      }

      await api.delete('/cart/remove', {
        data: {
          productId: item.id,
          size: item.size,
          color: item.color
        }
      })
      await this.syncWithBackend()
    } catch (error) {
      console.error('Error removing from cart:', error)
    }
  }

  async clearCart(): Promise<void> {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        localStorage.removeItem('cart')
        window.dispatchEvent(new CustomEvent('cartUpdated'))
        return
      }

      await api.delete('/cart/clear')
      localStorage.removeItem('cart')
      window.dispatchEvent(new CustomEvent('cartUpdated'))
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  // Call this when user logs in
  async syncCartOnLogin(): Promise<void> {
    const localCart = this.getLocalCart()
    if (localCart.length === 0) {
      await this.syncWithBackend()
      return
    }

    try {
      // Add local cart items to backend
      for (const item of localCart) {
        await api.post('/cart/add', {
          productId: item.id,
          quantity: item.quantity,
          size: item.size,
          color: item.color
        })
      }

      // Clear local cart and sync with backend
      localStorage.removeItem('cart')
      await this.syncWithBackend()
    } catch (error) {
      console.error('Error syncing cart on login:', error)
    }
  }
}

export const cartService = new CartService() 