import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'
import Text from '../atoms/Text'

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white dark:bg-surface-800 rounded-2xl p-8 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <ApperIcon name={feature.icon} className="w-7 h-7 text-white" />
      </div>
      <Text as="h3" variant="h3" className="mb-3">
        {feature.title}
      </Text>
      <Text variant="body" className="leading-relaxed">
        {feature.description}
      </Text>
    </motion.div>
  )
}

export default FeatureCard