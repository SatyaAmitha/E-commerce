import api from './api'

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data)
    const { token } = response.data
    localStorage.setItem('token', token)
    return response.data
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data)
    const { token } = response.data
    localStorage.setItem('token', token)
    return response.data
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout')
    localStorage.removeItem('token')
  },

  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile')
    return response.data.user
  },

  async refreshToken(): Promise<{ token: string }> {
    const response = await api.post('/auth/refresh')
    return response.data
  }
} 