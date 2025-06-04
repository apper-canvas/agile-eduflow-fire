import React from 'react'
import AppLogo from '../atoms/AppLogo'
import SocialButton from '../atoms/SocialButton'
import Link from '../atoms/Link'
import Text from '../atoms/Text'
import ApperIcon from '../ApperIcon' // Ensure ApperIcon is imported for SocialButton

const Footer = () => {
  const socialLinks = ['Twitter', 'Facebook', 'Linkedin', 'Youtube']
  const platformLinks = [
    { label: 'Features', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'API', href: '#' }
  ]
  const supportLinks = [
    { label: 'Help Center', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Status', href: '#' }
  ]

  return (
    <footer className="bg-surface-900 dark:bg-surface-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <AppLogo className="mb-4 text-white" />
            <Text variant="body" className="text-surface-400 mb-6 max-w-md">
              Empowering educators and students with comprehensive learning management tools for the digital age.
            </Text>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <SocialButton key={social} name={social} onClick={() => console.log(`${social} clicked`)} />
              ))}
            </div>
          </div>

          <div>
            <Text as="h4" variant="h5" className="text-white mb-4">Platform</Text>
            <ul className="space-y-2 text-surface-400">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Text as="h4" variant="h5" className="text-white mb-4">Support</Text>
            <ul className="space-y-2 text-surface-400">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-800 mt-8 pt-8 text-center text-surface-400">
          <Text variant="small">&copy; 2024 EduFlow. All rights reserved.</Text>
        </div>
      </div>
    </footer>
  )
}

export default Footer