import React from 'react';

export default function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  active = false,
  className = '',
  ...props
}) {
  const baseClass = variant === 'filter' ? 'filter-btn' : 'btn';
  const variantClass = variant === 'filter' 
    ? (active ? 'active' : '') 
    : `btn-${variant}`;
    
  const fullClassName = `${baseClass} ${variantClass} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={fullClassName} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={fullClassName} {...props}>
      {children}
    </button>
  );
}
