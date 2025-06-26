'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { authService } from '@/services/auth'

interface LoginFormProps {
  onClose: () => void
}

export default function LoginForm({ onClose }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (isLogin) {
        const result = await authService.login({ 
          email: formData.email, 
          password: formData.password 
        })
        localStorage.setItem('user', JSON.stringify(result.user))
        localStorage.setItem('token', result.token)
      } else {
        const result = await authService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
        localStorage.setItem('user', JSON.stringify(result.user))
        localStorage.setItem('token', result.token)
      }
      
      window.location.reload()
      onClose()
    } catch (error: any) {
      setError(error.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <DialogHeader className="text-center mb-6">
        <DialogTitle className="text-2xl font-bold text-gray-900">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </DialogTitle>
        <DialogDescription className="text-center text-gray-600">
          {isLogin ? 'Sign in to your Amigo account' : 'Join Amigo today'}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required={!isLogin}
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="w-full focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors font-medium"
          disabled={isLoading}
        >
          {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
        </Button>

        {/* Google Sign-In Setup Instructions */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Google Sign-In</span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm">
          <p className="text-blue-800 font-medium mb-2">🔧 Google Sign-In Setup Required</p>
          <p className="text-blue-700 mb-2">To enable Google Sign-In:</p>
          <ol className="text-blue-700 list-decimal list-inside space-y-1">
            <li>Go to <a href="https://console.developers.google.com" target="_blank" className="underline">Google Cloud Console</a></li>
            <li>Create a new project or select existing one</li>
            <li>Enable Google+ API</li>
            <li>Create OAuth 2.0 credentials</li>
            <li>Add your domain to authorized origins</li>
            <li>Set NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local</li>
          </ol>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </form>
    </div>
  )
} 