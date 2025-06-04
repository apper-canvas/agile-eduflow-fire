import React from 'react'

const Link = ({ href, children, className = '', ...props }) => {
  return (
    <a href={href} className={`text-surface-600 hover:text-primary transition-colors ${className}`} {...props}>
      {children}
    </a>
  )
}

export default Link