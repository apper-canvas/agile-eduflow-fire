import React from 'react'
import FormField from '../molecules/FormField'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'

const CourseForm = ({
  isOpen,
  onClose,
  formState,
  onFormChange,
  onSubmit,
  loading
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Course">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Course Title"
          name="title"
          value={formState.title}
          onChange={(e) => onFormChange('title', e.target.value)}
          placeholder="Enter course title"
          required
        />

        <FormField
          label="Description"
          name="description"
          type="textarea"
          value={formState.description}
          onChange={(e) => onFormChange('description', e.target.value)}
          rows={4}
          placeholder="Enter course description"
          required
        />

        <div className="flex space-x-3 pt-4">
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
            variant="primary"
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Creating...' : 'Create Course'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default CourseForm