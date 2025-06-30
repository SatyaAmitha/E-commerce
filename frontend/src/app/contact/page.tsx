'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/ui/logo';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success state instead of alert
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    // Reset success state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div>
      <Header />
      
      {/* Beautiful Hero Section with Clean Background */}
      <div className="relative bg-gradient-to-br from-teal-50 via-white to-blue-50 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-100 rounded-full opacity-30"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-100 rounded-full opacity-40"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-green-100 rounded-full opacity-35"></div>
          <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-purple-100 rounded-full opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center">
            {/* Large Logo */}
            <div className="flex justify-center mb-8">
              <Logo size="xl" className="animate-fadeIn" />
            </div>
            
            {/* Clean Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-slideInUp">
              Get in <span className="text-teal-600">Touch</span>
            </h1>
            
            {/* Clean Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 animate-slideInUp animation-delay-200">
              Have questions, feedback, or need assistance? We&apos;re here to help! 
              <br />
              <span className="text-teal-600 font-semibold">Reach out to us and we&apos;ll get back to you as soon as possible.</span>
            </p>
            
            {/* Simple Decorative Elements */}
            <div className="flex justify-center space-x-2 mb-8">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Clean Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120V0C240 40 480 40 720 20C960 0 1200 0 1440 20V120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Main Content with Clean White Background */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Monday - Friday, 9 AM - 6 PM EST</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">support@amigofashion.com</p>
                    <p className="text-sm text-gray-500">We&apos;ll respond within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      123 Fashion Avenue<br />
                      Suite 456<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v1M7 4V3a1 1 0 011-1h8a1 1 0 011 1v1m-9 4l3 3 6-6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Follow Us</h3>
                    <div className="flex space-x-4 text-teal-600">
                      <a href="#" className="hover:text-teal-700">Instagram</a>
                      <a href="#" className="hover:text-teal-700">Facebook</a>
                      <a href="#" className="hover:text-teal-700">Twitter</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store Hours */}
              <div className="mt-12 bg-teal-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-teal-800 mb-4">Customer Service Hours</h3>
                <div className="space-y-2 text-teal-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    className="w-full focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 text-lg font-medium transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>

              {/* Success Message */}
              {isSubmitted && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-green-800 font-semibold">Message sent successfully!</p>
                      <p className="text-green-600 text-sm">Thank you for your message. We'll get back to you soon.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> This is a demo contact form. In a real application, 
                  this would send your message to our customer service team.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What are your shipping options?</h3>
                  <p className="text-gray-600">We offer free standard shipping on orders over $75. Express shipping is available for $9.99.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What is your return policy?</h3>
                  <p className="text-gray-600">We accept returns within 30 days of purchase. Items must be unworn and in original condition.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you ship internationally?</h3>
                  <p className="text-gray-600">Yes! We ship to over 25 countries worldwide. International shipping rates vary by location.</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I track my order?</h3>
                  <p className="text-gray-600">Once your order ships, you'll receive a tracking number via email. You can track your package on our website.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                  <p className="text-gray-600">We accept all major credit cards, PayPal, Apple Pay, and Google Pay for your convenience.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I find my size?</h3>
                  <p className="text-gray-600">Check our size guide on each product page. If you're between sizes, we recommend sizing up for comfort.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 