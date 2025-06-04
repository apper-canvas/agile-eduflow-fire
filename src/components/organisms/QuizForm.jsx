import React from 'react'
import FormField from '../molecules/FormField'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Text from '../atoms/Text'
import QuestionItem from '../molecules/QuestionItem'

const QuizForm = ({
  isOpen,
  onClose,
  formState,
  onFormChange,
  onSubmit,
  loading,
  courses,
  newQuestion,
  onNewQuestionChange,
  onAddQuestion,
  onRemoveQuestion
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  const courseOptions = courses.map(course => ({
    value: course.id,
    label: course.title
  }))

  const questionTypeOptions = [
    { value: 'multiple-choice', label: 'Multiple Choice' },
    { value: 'true-false', label: 'True/False' },
    { value: 'short-answer', label: 'Short Answer' }
  ]

  const currentOptions = newQuestion.type === 'multiple-choice'
    ? newQuestion.options.map((_, index) => ({ value: index, label: `Option ${index + 1}` }))
    : []

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Quiz" size="xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="Quiz Title"
            name="title"
            value={formState.title}
            onChange={(e) => onFormChange('title', e.target.value)}
            placeholder="Enter quiz title"
            required
            inputClassName="focus:ring-secondary"
          />

          <FormField
            label="Course"
            name="courseId"
            type="select"
            value={formState.courseId}
            onChange={(e) => onFormChange('courseId', e.target.value)}
            options={courseOptions}
            placeholder="Select a course"
            required
            inputClassName="focus:ring-secondary"
          />

          <FormField
            label="Time Limit (minutes)"
            name="timeLimit"
            type="number"
            value={formState.timeLimit}
            onChange={(e) => onFormChange('timeLimit', parseInt(e.target.value))}
            min="1"
            max="180"
            inputClassName="focus:ring-secondary"
          />

          <FormField
            label="Passing Score (%)"
            name="passingScore"
            type="number"
            value={formState.passingScore}
            onChange={(e) => onFormChange('passingScore', parseInt(e.target.value))}
            min="0"
            max="100"
            inputClassName="focus:ring-secondary"
          />
        </div>

        {/* Questions Section */}
        <div>
          <Text as="h4" variant="h4" className="mb-4">
            Questions ({formState.questions.length})
          </Text>

          {/* Add Question Form */}
          <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4 mb-4">
            <div className="space-y-4">
              <FormField
                label="Question"
                name="question"
                value={newQuestion.question}
                onChange={(e) => onNewQuestionChange('question', e.target.value)}
                placeholder="Enter your question"
                inputClassName="focus:ring-secondary"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Question Type"
                  name="type"
                  type="select"
                  value={newQuestion.type}
                  onChange={(e) => onNewQuestionChange('type', e.target.value)}
                  options={questionTypeOptions}
                  inputClassName="focus:ring-secondary"
                />

                {newQuestion.type === 'multiple-choice' && (
                  <FormField
                    label="Correct Answer"
                    name="correctAnswer"
                    type="select"
                    value={newQuestion.correctAnswer}
                    onChange={(e) => onNewQuestionChange('correctAnswer', parseInt(e.target.value))}
                    options={currentOptions}
                    inputClassName="focus:ring-secondary"
                  />
                )}
              </div>

              {newQuestion.type === 'multiple-choice' && (
                <div>
                  <Text as="label" variant="small" className="block text-surface-700 dark:text-surface-300 mb-2">
                    Answer Options
                  </Text>
                  <div className="grid md:grid-cols-2 gap-2">
                    {newQuestion.options.map((option, index) => (
                      <Input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...newQuestion.options]
                          newOptions[index] = e.target.value
                          onNewQuestionChange('options', newOptions)
                        }}
                        className="px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-sm"
                        placeholder={`Option ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <Button
                type="button"
                onClick={onAddQuestion}
                variant="secondary"
                icon="Plus"
                className="hover:bg-secondary-dark"
              >
                Add Question
              </Button>
            </div>
          </div>

          {/* Questions List */}
          {formState.questions.length > 0 && (
            <div className="space-y-3">
              {formState.questions.map((question, index) => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  index={index}
                  onRemove={onRemoveQuestion}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex space-x-3 pt-4 border-t border-surface-200 dark:border-surface-700">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="secondary"
            disabled={loading || formState.questions.length === 0}
            className="flex-1"
          >
            {loading ? 'Creating...' : 'Create Quiz'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default QuizForm