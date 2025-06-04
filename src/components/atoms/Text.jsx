import React from 'react'
import { motion } from 'framer-motion'

const Text = ({
  as = 'p',
  variant = 'body', // 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'lead', 'small'
  children,
  className = '',
  gradient = false,
  motionProps,
  ...props
}) => {
  const baseStyles = 'text-surface-900 dark:text-white'
  let variantStyles = ''

  switch (variant) {
    case 'h1':
      variantStyles = 'text-4xl sm:text-5xl lg:text-6xl font-bold mb-6'
      break
    case 'h2':
      variantStyles = 'text-3xl sm:text-4xl font-bold mb-4'
      break
    case 'h3':
      variantStyles = 'text-xl font-semibold mb-3'
      break
    case 'h4':
      variantStyles = 'text-lg font-semibold mb-2'
      break
    case 'h5':
      variantStyles = 'text-base font-semibold mb-1'
      break
    case 'h6':
      variantStyles = 'text-sm font-semibold'
      break
    case 'lead':
      variantStyles = 'text-lg sm:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto mb-8'
      break
    case 'body':
      variantStyles = 'text-base text-surface-600 dark:text-surface-300'
      break
    case 'small':
      variantStyles = 'text-sm text-surface-600 dark:text-surface-400'
      break
    default:
      variantStyles = 'text-base text-surface-600 dark:text-surface-300'
  }

  const Tag = motionProps ? motion[as] : as
  const combinedClassName = `${baseStyles} ${variantStyles} ${gradient ? 'text-gradient' : ''} ${className}`.trim()

  return (
    <Tag className={combinedClassName} {...(motionProps || {})} {...props}>
      {children}
    </Tag>
  )
}

export default Text