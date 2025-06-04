import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-8"
        >
          <ApperIcon name="FileQuestion" className="w-12 h-12 text-primary" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-6xl font-bold text-surface-900 dark:text-white mb-4"
        >
          404
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl font-semibold text-surface-800 dark:text-surface-200 mb-4"
        >
          Page Not Found
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-surface-600 dark:text-surface-400 mb-8 leading-relaxed"
        >
          The page you're looking for doesn't exist or has been moved to a different location.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-surface-500 dark:text-surface-400 text-sm">
            or
          </div>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-xl font-semibold hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound