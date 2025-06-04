import React from 'react'
import ApperIcon from '../ApperIcon'

const SocialButton = ({ name, onClick, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 bg-surface-800 hover:bg-surface-700 rounded-lg flex items-center justify-center transition-colors ${className}`}
      {...props}
    >
      <ApperIcon name={name} className="w-5 h-5" />
    </button>
  )
}

export default SocialButton