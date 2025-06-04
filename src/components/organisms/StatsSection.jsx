import React from 'react'
import MetricCard from '../atoms/MetricCard'

const StatsSection = ({ stats, loading }) => {
  return (
    <section className="py-12 bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <MetricCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              iconColorClass={index % 2 === 0 ? 'text-primary' : 'text-secondary'}
              gradientColorClass={index % 2 === 0 ? 'from-primary/20 to-primary/10' : 'from-secondary/20 to-secondary/10'}
              index={index}
              loading={loading}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection