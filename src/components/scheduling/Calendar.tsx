import { useState } from 'react'
import { TimeSlot, TeacherAvailability, RoomAvailability } from './types'

interface CalendarProps {
  teacherAvailability?: TeacherAvailability[]
  roomAvailability?: RoomAvailability[]
  selectedSlots?: TimeSlot[]
  onSlotSelect?: (slot: TimeSlot) => void
}

export default function Calendar({
  teacherAvailability,
  roomAvailability,
  selectedSlots,
  onSlotSelect
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'day' | 'week'>('week')

  const hours = Array.from({ length: 14 }, (_, i) => i + 8) // 8 AM to 10 PM

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex space-x-4">
          <button
            onClick={() => setView('day')}
            className={`px-3 py-1 rounded-md ${
              view === 'day' ? 'bg-primary-100 text-primary-700' : 'text-gray-600'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-3 py-1 rounded-md ${
              view === 'week' ? 'bg-primary-100 text-primary-700' : 'text-gray-600'
            }`}
          >
            Week
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              const newDate = new Date(currentDate)
              newDate.setDate(newDate.getDate() - (view === 'day' ? 1 : 7))
              setCurrentDate(newDate)
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            &larr;
          </button>
          <span className="text-sm font-medium">
            {currentDate.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          <button
            onClick={() => {
              const newDate = new Date(currentDate)
              newDate.setDate(newDate.getDate() + (view === 'day' ? 1 : 7))
              setCurrentDate(newDate)
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-[4rem_1fr] h-full">
          <div className="border-r">
            {hours.map((hour) => (
              <div key={hour} className="h-20 border-b text-xs text-gray-500 text-right pr-2 pt-1">
                {hour}:00
              </div>
            ))}
          </div>
          <div className="relative">
            {/* Time slots would be rendered here */}
            <div className="absolute inset-0">
              {hours.map((hour) => (
                <div key={hour} className="h-20 border-b border-gray-100" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
