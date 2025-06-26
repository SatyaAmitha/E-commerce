'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface AddToCartButtonProps {
  onAddToCart: () => void;
  disabled?: boolean;
  inStock?: boolean;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  requiresSelection?: boolean;
  selectedSize?: string;
  selectedColor?: string;
}

export function AddToCartButton({
  onAddToCart,
  disabled = false,
  inStock = true,
  className = '',
  size = 'default',
  requiresSelection = false,
  selectedSize,
  selectedColor
}: AddToCartButtonProps) {
  const [buttonState, setButtonState] = useState<'default' | 'adding' | 'added'>('default');
  const [showValidation, setShowValidation] = useState(false);

  const handleClick = () => {
    // Check if size/color selection is required
    if (requiresSelection && (!selectedSize || !selectedColor)) {
      setShowValidation(true);
      setTimeout(() => setShowValidation(false), 3000);
      return;
    }

    setButtonState('adding');
    onAddToCart();
    
    // Change to "added" state
    setTimeout(() => {
      setButtonState('added');
    }, 300);

    // Reset to default after 2 seconds
    setTimeout(() => {
      setButtonState('default');
    }, 2000);
  };

  const getButtonContent = () => {
    switch (buttonState) {
      case 'adding':
        return (
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Adding...</span>
          </div>
        );
      case 'added':
        return (
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Added!</span>
          </div>
        );
      default:
        return !inStock ? 'Out of Stock' : 'Add to Cart';
    }
  };

  const getButtonClassName = () => {
    let baseClasses = `transition-all duration-300 ${className}`;
    
    switch (buttonState) {
      case 'adding':
        return `${baseClasses} bg-orange-500 hover:bg-orange-600 text-white`;
      case 'added':
        return `${baseClasses} bg-green-500 hover:bg-green-600 text-white`;
      default:
        return `${baseClasses} bg-teal-600 hover:bg-teal-700 text-white disabled:bg-gray-400`;
    }
  };

  return (
    <div className="relative">
      {/* Validation Warning */}
      {showValidation && (
        <div className="absolute -top-12 left-0 right-0 bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded text-sm z-10 animate-slideInDown">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>
              {!selectedSize && !selectedColor ? 'Size and color required' : 
               !selectedSize ? 'Size required' : 'Color required'}
            </span>
          </div>
        </div>
      )}
      
      <Button
        onClick={handleClick}
        disabled={disabled || !inStock || buttonState === 'adding'}
        size={size}
        className={getButtonClassName()}
      >
        {getButtonContent()}
      </Button>
    </div>
  );
}

// Legacy animation component for backward compatibility
interface CartAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
  buttonRef?: React.RefObject<HTMLElement>;
}

export default function CartAnimation({ isVisible, onComplete, buttonRef }: CartAnimationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return null; // No overlay animation anymore
}

// Hook for backward compatibility
export function useCartAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  return {
    isAnimating,
    triggerAnimation,
    handleAnimationComplete,
    CartAnimationComponent: (props: Omit<CartAnimationProps, 'isVisible' | 'onComplete'>) => (
      <CartAnimation
        isVisible={isAnimating}
        onComplete={handleAnimationComplete}
        {...props}
      />
    )
  };
} 