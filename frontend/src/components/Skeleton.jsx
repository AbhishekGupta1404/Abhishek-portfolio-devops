import React from 'react';

const Skeleton = ({ 
  variant = 'default', 
  className = '', 
  lines = 3,
  showAvatar = false,
  height = 'h-4',
  width = 'w-full'
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  if (variant === 'card') {
    return (
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
        <div className={`${baseClasses} h-48 w-full`} />
        <div className="p-6 space-y-4">
          <div className={`${baseClasses} h-6 w-3/4`} />
          <div className="space-y-2">
            {[...Array(lines)].map((_, i) => (
              <div key={i} className={`${baseClasses} ${height} ${i === lines - 1 ? 'w-2/3' : width}`} />
            ))}
          </div>
          <div className="flex gap-2 pt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`${baseClasses} h-6 w-16 rounded-full`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>
        <div className="flex gap-4">
          {showAvatar && <div className={`${baseClasses} w-12 h-12 rounded-full flex-shrink-0`} />}
          <div className="flex-1 space-y-3">
            <div className={`${baseClasses} h-6 w-3/4`} />
            <div className={`${baseClasses} h-4 w-full`} />
            <div className={`${baseClasses} h-4 w-5/6`} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'testimonial') {
    return (
      <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>
        <div className="space-y-4">
          <div className={`${baseClasses} h-4 w-24`} />
          <div className="space-y-2">
            {[...Array(lines)].map((_, i) => (
              <div key={i} className={`${baseClasses} h-4 ${i === lines - 1 ? 'w-4/5' : 'w-full'}`} />
            ))}
          </div>
          <div className="flex items-center gap-4 pt-4">
            <div className={`${baseClasses} w-10 h-10 rounded-full`} />
            <div className="space-y-2">
              <div className={`${baseClasses} h-4 w-24`} />
              <div className={`${baseClasses} h-3 w-32`} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'blog') {
    return (
      <div className={`bg-white rounded-xl overflow-hidden shadow-lg ${className}`}>
        <div className={`${baseClasses} h-48 w-full`} />
        <div className="p-6 space-y-4">
          <div className="flex gap-4">
            <div className={`${baseClasses} h-4 w-20`} />
            <div className={`${baseClasses} h-4 w-16`} />
          </div>
          <div className={`${baseClasses} h-6 w-full`} />
          <div className="space-y-2">
            {[...Array(lines)].map((_, i) => (
              <div key={i} className={`${baseClasses} h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} />
            ))}
          </div>
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`${baseClasses} h-6 w-12 rounded-full`} />
            ))}
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <div className={`${baseClasses} w-8 h-8 rounded-full`} />
              <div className={`${baseClasses} h-4 w-24`} />
            </div>
            <div className={`${baseClasses} h-4 w-16`} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'skills') {
    return (
      <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>
        <div className="space-y-4">
          <div className={`${baseClasses} h-6 w-32`} />
          <div className="space-y-2">
            <div className={`${baseClasses} h-2 w-full`} />
            <div className={`${baseClasses} h-4 w-16`} />
          </div>
        </div>
      </div>
    );
  }

  // Default skeleton
  return (
    <div className={`${baseClasses} ${height} ${width} ${className}`} />
  );
};

export default Skeleton;
