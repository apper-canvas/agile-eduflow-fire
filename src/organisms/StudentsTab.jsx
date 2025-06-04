import React from 'react'
import ApperIcon from '../components/ApperIcon'
import StudentCard from '../components/molecules/StudentCard'
import Text from '../components/atoms/Text'

const StudentsTab = ({ loading, error, students }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-3 text-surface-600 dark:text-surface-400">Loading students...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ApperIcon name="AlertTriangle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 dark:text-red-400">Failed to load students: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Text as="h3" variant="h3">Student Management</Text>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students?.length > 0 ? students.map((student) => (
          <StudentCard key={student.id} student={student} />
        )) : (
          <div className="col-span-full text-center py-12">
            <ApperIcon name="Users" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            <Text variant="body" className="text-surface-500 dark:text-surface-400">No students enrolled yet.</Text>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentsTab