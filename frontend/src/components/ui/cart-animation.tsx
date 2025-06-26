'use client';

import { useState, useEffect } from 'react';

interface CartAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
  buttonRef?: React.RefObject<HTMLElement>;
}

export default function CartAnimation({ isVisible, onComplete, buttonRef }: CartAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'adding' | 'added' | 'complete'>('idle');

  useEffect(() => {
    if (isVisible) {
      setAnimationPhase('adding');
      
      // First phase: "Adding..." (500ms)
      const timer1 = setTimeout(() => {
        setAnimationPhase('added');
      }, 500);

      // Second phase: "Added!" (1500ms)
      const timer2 = setTimeout(() => {
        setAnimationPhase('complete');
        onComplete();
      }, 2000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setAnimationPhase('idle');
    }
  }, [isVisible, onComplete]);

  if (animationPhase === 'idle' || animationPhase === 'complete') {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-20 animate-fadeIn" />
      
      {/* Animation Container */}
      <div className={`
        bg-white rounded-lg shadow-xl p-6 mx-4 max-w-sm w-full
        transform transition-all duration-300 ease-out
        ${animationPhase === 'adding' ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
        animate-slideInUp
      `}>
        <div className="flex items-center space-x-4">
          {/* Animated Cart Icon */}
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center
            transition-all duration-300
            ${animationPhase === 'adding' 
              ? 'bg-teal-100 text-teal-600' 
              : 'bg-green-100 text-green-600'
            }
          `}>
            {animationPhase === 'adding' ? (
              <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>

          {/* Text */}
          <div>
            <h3 className={`
              font-semibold transition-all duration-300
              ${animationPhase === 'adding' ? 'text-teal-600' : 'text-green-600'}
            `}>
              {animationPhase === 'adding' ? 'Adding to Cart...' : 'Added to Cart!'}
            </h3>
            <p className="text-gray-500 text-sm">
              {animationPhase === 'adding' ? 'Please wait' : 'Item successfully added'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
          <div className={`
            h-1 rounded-full transition-all duration-2000 ease-out
            ${animationPhase === 'adding' 
              ? 'w-1/3 bg-teal-500' 
              : 'w-full bg-green-500'
            }
          `} />
        </div>
      </div>
    </div>
  );
}

// Button Animation Hook
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