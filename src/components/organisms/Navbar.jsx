import React from 'react'
import AppLogo from '../atoms/AppLogo'
import Link from '../atoms/Link'
import Button from '../atoms/Button'
import Toggle from '../atoms/Toggle'

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="bg-white/80 dark:bg-surface-900/80 backdrop-blur-lg border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <AppLogo />

          <div className="hidden md:flex items-center space-x-6">
            <Link href="#dashboard">Dashboard</Link>
            <Link href="#courses">Courses</Link>
            <Link href="#analytics">Analytics</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Toggle
              isOn={darkMode}
              onToggle={toggleDarkMode}
              iconOn="Sun"
              iconOff="Moon"
            />
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-full"></div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar