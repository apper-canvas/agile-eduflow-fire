import React from 'react'
import { motion } from 'framer-motion'
import Button from '../atoms/Button'
import Text from '../atoms/Text'

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-12 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Text as="h1" variant="h1" className="text-surface-900 dark:text-white">
            Transform Learning with
            <Text as="span" className="block" gradient>EduFlow Platform</Text>
          </Text>
          <Text variant="lead">
            Empower educators and students with our comprehensive learning management system featuring course creation, interactive quizzes, and detailed progress tracking.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="md" variant="primary">
              Get Started
            </Button>
            <Button size="md" variant="outline">
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection