import React from 'react'
import ApperIcon from '../ApperIcon'
import Text from '../atoms/Text'
import Button from '../atoms/Button'

const QuestionItem = ({ question, index, onRemove }) => {
  return (
    <div className="bg-white dark:bg-surface-700 rounded-lg p-4 border border-surface-200 dark:border-surface-600">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <Text as="p" className="font-medium text-surface-900 dark:text-white mb-2">
            {index + 1}. {question.question}
          </Text>
          <Text variant="small" className="text-surface-600 dark:text-surface-400">
            Type: {question.type.replace('-', ' ')}
            {question.type === 'multiple-choice' && ` • ${question.options.length} options`}
          </Text>
        </div>
        <Button variant="text" onClick={() => onRemove(question.id)} className="text-red-500 hover:text-red-700">
          <ApperIcon name="Trash2" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

export default QuestionItem