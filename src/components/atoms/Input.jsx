import React from 'react'

const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  required = false,
  rows = 1,
  min,
  max,
  ...props
}) => {
  const baseStyles = 'w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all'

  if (type === 'textarea') {
    return (
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className={`${baseStyles} resize-none ${className}`}
        placeholder={placeholder}
        required={required}
        {...props}
      ></textarea>
    )
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`${baseStyles} ${className}`}
      placeholder={placeholder}
      required={required}
      min={min}
      max={max}
      {...props}
    />
  )
}

export default Input