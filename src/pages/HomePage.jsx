import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { courseService } from '../services'

const Home = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true)
      try {
        const result = await courseService.getAll()
        setCourses(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadCourses()
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const stats = [
    { label: 'Active Courses', value: courses?.length || 0, icon: 'BookOpen' },
    { label: 'Total Students', value: courses?.reduce((acc, course) => acc + (course.enrolledStudents?.length || 0), 0) || 0, icon: 'Users' },
    { label: 'Completion Rate', value: '94%', icon: 'TrendingUp' },
    { label: 'Quiz Success', value: '87%', icon: 'Award' }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-surface-900/80 backdrop-blur-lg border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="GraduationCap" className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">EduFlow</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#dashboard" className="text-surface-600 hover:text-primary transition-colors">Dashboard</a>
              <a href="#courses" className="text-surface-600 hover:text-primary transition-colors">Courses</a>
              <a href="#analytics" className="text-surface-600 hover:text-primary transition-colors">Analytics</a>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name={darkMode ? 'Sun' : 'Moon'} className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-white mb-6">
              Transform Learning with
              <span className="text-gradient block">EduFlow Platform</span>
            </h1>
            <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto mb-8">
              Empower educators and students with our comprehensive learning management system featuring course creation, interactive quizzes, and detailed progress tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                Get Started
              </button>
              <button className="px-8 py-3 border-2 border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-xl font-semibold hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                    index % 2 === 0 ? 'from-primary/20 to-primary/10' : 'from-secondary/20 to-secondary/10'
                  } flex items-center justify-center`}>
                    <ApperIcon name={stat.icon} className={`w-6 h-6 ${
                      index % 2 === 0 ? 'text-primary' : 'text-secondary'
                    }`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-surface-900 dark:text-white mb-1">
                  {loading ? '...' : stat.value}
                </div>
                <div className="text-surface-600 dark:text-surface-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <section id="dashboard" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Course Management Dashboard
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              Create, manage, and track your educational content with our intuitive dashboard designed for educators and administrators.
            </p>
          </motion.div>
          
          <MainFeature />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gradient-to-br from-surface-50 to-white dark:from-surface-900 dark:to-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white dark:bg-surface-800 rounded-2xl p-8 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <ApperIcon name={feature.icon} className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 dark:bg-surface-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <ApperIcon name="GraduationCap" className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">EduFlow</span>
              </div>
              <p className="text-surface-400 mb-6 max-w-md">
                Empowering educators and students with comprehensive learning management tools for the digital age.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'Facebook', 'Linkedin', 'Youtube'].map((social) => (
                  <button key={social} className="w-10 h-10 bg-surface-800 hover:bg-surface-700 rounded-lg flex items-center justify-center transition-colors">
                    <ApperIcon name={social} className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-surface-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-surface-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-800 mt-8 pt-8 text-center text-surface-400">
            <p>&copy; 2024 EduFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home