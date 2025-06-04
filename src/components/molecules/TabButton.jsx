import React from 'react'
import ApperIcon from '../ApperIcon'

const TabButton = ({ tab, activeTab, onClick }) => {
  return (
    <button
      key={tab.id}
      onClick={() => onClick(tab.id)}
      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap ${
        activeTab === tab.id
          ? 'text-primary border-b-2 border-primary bg-primary/5'
          : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-surface-700'
      }`}
    >
      <ApperIcon name={tab.icon} className="w-5 h-5" />
      <span>{tab.label}</span>
    </button>
  )
}

export default TabButton