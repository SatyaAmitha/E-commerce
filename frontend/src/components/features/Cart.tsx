'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cartService, CartItem } from '@/services/cart';

interface CartProps {
  onClose?: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const items = await cartService.getCart();
      setCartItems(items);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleCartUpdate = () => {
      loadCartItems();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const updateQuantity = async (item: CartItem, newQuantity: number) => {
    await cartService.updateQuantity(item, newQuantity);
  };

  const removeItem = async (item: CartItem) => {
    await cartService.removeFromCart(item);
  };

  const clearCart = async () => {
    await cartService.clearCart();
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="p-4 text-center">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
          <DialogDescription>Your cart is empty</DialogDescription>
        </DialogHeader>
        <Button
          onClick={() => {
            onClose?.();
            router.push('/shop');
          }}
          className="mt-4"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Cart Items */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {cartItems.map((item, index) => (
          <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="flex items-center space-x-4 p-4 border rounded-lg">
            <img
              src={item.image || '/api/placeholder/80/80'}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/api/placeholder/80/80';
              }}
            />
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <div className="text-sm text-gray-600">
                {item.size && <span>Size: {item.size}</span>}
                {item.size && item.color && <span> • </span>}
                {item.color && <span>Color: {item.color}</span>}
              </div>
              <div className="text-lg font-bold text-teal-600">${item.price}</div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item, item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-teal-50"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-teal-50"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item)}
              className="text-red-500 hover:text-red-700 p-2"
              title="Remove item"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Total ({getTotalItems()} items):</span>
          <span className="text-2xl font-bold text-teal-600">${getTotalPrice()}</span>
        </div>
        
        <div className="flex gap-4">
          <Button
            onClick={clearCart}
            variant="outline"
            className="flex-1"
          >
            Clear Cart
          </Button>
          <Button
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
            onClick={() => {
              onClose?.();
              router.push('/checkout');
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
} 