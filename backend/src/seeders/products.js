const { Product } = require('../models')

const seedProducts = async () => {
  const products = [
    // CLOTHING CATEGORY (10 products)
    {
      name: "Classic White T-Shirt",
      description: "Essential white cotton t-shirt with perfect fit. Made from premium organic cotton for ultimate comfort.",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "clothing",
      inStock: true,
      stockQuantity: 50,
      featured: true
    },
    {
      name: "Elegant Flowline Dress",
      description: "Beautiful flowline dress perfect for any occasion. Features elegant design and premium fabric.",
      price: 89.99,
      originalPrice: 120.00,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "clothing",
      inStock: true,
      stockQuantity: 25,
      featured: true
    },
    {
      name: "Casual Denim Jacket",
      description: "Classic denim jacket that never goes out of style. Perfect for layering in any season.",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "clothing",
      inStock: true,
      stockQuantity: 30,
      featured: false
    },
    {
      name: "Business Blazer",
      description: "Professional blazer perfect for office wear. Tailored fit with modern styling.",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "clothing",
      inStock: true,
      stockQuantity: 15,
      featured: false
    },
    {
      name: "Summer Floral Dress",
      description: "Light and breezy summer dress with beautiful floral patterns. Perfect for warm weather.",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "clothing",
      inStock: true,
      stockQuantity: 35,
      featured: true
    },
    {
      name: "Cozy Knit Sweater",
      description: "Warm and comfortable knit sweater perfect for cold days. Available in multiple colors.",
      price: 54.99,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "clothing",
      inStock: true,
      stockQuantity: 40,
      featured: false
    },
    {
      name: "Slim Fit Jeans",
      description: "Premium denim jeans with perfect slim fit. Comfortable and durable for everyday wear.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "clothing",
      inStock: true,
      stockQuantity: 45,
      featured: false
    },
    {
      name: "Formal Evening Gown",
      description: "Elegant evening gown for special occasions. Features intricate detailing and luxurious fabric.",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1566479179817-c7b7b8dd43c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "clothing",
      inStock: true,
      stockQuantity: 8,
      featured: true
    },
    {
      name: "Casual Polo Shirt",
      description: "Classic polo shirt perfect for casual and semi-formal occasions. Premium cotton blend.",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "clothing",
      inStock: true,
      stockQuantity: 55,
      featured: false
    },
    {
      name: "Winter Coat",
      description: "Warm winter coat with excellent insulation. Stylish design meets functionality.",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "clothing",
      inStock: true,
      stockQuantity: 20,
      featured: false
    },

    // ACCESSORIES CATEGORY (10 products)
    {
      name: "Luxury Silk Scarf",
      description: "Premium silk scarf with elegant patterns. Perfect accessory for any outfit.",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      inStock: true,
      stockQuantity: 30,
      featured: true
    },
    {
      name: "Classic Leather Belt",
      description: "Genuine leather belt with silver buckle. Essential accessory for formal and casual wear.",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      inStock: true,
      stockQuantity: 40,
      featured: false
    },
    {
      name: "Stylish Sunglasses",
      description: "Designer sunglasses with UV protection. Perfect blend of style and functionality.",
      price: 89.99,
      originalPrice: 120.00,
      image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      inStock: true,
      stockQuantity: 25,
      featured: true
    },
    {
      name: "Elegant Pearl Necklace",
      description: "Beautiful pearl necklace perfect for special occasions. Timeless elegance and sophistication.",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      inStock: true,
      stockQuantity: 15,
      featured: true
    },
    {
      name: "Vintage Watch",
      description: "Classic vintage-style watch with leather strap. Perfect timepiece for any occasion.",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      inStock: true,
      stockQuantity: 20,
      featured: false
    },
    {
      name: "Wool Winter Hat",
      description: "Warm wool hat perfect for cold weather. Stylish design with excellent insulation.",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      inStock: true,
      stockQuantity: 35,
      featured: false
    },
    {
      name: "Designer Earrings",
      description: "Elegant designer earrings with crystal details. Perfect for evening events.",
      price: 67.99,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      inStock: true,
      stockQuantity: 22,
      featured: false
    },
    {
      name: "Leather Gloves",
      description: "Premium leather gloves with soft lining. Perfect for cold weather and driving.",
      price: 42.99,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      inStock: true,
      stockQuantity: 28,
      featured: false
    },
    {
      name: "Statement Bracelet",
      description: "Bold statement bracelet with unique design. Perfect for adding flair to any outfit.",
      price: 38.99,
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      inStock: true,
      stockQuantity: 32,
      featured: false
    },
    {
      name: "Silk Tie Collection",
      description: "Premium silk tie with sophisticated patterns. Essential for formal occasions.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1593032462557-6aee2c7e6769?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      inStock: true,
      stockQuantity: 45,
      featured: false
    },

    // SHOES CATEGORY (10 products)
    {
      name: "Classic Leather Loafers",
      description: "Premium leather loafers perfect for business and casual wear. Comfortable and stylish.",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "shoes",
      inStock: true,
      stockQuantity: 25,
      featured: true
    },
    {
      name: "Running Sneakers",
      description: "High-performance running sneakers with excellent cushioning and support.",
      price: 89.99,
      originalPrice: 110.00,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "shoes",
      inStock: true,
      stockQuantity: 40,
      featured: true
    },
    {
      name: "Elegant High Heels",
      description: "Sophisticated high heels perfect for formal events. Comfortable design with stunning appeal.",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "shoes",
      inStock: true,
      stockQuantity: 20,
      featured: true
    },
    {
      name: "Casual Canvas Shoes",
      description: "Comfortable canvas shoes perfect for everyday wear. Classic design with modern comfort.",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "shoes",
      inStock: true,
      stockQuantity: 50,
      featured: false
    },
    {
      name: "Winter Boots",
      description: "Warm winter boots with excellent traction. Perfect for cold weather and outdoor activities.",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "shoes",
      inStock: true,
      stockQuantity: 18,
      featured: false
    },
    {
      name: "Formal Oxford Shoes",
      description: "Classic Oxford shoes perfect for formal occasions. Premium leather with traditional craftsmanship.",
      price: 179.99,
      image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "shoes",
      inStock: true,
      stockQuantity: 15,
      featured: false
    },
    {
      name: "Summer Sandals",
      description: "Comfortable summer sandals with adjustable straps. Perfect for beach and casual wear.",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "shoes",
      inStock: true,
      stockQuantity: 35,
      featured: false
    },
    {
      name: "Athletic Training Shoes",
      description: "Versatile training shoes perfect for gym and cross-training. Superior comfort and performance.",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "shoes",
      inStock: true,
      stockQuantity: 30,
      featured: false
    },
    {
      name: "Ballet Flats",
      description: "Elegant ballet flats perfect for work and casual occasions. Comfortable and versatile.",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1596702842365-c6b8b73e5d94?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "shoes",
      inStock: true,
      stockQuantity: 28,
      featured: false
    },
    {
      name: "Hiking Boots",
      description: "Durable hiking boots with excellent ankle support. Perfect for outdoor adventures.",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "shoes",
      inStock: true,
      stockQuantity: 22,
      featured: false
    },

    // BAGS CATEGORY (10 products)
    {
      name: "Luxury Leather Handbag",
      description: "Premium leather handbag with elegant design. Perfect for work and special occasions.",
      price: 199.99,
      originalPrice: 250.00,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "bags",
      inStock: true,
      stockQuantity: 15,
      featured: true
    },
    {
      name: "Canvas Backpack",
      description: "Durable canvas backpack perfect for travel and daily use. Multiple compartments for organization.",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "bags",
      inStock: true,
      stockQuantity: 35,
      featured: true
    },
    {
      name: "Designer Clutch Bag",
      description: "Elegant clutch bag perfect for evening events. Compact design with sophisticated appeal.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "bags",
      inStock: true,
      stockQuantity: 20,
      featured: true
    },
    {
      name: "Business Briefcase",
      description: "Professional briefcase perfect for business meetings. Premium materials with modern design.",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "bags",
      inStock: true,
      stockQuantity: 12,
      featured: false
    },
    {
      name: "Travel Duffel Bag",
      description: "Spacious duffel bag perfect for weekend trips and gym sessions. Durable and lightweight.",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "bags",
      inStock: true,
      stockQuantity: 25,
      featured: false
    },
    {
      name: "Crossbody Messenger Bag",
      description: "Stylish crossbody bag perfect for daily use. Comfortable strap with secure compartments.",
      price: 54.99,
      image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "bags",
      inStock: true,
      stockQuantity: 30,
      featured: false
    },
    {
      name: "Vintage Leather Satchel",
      description: "Classic leather satchel with vintage appeal. Perfect for school and work.",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "bags",
      inStock: true,
      stockQuantity: 18,
      featured: false
    },
    {
      name: "Mini Shoulder Bag",
      description: "Compact shoulder bag perfect for essentials. Stylish design with adjustable strap.",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "bags",
      inStock: true,
      stockQuantity: 40,
      featured: false
    },
    {
      name: "Laptop Bag",
      description: "Protective laptop bag with padded compartments. Perfect for professionals and students.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "bags",
      inStock: true,
      stockQuantity: 22,
      featured: false
    },
    {
      name: "Beach Tote Bag",
      description: "Large tote bag perfect for beach trips and shopping. Water-resistant with spacious interior.",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1616627451515-caf4b3d7e3b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "bags",
      inStock: true,
      stockQuantity: 45,
      featured: false
    }
  ]

  try {
    // Clear existing products
    await Product.destroy({ where: {} })
    
    // Insert new products
    await Product.bulkCreate(products)
    
    console.log('✅ Products seeded successfully - 40 products added!')
    console.log('📦 Categories: 10 clothing, 10 accessories, 10 shoes, 10 bags')
    console.log('🖼️  All products now have unique images!')
  } catch (error) {
    console.error('❌ Error seeding products:', error)
  }
}

module.exports = seedProducts 