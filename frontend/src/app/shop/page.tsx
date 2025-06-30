'use client'

import { Suspense } from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { productsService } from '@/services/products'
import { cartService } from '@/services/cart'
import { AddToCartButton } from '@/components/ui/cart-animation'

// Debounce function with proper types
function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
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

interface SearchParams {
  page: number
  limit: number
  search?: string
  category?: string
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    </div>
  )
}

function ShopPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'bags', label: 'Bags' }
  ] as const

  const fetchProducts = useCallback(async (params: SearchParams) => {
    try {
      setLoading(true)
      const response = await productsService.getProducts(params)
      setProducts(response.products)
      setTotalPages(Math.ceil(response.total / params.limit))
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initialize search term from URL params
  useEffect(() => {
    const urlSearch = searchParams.get('search')
    if (urlSearch) {
      setSearchTerm(urlSearch)
      fetchProducts({
        page: currentPage,
        limit: 9,
        search: urlSearch,
        category: selectedCategory !== 'all' ? selectedCategory : undefined
      })
    }
  }, [searchParams, currentPage, selectedCategory, fetchProducts])

  // Create a stable debounced function
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const params: SearchParams = {
        page: 1,
        limit: 9,
        search: term || undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined
      }
      
      fetchProducts(params)
    }, 300),
    [selectedCategory, fetchProducts]
  )

  // Fetch products when category or page changes immediately
  useEffect(() => {
    const params: SearchParams = {
      page: currentPage,
      limit: 9,
      search: searchTerm || undefined,
      category: selectedCategory !== 'all' ? selectedCategory : undefined
    }
    fetchProducts(params)
  }, [selectedCategory, currentPage, searchTerm, fetchProducts])

  // Handle search term changes with debounce
  useEffect(() => {
    if (searchTerm !== (searchParams.get('search') || '')) {
      debouncedSearch(searchTerm)
    }
  }, [searchTerm, debouncedSearch, searchParams])

  const handleAddToCart = async (product: Product) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        // If not logged in, still add to local cart
        await cartService.addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      } else {
        // If logged in, add to backend cart
        await cartService.addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }
      
      // Toast or notification can be added here
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleProductClick = (productId: number) => {
    router.push(`/shop/${productId}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    // Don't call fetchProducts here as it will be handled by useEffect
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div 
                className="cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="aspect-square relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                      Sale
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <AddToCartButton
                  onAddToCart={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  inStock={product.inStock}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Previous
            </Button>
            <span className="px-4 py-2 bg-white rounded-md border">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopPageContent />
    </Suspense>
  )
} 