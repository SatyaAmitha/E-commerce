'use client';

import Header from '@/components/layout/Header';

export default function AboutPage() {
  return (
    <div>
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Amigo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted companion in fashion. We believe that great style should be accessible, 
            sustainable, and reflect your unique personality.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Founded in 2020, Amigo started with a simple mission: to make premium fashion 
                accessible to everyone. We noticed a gap in the market for high-quality, 
                stylish clothing that didn't break the bank.
              </p>
              <p>
                Our team of designers and fashion enthusiasts work tirelessly to curate 
                collections that blend contemporary trends with timeless elegance. Every piece 
                in our collection is carefully selected for its quality, comfort, and style.
              </p>
              <p>
                Today, we're proud to serve thousands of customers worldwide, helping them 
                express their unique style with confidence.
              </p>
            </div>
          </div>
          
          <div className="bg-teal-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-teal-800 mb-4">Our Values</h3>
            <ul className="space-y-3 text-teal-700">
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">✓</span>
                <span><strong>Quality First:</strong> We never compromise on the quality of our materials and craftsmanship.</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">✓</span>
                <span><strong>Sustainability:</strong> We're committed to ethical sourcing and eco-friendly practices.</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">✓</span>
                <span><strong>Inclusivity:</strong> Fashion is for everyone, regardless of size, age, or background.</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">✓</span>
                <span><strong>Innovation:</strong> We constantly evolve to meet our customers' changing needs.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-teal-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-teal-700">👩‍💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sarah Johnson</h3>
              <p className="text-teal-600 font-medium mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                With 15+ years in fashion retail, Sarah leads our vision of making 
                premium fashion accessible to all.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-teal-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-teal-700">👨‍🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mike Chen</h3>
              <p className="text-teal-600 font-medium mb-2">Head of Design</p>
              <p className="text-gray-600 text-sm">
                Mike brings creative vision and trend expertise to every collection, 
                ensuring our pieces are both stylish and timeless.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-teal-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-teal-700">👩‍💻</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Emily Rodriguez</h3>
              <p className="text-teal-600 font-medium mb-2">Customer Experience Lead</p>
              <p className="text-gray-600 text-sm">
                Emily ensures every customer has an exceptional experience, 
                from browsing to delivery and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Amigo by Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">1000+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">25+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join the Amigo Family?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our latest collections and find pieces that speak to your unique style. 
            Quality fashion is just a click away.
          </p>
          <button 
            onClick={() => window.location.href = '/shop'}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
} 