import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '../ApperIcon'

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md' // 'sm', 'md', 'lg', 'xl'
}) => {
  if (!isOpen) return null

  let maxWidthClass = 'max-w-md'
  switch (size) {
    case 'sm':
      maxWidthClass = 'max-w-sm'
      break
    case 'md':
      maxWidthClass = 'max-w-md'
      break
    case 'lg':
      maxWidthClass = 'max-w-lg'
      break
    case 'xl':
      maxWidthClass = 'max-w-2xl'
      break
    default:
      maxWidthClass = 'max-w-md'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`bg-white dark:bg-surface-800 rounded-2xl p-6 w-full ${maxWidthClass} max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white">{title}</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal