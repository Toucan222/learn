import { AcademicCapIcon, UserGroupIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import StatsCard from '@/components/dashboard/StatsCard'

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value="2,451"
          description="Active students this month"
          icon={UserGroupIcon}
          trend={{ value: 12, label: "vs last month", isUpward: true }}
        />
        <StatsCard
          title="Active Teachers"
          value="48"
          description="Currently teaching"
          icon={AcademicCapIcon}
        />
        <StatsCard
          title="Scheduled Lessons"
          value="186"
          description="Next 7 days"
          icon={CalendarIcon}
          trend={{ value: 5, label: "vs last week", isUpward: true }}
        />
        <StatsCard
          title="Revenue"
          value="$24,500"
          description="This month"
          icon={CurrencyDollarIcon}
          trend={{ value: 8, label: "vs last month", isUpward: true }}
        />
      </div>
    </div>
  )
}
