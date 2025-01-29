'use client';

import { useState } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const weekStart = startOfWeek(selectedDate);

  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none">
        <div className="grid grid-cols-7 gap-px">
          {weekDays.map((day) => (
            <div key={day.toString()} className="text-center py-2">
              <div className="text-sm font-semibold">{format(day, 'EEE')}</div>
              <div className="mt-1">{format(day, 'd')}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {/* Time slots */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-1">
          {/* Calendar content here */}
        </div>
      </div>
    </div>
  );
}
