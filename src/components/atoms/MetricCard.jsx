import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon' // Assuming ApperIcon is an atom or utility

const MetricCard = ({
  label,
  value,
  icon,
  iconColorClass,
  gradientColorClass,
  index,
  loading = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientColorClass} flex items-center justify-center`}>
          <ApperIcon name={icon} className={`w-6 h-6 ${iconColorClass}`} />
        </div>
      </div>
      <div className="text-2xl font-bold text-surface-900 dark:text-white mb-1">
        {loading ? '...' : value}
      </div>
      <div className="text-surface-600 dark:text-surface-400 text-sm">
        {label}
      </div>
    </motion.div>
  )
}

export default MetricCard