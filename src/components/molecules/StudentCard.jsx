import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'
import Text from '../atoms/Text'

const StudentCard = ({ student }) => {
  return (
    <motion.div
      key={student.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center">
          <ApperIcon name="User" className="w-6 h-6 text-accent" />
        </div>
        <div>
          <Text as="h4" variant="h4" className="mb-0">
            {student.name}
          </Text>
          <Text variant="small" className="text-surface-500">
            {student.email}
          </Text>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <Text as="span" variant="small" className="text-surface-600 dark:text-surface-400">Enrolled Courses:</Text>
          <Text as="span" variant="small" className="font-medium text-surface-900 dark:text-white">
            {student.enrolledCourses?.length || 0}
          </Text>
        </div>
        <div className="flex justify-between text-sm">
          <Text as="span" variant="small" className="text-surface-600 dark:text-surface-400">Completed Modules:</Text>
          <Text as="span" variant="small" className="font-medium text-surface-900 dark:text-white">
            {Object.keys(student.completedModules || {}).length}
          </Text>
        </div>
      </div>
    </motion.div>
  )
}

export default StudentCard