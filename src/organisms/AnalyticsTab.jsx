import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'
import Text from '../components/atoms/Text'
import ProgressCard from '../components/molecules/ProgressCard'

const AnalyticsTab = ({ loading, error, progress, students, courses }) => {
  const analyticsStats = [
    { label: 'Total Students', value: students?.length || 0, icon: 'Users', color: 'text-primary' },
    { label: 'Active Courses', value: courses?.length || 0, icon: 'BookOpen', color: 'text-secondary' },
    { label: 'Avg. Completion', value: '78%', icon: 'TrendingUp', color: 'text-accent' },
    { label: 'Quiz Success Rate', value: '85%', icon: 'Award', color: 'text-green-500' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-3 text-surface-600 dark:text-surface-400">Loading analytics...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ApperIcon name="AlertTriangle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 dark:text-red-400">Failed to load analytics: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Text as="h3" variant="h3">Progress Analytics</Text>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analyticsStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card"
          >
            <div className="flex items-center justify-between mb-4">
              <ApperIcon name={stat.icon} className={`w-8 h-8 ${stat.color}`} />
              <Text as="span" className="text-2xl font-bold">{stat.value}</Text>
            </div>
            <Text variant="small">{stat.label}</Text>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {progress?.length > 0 ? progress.slice(0, 6).map((progressItem) => {
          const student = students?.find(s => s.id === progressItem.studentId)
          const course = courses?.find(c => c.id === progressItem.courseId)

          return (
            <ProgressCard
              key={`${progressItem.studentId}-${progressItem.courseId}`}
              progressItem={progressItem}
              student={student}
              course={course}
            />
          )
        }) : (
          <div className="col-span-full text-center py-12">
            <ApperIcon name="BarChart3" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            <Text variant="body" className="text-surface-500 dark:text-surface-400">No progress data available yet.</Text>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalyticsTab