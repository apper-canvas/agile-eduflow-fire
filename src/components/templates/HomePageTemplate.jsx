import React from 'react'
import Navbar from '../organisms/Navbar'
import HeroSection from '../organisms/HeroSection'
import StatsSection from '../organisms/StatsSection'
import DashboardSection from '../organisms/DashboardSection'
import FeaturesGrid from '../organisms/FeaturesGrid'
import Footer from '../organisms/Footer'

const HomePageTemplate = ({
  darkMode,
  toggleDarkMode,
  stats,
  loading,
  courseService,
  quizService,
  studentService,
  progressService
}) => {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <HeroSection />
      <StatsSection stats={stats} loading={loading} />
      <section id="dashboard" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardSection
            courseService={courseService}
            quizService={quizService}
            studentService={studentService}
            progressService={progressService}
          />
        </div>
      </section>
      <FeaturesGrid />
      <Footer />
    </div>
  )
}

export default HomePageTemplate