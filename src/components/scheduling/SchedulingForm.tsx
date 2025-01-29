'use client';

import { useState } from 'react';
import { SchedulingRequest, LessonType } from './types';
import { schedulingEngine } from './SchedulingEngine';

export default function SchedulingForm() {
  const [request, setRequest] = useState<Partial<SchedulingRequest>>({
    lessonType: 'group',
    studentCount: 1,
    duration: 60,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const suggestions = await schedulingEngine.findAvailableSlots(request as SchedulingRequest);
    // Handle suggestions
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Lesson Type
          </label>
          <select
            value={request.lessonType}
            onChange={(e) => setRequest({ ...request, lessonType: e.target.value as LessonType })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="group">Group</option>
            <option value="private">Private</option>
            <option value="trial">Trial</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Student Count
          </label>
          <input
            type="number"
            min="1"
            value={request.studentCount}
            onChange={(e) => setRequest({ ...request, studentCount: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration (minutes)
          </label>
          <input
            type="number"
            min="30"
            step="15"
            value={request.duration}
            onChange={(e) => setRequest({ ...request, duration: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Find Available Slots
      </button>
    </form>
  );
}
