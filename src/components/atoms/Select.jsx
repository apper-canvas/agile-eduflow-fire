import React from 'react'

const Select = ({
  value,
  onChange,
  options,
  className = '',
  required = false,
  placeholder = '',
  ...props
}) => {
  const baseStyles = 'w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all'

  return (
    <select
      value={value}
      onChange={onChange}
      className={`${baseStyles} ${className}`}
      required={required}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select