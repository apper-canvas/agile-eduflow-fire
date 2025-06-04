import React from 'react'
import FeatureCard from '../molecules/FeatureCard'

const featuresData = [
  {
    title: 'Interactive Course Builder',
    description: 'Create engaging courses with multimedia content, structured modules, and progressive learning paths.',
    icon: 'Layers',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    title: 'Advanced Quiz System',
    description: 'Build comprehensive assessments with multiple question types, time limits, and automated grading.',
    icon: 'ClipboardCheck',
    gradient: 'from-green-500 to-teal-600'
  },
  {
    title: 'Real-time Analytics',
    description: 'Track student progress, engagement metrics, and performance insights with detailed reports.',
    icon: 'BarChart3',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    title: 'Student Progress Tracking',
    description: 'Monitor individual student journeys with completion rates, time spent, and learning outcomes.',
    icon: 'TrendingUp',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    title: 'Collaborative Learning',
    description: 'Enable group projects, peer reviews, and discussion forums to enhance the learning experience.',
    icon: 'Users',
    gradient: 'from-indigo-500 to-blue-600'
  },
  {
    title: 'Mobile Responsive',
    description: 'Access courses and take quizzes on any device with our fully responsive design and mobile app.',
    icon: 'Smartphone',
    gradient: 'from-cyan-500 to-blue-600'
  }
]

const FeaturesGrid = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-surface-50 to-white dark:from-surface-900 dark:to-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesGrid