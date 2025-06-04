import React from 'react'
import ApperIcon from '../ApperIcon'

const Toggle = ({ isOn, onToggle, iconOn, iconOff, className = '', ...props }) => {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors ${className}`}
      {...props}
    >
      <ApperIcon name={isOn ? iconOn : iconOff} className="w-5 h-5" />
    </button>
  )
}

export default Toggle