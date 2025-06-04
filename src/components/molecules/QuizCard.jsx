import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'
import Text from '../atoms/Text'
import Button from '../atoms/Button'

const QuizCard = ({ quiz, courseTitle }) => {
  return (
    <motion.div
      key={quiz.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <ApperIcon name="ClipboardCheck" className="w-6 h-6 text-secondary" />
        </div>
        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
          {quiz.timeLimit}min
        </span>
      </div>
      <Text as="h4" variant="h3" className="mb-2">
        {quiz.title}
      </Text>
      <Text variant="small" className="mb-4">
        {quiz.questions?.length || 0} questions • {quiz.passingScore}% to pass
      </Text>
      <div className="flex items-center justify-between">
        <Text variant="small" className="text-surface-500">
          Course: {courseTitle}
        </Text>
        <Button variant="text" icon="ExternalLink" />
      </div>
    </motion.div>
  )
}

export default QuizCard