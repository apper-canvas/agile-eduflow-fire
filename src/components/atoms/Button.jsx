import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon' // Assuming ApperIcon is an atom or utility

const Button = ({
  children,
  onClick,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'text', 'icon'
  size = 'md', // 'sm', 'md', 'lg'
  icon, // name of ApperIcon
  iconPosition = 'left', // 'left', 'right'
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'flex items-center justify-center font-semibold transition-all duration-300 rounded-xl'
  let variantStyles = ''
  let sizeStyles = ''
  let iconSize = 'w-4 h-4'

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-lg hover:-translate-y-0.5'
      break
    case 'secondary':
      variantStyles = 'bg-gradient-to-r from-secondary to-secondary-light text-white hover:shadow-lg hover:-translate-y-0.5'
      break
    case 'outline':
      variantStyles = 'border-2 border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800'
      break
    case 'text':
      variantStyles = 'text-primary hover:text-primary-dark'
      break
    case 'icon':
      variantStyles = 'p-2 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700'
      sizeStyles = '' // Icon buttons have fixed padding
      iconSize = 'w-5 h-5'
      break
    default:
      variantStyles = 'bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-lg hover:-translate-y-0.5'
  }

  switch (size) {
    case 'sm':
      sizeStyles = 'px-4 py-2 text-sm'
      iconSize = 'w-4 h-4'
      break
    case 'md':
      sizeStyles = 'px-6 py-3 text-base'
      iconSize = 'w-5 h-5'
      break
    case 'lg':
      sizeStyles = 'px-8 py-4 text-lg'
      iconSize = 'w-6 h-6'
      break
    default:
      sizeStyles = 'px-6 py-3 text-base'
  }

  if (variant === 'icon') {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variantStyles} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
        {...props}
      >
        {icon && <ApperIcon name={icon} className={`${iconSize}`} />}
      </button>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <ApperIcon name={icon} className={`${iconSize} mr-2`} />}
      {children}
      {icon && iconPosition === 'right' && <ApperIcon name={icon} className={`${iconSize} ml-2`} />}
    </button>
  )
}

export default Button