import React from 'react'
import ApperIcon from '../components/ApperIcon'
import QuizCard from '../components/molecules/QuizCard'
import Button from '../components/atoms/Button'
import Text from '../components/atoms/Text'

const QuizzesTab = ({ loading, error, quizzes, courses, onCreateQuizClick }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-3 text-surface-600 dark:text-surface-400">Loading quizzes...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ApperIcon name="AlertTriangle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 dark:text-red-400">Failed to load quizzes: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Text as="h3" variant="h3">Quiz Management</Text>
        <Button onClick={onCreateQuizClick} variant="secondary" icon="Plus">
          Create Quiz
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes?.length > 0 ? quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            courseTitle={courses?.find(c => c.id === quiz.courseId)?.title || 'Unknown'}
          />
        )) : (
          <div className="col-span-full text-center py-12">
            <ApperIcon name="ClipboardCheck" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            <Text variant="body" className="text-surface-500 dark:text-surface-400">No quizzes found. Create your first quiz!</Text>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizzesTab