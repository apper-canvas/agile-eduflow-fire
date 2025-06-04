import React from 'react'
import { motion } from 'framer-motion'
import Text from '../atoms/Text'

const ProgressCard = ({ progressItem, student, course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <Text as="h4" variant="h4" className="mb-0">
            {student?.name || 'Unknown Student'}
          </Text>
          <Text variant="small" className="text-surface-500">
            {course?.title || 'Unknown Course'}
          </Text>
        </div>
        <Text as="span" className="text-lg font-bold text-primary">
          {progressItem.completionPercentage || 0}%
        </Text>
      </div>
      <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2 mb-4">
        <div
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressItem.completionPercentage || 0}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-surface-600 dark:text-surface-400">
        <span>Quiz Results: {progressItem.quizResults?.length || 0}</span>
        <span>Last Active: {progressItem.lastActivityDate ? new Date(progressItem.lastActivityDate).toLocaleDateString() : 'Never'}</span>
      </div>
    </motion.div>
  )
}

export default ProgressCard