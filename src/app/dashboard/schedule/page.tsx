import SchedulingForm from '@/components/scheduling/SchedulingForm'
import Calendar from '@/components/scheduling/Calendar'

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Schedule</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">New Lesson</h2>
          <SchedulingForm />
        </div>

        <div className="bg-white shadow rounded-lg">
          <Calendar />
        </div>
      </div>
    </div>
  )
}
