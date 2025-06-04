import React from 'react'
import ApperIcon from '../ApperIcon'

const AppLogo = ({ className = '' }) => (
  <div className={`flex items-center space-x-3 ${className}`}>
    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
      <ApperIcon name="GraduationCap" className="w-5 h-5 text-white" />
    </div>
    <span className="text-xl font-bold text-gradient">EduFlow</span>
  </div>
)

export default AppLogo