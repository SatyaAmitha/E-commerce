'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { productsService } from '@/services/products'
import { AddToCartButton } from '@/components/ui/cart-animation'

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

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size: string
  color: string
}

export default function ProductDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const
  const colors = ['Black', 'White', 'Navy', 'Gray', 'Beige'] as const

  const fetchProduct = useCallback(async () => {
    try {
      const productData = await productsService.getProduct(Number(params.id))
      setProduct(productData)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id, fetchProduct])

  const handleAddToCart = () => {
    if (!product) return

    // Get existing cart
    const existingCart = localStorage.getItem('cart')
    const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : []

    const existingItemIndex = cart.findIndex(item => 
      item.id === product.id && item.size === selectedSize && item.color === selectedColor
    )
    
    if (existingItemIndex > -1) {
      // Update quantity
      cart[existingItemIndex].quantity += quantity
    } else {
      // Add new item
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor
      })
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart))

    // Dispatch cart update event
    window.dispatchEvent(new Event('cartUpdated'))
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Loading product...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-lg text-gray-600 mb-4">Product not found</div>
            <Button onClick={() => router.push('/shop')} className="bg-teal-600 hover:bg-teal-700 text-white">
              Back to Shop
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button onClick={() => router.push('/')} className="hover:text-teal-600">Home</button>
            <span>/</span>
            <button onClick={() => router.push('/shop')} className="hover:text-teal-600">Shop</button>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square relative">
            <Image
              src={product.image || '/api/placeholder/600/600'}
              alt={product.name}
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-teal-600">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">${product.originalPrice}</span>
                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      py-2 px-3 border rounded-md text-sm font-medium transition-colors
                      ${selectedSize === size
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-teal-300'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      py-2 px-4 border rounded-md text-sm font-medium transition-colors
                      ${selectedColor === color
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-teal-300'
                      }
                    `}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-4">
              <AddToCartButton
                onAddToCart={handleAddToCart}
                inStock={product.inStock}
                requiresSelection={true}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                size="lg"
                className="w-full py-3 text-lg font-semibold"
              />
              
              {!product.inStock && (
                <p className="text-red-600 text-sm text-center">This item is currently out of stock</p>
              )}
            </div>

            {/* Product Info */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <span className="text-gray-900 capitalize">{product.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Availability:</span>
                <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 