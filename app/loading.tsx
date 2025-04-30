import React from 'react';

interface FancySpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  colors?: [string, string, string];
  className?: string;
}

const FancySpinner: React.FC<FancySpinnerProps> = ({
  size = 'md',
  colors = ['#6366f1', '#ec4899', '#f59e0b'],
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-24 w-24', // Increased base size
    lg: 'h-32 w-32',
  };

  const gradientId = React.useId();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className={`relative ${sizeClasses[size]} ${className}`}
        role="status">
        <svg
          viewBox="0 0 160 160"
          className="absolute inset-0 overflow-visible"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="50%" stopColor={colors[1]} />
              <stop offset="100%" stopColor={colors[2]} />
            </linearGradient>
          </defs>

          <circle
            cx="80"
            cy="80"
            r="110" // Increased radius to wrap around bouncers
            strokeWidth="16" // Adjusted stroke width
            stroke={`url(#${gradientId})`}
            fill="none"
            className="animate-spin origin-center"
            strokeLinecap="round"
            strokeDasharray="300 140" // Adjusted dash array
            style={{
              transformOrigin: 'center',
              strokeDashoffset: 440, // Updated offset
            }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-4">
            {' '}
            {/* Increased spacing */}
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-4 rounded-full animate-bounce" // Wider bars
                style={{
                  animationDelay: `${i * 0.2}s`,
                  height:
                    size === 'sm'
                      ? '2rem'
                      : size === 'md'
                      ? '4rem' // Taller bars
                      : '6rem',
                  background: `linear-gradient(to bottom, ${colors.join(
                    ', '
                  )})`,
                  boxShadow: `0 0 15px ${colors[1]}40`,
                }}
              />
            ))}
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default FancySpinner;
