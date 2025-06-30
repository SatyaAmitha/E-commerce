'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { toast, Toaster } from 'sonner'
import Header from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import LoginForm from '@/components/features/LoginForm'
import { productsService } from '@/services/products'
import { authService } from '@/services/auth'

interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
  createdAt: string
}

export default function Home() {
  const router = useRouter()
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  useEffect(() => {
    fetchFeaturedProducts()
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        await authService.getProfile() // This will throw an error if token is invalid
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Authentication check failed:', error)
      setIsAuthenticated(false)
    }
  }

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productsService.getProducts({ limit: 6 })
      setFeaturedProducts(response.products)
    } catch (error) {
      console.error('Error fetching featured products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProductClick = (productId: number) => {
    router.push(`/shop/${productId}`)
  }

  const handleShopNow = () => {
    router.push('/shop')
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }
    
    if (!isAuthenticated) {
      // Store the email temporarily
      sessionStorage.setItem('pendingSubscriptionEmail', email)
      setIsLoginOpen(true)
      return
    }

    // Mock subscription success
    toast.success('Thanks for subscribing! We will keep you updated with the latest news.')
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" />
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <LoginForm onClose={() => {
            setIsLoginOpen(false)
            checkAuthStatus() // Recheck auth status after login
            
            // Check for pending subscription
            const pendingEmail = sessionStorage.getItem('pendingSubscriptionEmail')
            if (pendingEmail) {
              setEmail(pendingEmail)
              sessionStorage.removeItem('pendingSubscriptionEmail')
              // Submit the subscription
              toast.success('Thanks for subscribing! We will keep you updated with the latest news.')
              setEmail('')
            }
          }} />
        </DialogContent>
      </Dialog>
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white hero-text">
              Welcome to Amigo
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90 text-white hero-text">
              Discover premium fashion that speaks to your style. Quality craftsmanship meets modern design.
            </p>
            <p className="text-lg md:text-xl mb-8 opacity-80 text-white italic">
              &quot;Amigo&quot; - Because fashion is better with friends by your side
            </p>
            <div className="grid grid-cols-1 gap-4 text-center">
              <Link href="/shop" className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                Shop Now
              </Link>
              <Link href="/shop" className="inline-block bg-white text-teal-600 px-6 py-3 rounded-lg border border-teal-600 hover:bg-teal-50 transition-colors">
                View Collection
              </Link>
              <Link href="/shop" className="inline-block bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                Browse All
              </Link>
              <Link href="/shop" className="inline-block bg-white text-gray-800 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                See More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders over $75</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Quality Guarantee</h3>
              <p className="text-gray-600">Premium materials and expert craftsmanship</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Easy Returns</h3>
              <p className="text-gray-600">30-day hassle-free return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium fashion pieces designed for the modern lifestyle.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-lg text-gray-600">Loading products...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded text-sm font-semibold">
                        SALE
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-teal-600">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <Button 
                        size="sm"
                        className="bg-teal-600 hover:bg-teal-700 text-white"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button 
              onClick={handleShopNow}
              size="lg" 
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Stay in Style</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new collections, exclusive offers, and style tips.
            {!isAuthenticated && (
              <span className="block mt-2 text-sm text-teal-400">
                Please login to subscribe to our newsletter
              </span>
            )}
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <Button 
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-teal-600 mb-4">Amigo</h3>
              <p className="text-gray-600">
                Premium fashion for the modern lifestyle. Quality craftsmanship meets contemporary design.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/shop" className="hover:text-teal-600">All Products</a></li>
                <li><a href="/shop?category=Dresses" className="hover:text-teal-600">Dresses</a></li>
                <li><a href="/shop?category=Tops" className="hover:text-teal-600">Tops</a></li>
                <li><a href="/shop?category=Accessories" className="hover:text-teal-600">Accessories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/contact" className="hover:text-teal-600">Contact Us</a></li>
                <li><a href="/faq" className="hover:text-teal-600">FAQ</a></li>
                <li><a href="/returns" className="hover:text-teal-600">Returns</a></li>
                <li><a href="/shipping" className="hover:text-teal-600">Shipping</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-teal-600">Instagram</a></li>
                <li><a href="#" className="hover:text-teal-600">Facebook</a></li>
                <li><a href="#" className="hover:text-teal-600">Twitter</a></li>
                <li><a href="#" className="hover:text-teal-600">Pinterest</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Amigo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
