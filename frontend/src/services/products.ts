import api from './api'

export interface Product {
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

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
}

export interface CreateProductData {
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
}

export const productsService = {
  async getProducts(params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  }): Promise<ProductsResponse> {
    const response = await api.get('/products', { params })
    return response.data
  },

  async getProduct(id: number): Promise<Product> {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  async createProduct(data: CreateProductData): Promise<Product> {
    const response = await api.post('/products', data)
    return response.data
  },

  async updateProduct(id: number, data: Partial<CreateProductData>): Promise<Product> {
    const response = await api.put(`/products/${id}`, data)
    return response.data
  },

  async deleteProduct(id: number): Promise<void> {
    await api.delete(`/products/${id}`)
  },

  async getCategories(): Promise<string[]> {
    const response = await api.get('/products/categories')
    return response.data
  }
} 