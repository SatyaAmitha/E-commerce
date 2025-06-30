'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import LoginForm from '@/components/features/LoginForm'
import { cartService, CartItem } from '@/services/cart'

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
    loadCartItems()
  }, [])

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }

  const loadCartItems = async () => {
    try {
      const items = await cartService.getCart()
      setCartItems(items)
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getShippingCost = () => {
    const subtotal = getSubtotal()
    return subtotal >= 75 ? 0 : 10 // Free shipping over $75
  }

  const getTotalPrice = () => {
    return getSubtotal() + getShippingCost()
  }

  const handleLoginComplete = () => {
    setIsLoginOpen(false)
    checkAuthStatus()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading checkout...</div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
            <Button
              onClick={() => router.push('/shop')}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <LoginForm onClose={handleLoginComplete} />
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <div className="w-[100px]"></div> {/* This div helps center the title */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${item.color}-${index}`} 
                      className="flex items-center space-x-4 py-4 border-b last:border-0"
                    >
                      <img
                        src={item.image || '/api/placeholder/80/80'}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          {item.size && <div>Size: {item.size}</div>}
                          {item.color && <div>Color: {item.color}</div>}
                          <div>Quantity: {item.quantity}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {getShippingCost() === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${getShippingCost().toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  {getShippingCost() > 0 && (
                    <div className="text-sm text-gray-500">
                      Add ${(75 - getSubtotal()).toFixed(2)} more for free shipping
                    </div>
                  )}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      if (!isAuthenticated) {
                        setIsLoginOpen(true)
                        return
                      }
                    }}
                    className="w-full bg-gray-400 hover:bg-gray-400 cursor-not-allowed text-white mt-6"
                    disabled={true}
                  >
                    {isAuthenticated ? 'Payment Coming Soon' : 'Login to Checkout'}
                  </Button>

                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Payment System Under Development
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 