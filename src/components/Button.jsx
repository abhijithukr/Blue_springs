import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ 
  children, 
  variant = 'primary', 
  to, 
  href, 
  className = '', 
  onClick,
  type = 'button',
  ...props 
}) {
  const baseClass = `btn btn-${variant} ${className}`;

  if (to) {
    return <Link to={to} className={baseClass} {...props}>{children}</Link>;
  }

  if (href) {
    return <a href={href} className={baseClass} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  }

  return (
    <button type={type} className={baseClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
