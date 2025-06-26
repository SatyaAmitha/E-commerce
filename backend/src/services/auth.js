const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

class AuthService {
  async register(userData) {
    const { name, email, password } = userData

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      throw new Error('User already exists with this email')
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    // Generate token
    const token = this.generateToken(user.id)

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      token
    }
  }

  async login(email, password) {
    // Find user
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw new Error('Invalid credentials')
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw new Error('Invalid credentials')
    }

    // Generate token
    const token = this.generateToken(user.id)

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      token
    }
  }

  async getUserById(userId) {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'createdAt']
    })
    
    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  generateToken(userId) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
}

module.exports = new AuthService()