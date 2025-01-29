import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ComponentType<{ className?: string }>
  trend?: {
    value: number
    label: string
    isUpward: boolean
  }
  className?: string
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className
}: StatsCardProps) {
  return (
    <div className={cn("rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5", className)}>
      <div className="flex items-center gap-x-4">
        <Icon className="h-6 w-6 text-gray-400" />
        <h3 className="flex-1 text-sm font-medium leading-6 text-gray-900">{title}</h3>
      </div>
      <div className="mt-4">
        <div className="flex items-baseline gap-x-2">
          <p className="text-2xl font-semibold tracking-tight text-gray-900">{value}</p>
          {trend && (
            <span className={cn(
              "text-xs",
              trend.isUpward ? "text-green-600" : "text-red-600"
            )}>
              {trend.isUpward ? '↑' : '↓'} {trend.value}% {trend.label}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
    </div>
  )
}
