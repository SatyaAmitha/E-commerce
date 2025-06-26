const { Product } = require('../models')

const seedProducts = async () => {
  const products = [
    {
      name: "Flowline Dresses",
      description: "Elegant flowline dresses perfect for any occasion. Made with premium fabric for ultimate comfort and style.",
      price: 89.99,
      originalPrice: 120.00,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Women",
      inStock: true,
      stockQuantity: 25,
      featured: true
    },
    {
      name: "Essential Polos",
      description: "Classic polo shirts that never go out of style. Perfect for casual and semi-formal occasions.",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Men",
      inStock: true,
      stockQuantity: 40,
      featured: true
    },
    {
      name: "Cream T-Shirt",
      description: "Soft and comfortable cream t-shirt made from 100% organic cotton. Perfect for everyday wear.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Unisex",
      inStock: true,
      stockQuantity: 50,
      featured: true
    },
    {
      name: "Casual Blazer",
      description: "Stylish casual blazer perfect for business meetings or dinner dates. Tailored fit for modern professionals.",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Men",
      inStock: true,
      stockQuantity: 15,
      featured: false
    },
    {
      name: "Summer Dress",
      description: "Light and breezy summer dress perfect for warm weather. Features beautiful floral patterns.",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Women",
      inStock: true,
      stockQuantity: 30,
      featured: false
    },
    {
      name: "Denim Jacket",
      description: "Classic denim jacket that pairs well with any outfit. Durable and stylish for all seasons.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Unisex",
      inStock: true,
      stockQuantity: 20,
      featured: false
    },
    {
      name: "Formal Shirt",
      description: "Crisp white formal shirt perfect for office wear. Made with wrinkle-free fabric for busy professionals.",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Men",
      inStock: true,
      stockQuantity: 35,
      featured: false
    },
    {
      name: "Casual Pants",
      description: "Comfortable casual pants perfect for weekend outings. Available in multiple colors and sizes.",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Unisex",
      inStock: true,
      stockQuantity: 45,
      featured: false
    },
    {
      name: "Evening Gown",
      description: "Elegant evening gown perfect for special occasions. Features intricate detailing and premium fabric.",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Women",
      inStock: true,
      stockQuantity: 10,
      featured: false
    }
  ]

  try {
    // Clear existing products
    await Product.destroy({ where: {} })
    
    // Insert new products
    await Product.bulkCreate(products)
    
    console.log('✅ Products seeded successfully')
  } catch (error) {
    console.error('❌ Error seeding products:', error)
  }
}

module.exports = seedProducts 