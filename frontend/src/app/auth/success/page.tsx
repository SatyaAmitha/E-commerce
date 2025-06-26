'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthSuccess() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    const userString = searchParams.get('user')

    if (token && userString) {
      try {
        const user = JSON.parse(decodeURIComponent(userString))
        
        // Store token and user data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        // Dispatch storage event to update other components
        window.dispatchEvent(new Event('storage'))

        // Redirect to home page
        router.push('/')
      } catch (error) {
        console.error('Error processing OAuth callback:', error)
        router.push('/login?error=oauth_failed')
      }
    } else {
      router.push('/login?error=oauth_failed')
    }
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  )
} 