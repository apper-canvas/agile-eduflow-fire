import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'
import Text from '../atoms/Text'
import Button from '../atoms/Button'

const CourseCard = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <ApperIcon name="BookOpen" className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
          {course.enrolledStudents?.length || 0} students
        </span>
      </div>
      <Text as="h4" variant="h3" className="mb-2">
        {course.title}
      </Text>
      <Text variant="small" className="line-clamp-2 mb-4">
        {course.description}
      </Text>
      <div className="flex items-center justify-between">
        <Text variant="small" className="text-surface-500">
          {course.modules?.length || 0} modules
        </Text>
        <Button variant="text" icon="ExternalLink" />
      </div>
    </motion.div>
  )
}

export default CourseCard