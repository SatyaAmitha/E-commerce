'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { productsService } from '@/services/products'
import { useCartAnimation } from '@/components/ui/cart-animation'

// Debounce function
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

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

export default function ShopPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { isAnimating, triggerAnimation, CartAnimationComponent } = useCartAnimation()

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'bags', label: 'Bags' }
  ]

  // Initialize search term from URL params
  useEffect(() => {
    const urlSearch = searchParams.get('search')
    if (urlSearch) {
      setSearchTerm(urlSearch)
      // Trigger immediate search for URL params
      fetchProducts()
    }
  }, [searchParams])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        limit: 9,
        search: searchTerm || undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined
      }
      
      const response = await productsService.getProducts(params)
      setProducts(response.products)
      setTotalPages(Math.ceil(response.total / 9))
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  // Create a stable debounced function
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const params = {
        page: 1,
        limit: 9,
        search: term || undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined
      }
      
      // Only show loading for significant changes, not for every keystroke
      productsService.getProducts(params)
        .then(response => {
          setProducts(response.products)
          setTotalPages(Math.ceil(response.total / 9))
          setCurrentPage(1)
        })
        .catch(error => {
          console.error('Error fetching products:', error)
        })
    }, 300),
    [selectedCategory]
  )

  // Fetch products when category or page changes immediately
  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, currentPage])

  // Handle search term changes with debounce
  useEffect(() => {
    if (searchTerm !== (searchParams.get('search') || '')) {
      debouncedSearch(searchTerm)
    }
  }, [searchTerm, debouncedSearch, searchParams])

  const handleAddToCart = (product: Product) => {
    // Get existing cart
    const existingCart = localStorage.getItem('cart')
    let cart = existingCart ? JSON.parse(existingCart) : []

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex((item: any) => item.id === product.id)
    
    if (existingItemIndex > -1) {
      // Update quantity
      cart[existingItemIndex].quantity += 1
    } else {
      // Add new item
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      })
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart))

    // Trigger animation instead of alert
    triggerAnimation()

    // Dispatch cart update event
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const handleProductClick = (productId: number) => {
    router.push(`/shop/${productId}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    // Don't call fetchProducts here as it will be handled by useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Cart Animation */}
      <CartAnimationComponent />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop Our Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of premium fashion pieces designed for the modern lifestyle.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 focus:ring-teal-500 focus:border-teal-500"
                />
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">
                  Search
                </Button>
              </div>
            </form>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Loading products...</div>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div 
                    className="aspect-square relative cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img
                      src={product.image || '/api/placeholder/400/400'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded text-sm font-semibold">
                        SALE
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 
                      className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-teal-600 transition-colors"
                      onClick={() => handleProductClick(product.id)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-teal-600">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock || isAnimating}
                        className="bg-teal-600 hover:bg-teal-700 text-white disabled:bg-gray-400"
                      >
                        {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  className="text-teal-600 border-teal-600 hover:bg-teal-50"
                >
                  Previous
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    variant={currentPage === page ? "default" : "outline"}
                    className={currentPage === page 
                      ? "bg-teal-600 hover:bg-teal-700 text-white" 
                      : "text-teal-600 border-teal-600 hover:bg-teal-50"
                    }
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  className="text-teal-600 border-teal-600 hover:bg-teal-50"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600 mb-4">No products found</div>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
} 