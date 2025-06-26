'use client';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export default function Logo({ size = 'md', className = '', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-5xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Simple Clean Logo */}
      <div className={`
        ${sizeClasses[size]} 
        rounded-xl 
        bg-gradient-to-br from-teal-500 to-teal-600 
        flex items-center justify-center 
        shadow-lg 
        hover:shadow-xl
        transition-all duration-300
        hover:scale-105
      `}>
        <span className={`
          ${textSizeClasses[size]} 
          font-bold 
          text-white 
          drop-shadow-lg
        `}>
          A
        </span>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`
            ${textSizeClasses[size]} 
            font-bold 
            text-gray-900
            hover:text-teal-600
            transition-colors duration-300
          `}>
            Amigo
          </span>
          {size === 'xl' && (
            <span className="text-sm text-gray-500 font-medium tracking-wider">
              FASHION
            </span>
          )}
        </div>
      )}
    </div>
  );
} 