'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import LoginForm from "@/components/features/LoginForm"
import Cart from "@/components/features/Cart"
import Logo from "@/components/ui/logo"

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()
  const pathname = usePathname()

  // Determine active tab based on current pathname
  const getActiveTab = () => {
    if (pathname === '/') return 'home'
    if (pathname.startsWith('/shop')) return 'shop'
    if (pathname.startsWith('/about')) return 'about'
    if (pathname.startsWith('/contact')) return 'contact'
    return 'home'
  }

  const activeTab = getActiveTab()

  useEffect(() => {
    // Check for logged in user
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Update cart count
    const updateCartCount = () => {
      const cart = localStorage.getItem('cart')
      if (cart) {
        const cartItems = JSON.parse(cart)
        const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)
        setCartCount(totalItems)
      } else {
        setCartCount(0)
      }
    }

    updateCartCount()
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount)
    return () => window.removeEventListener('cartUpdated', updateCartCount)
  }, [])

  const handleNavigation = (tab: string, path: string) => {
    router.push(path)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    router.push('/')
  }

  return (
    <header className="bg-white shadow-sm">
      {/* Top promotional banner */}
      <div className="bg-teal-500 text-white text-center py-2 text-sm font-medium">
        Free shipping on orders over $75 | Shop now and save!
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size="md" />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => handleNavigation('home', '/')}
              className={`text-gray-700 hover:text-teal-600 font-medium transition-colors px-3 py-2 rounded-md ${
                activeTab === 'home' ? 'text-teal-600 bg-teal-50' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('shop', '/shop')}
              className={`text-gray-700 hover:text-teal-600 font-medium transition-colors px-3 py-2 rounded-md ${
                activeTab === 'shop' ? 'text-teal-600 bg-teal-50' : ''
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => handleNavigation('about', '/about')}
              className={`text-gray-700 hover:text-teal-600 font-medium transition-colors px-3 py-2 rounded-md ${
                activeTab === 'about' ? 'text-teal-600 bg-teal-50' : ''
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavigation('contact', '/contact')}
              className={`text-gray-700 hover:text-teal-600 font-medium transition-colors px-3 py-2 rounded-md ${
                activeTab === 'contact' ? 'text-teal-600 bg-teal-50' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right side - Search, Account, Cart */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64 bg-white text-gray-900"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const searchTerm = e.currentTarget.value
                      if (searchTerm.trim()) {
                        router.push(`/shop?search=${encodeURIComponent(searchTerm)}`)
                        e.currentTarget.value = '' // Clear header search after navigation
                      } else {
                        router.push('/shop')
                      }
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    const searchTerm = input.value
                    if (searchTerm.trim()) {
                      router.push(`/shop?search=${encodeURIComponent(searchTerm)}`)
                      input.value = '' // Clear header search after navigation
                    } else {
                      router.push('/shop')
                    }
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Account */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 font-medium">Welcome, {user.name}</span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="text-teal-600 border-teal-600 hover:bg-teal-50 font-medium bg-white"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50 font-medium bg-white">
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white">
                  <LoginForm onClose={() => setIsLoginOpen(false)} />
                </DialogContent>
              </Dialog>
            )}

            {/* Cart */}
            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50 font-medium relative bg-white">
                  Cart ({cartCount})
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
                <div className="sr-only">
                  <DialogHeader>
                    <DialogTitle>Shopping Cart</DialogTitle>
                  </DialogHeader>
                </div>
                <Cart onClose={() => setIsCartOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  )
} 