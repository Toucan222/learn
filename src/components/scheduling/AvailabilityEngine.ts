import { TeacherAvailability, RoomAvailability, TimeSlot, SchedulingRequest } from './types';

export class AvailabilityEngine {
  private isTimeSlotAvailable(
    slot: TimeSlot,
    teacherSlots: TimeSlot[],
    roomSlots: TimeSlot[]
  ): boolean {
    const teacherAvailable = teacherSlots.some(
      (teacherSlot) =>
        teacherSlot.available &&
        teacherSlot.startTime <= slot.startTime &&
        teacherSlot.endTime >= slot.endTime
    );

    const roomAvailable = roomSlots.some(
      (roomSlot) =>
        roomSlot.available &&
        roomSlot.startTime <= slot.startTime &&
        roomSlot.endTime >= slot.endTime
    );

    return teacherAvailable && roomAvailable;
  }

  async findOverlappingAvailability(
    teacherAvailability: TeacherAvailability[],
    roomAvailability: RoomAvailability[],
    request: SchedulingRequest
  ): Promise<TimeSlot[]> {
    const availableSlots: TimeSlot[] = [];

    // Filter teachers by subject and preferred teacher if specified
    const eligibleTeachers = teacherAvailability.filter((teacher) => {
      const hasSubject = teacher.subjects.includes(request.subject);
      const isPreferred = !request.preferredTeacherId || teacher.id === request.preferredTeacherId;
      return hasSubject && isPreferred;
    });

    // Filter rooms by capacity and preferred branch
    const eligibleRooms = roomAvailability.filter((room) => {
      const hasCapacity = room.capacity >= request.studentCount;
      const isPreferredBranch = !request.preferredBranch || room.branch === request.preferredBranch;
      return hasCapacity && isPreferredBranch;
    });

    // Find overlapping time slots
    for (const teacher of eligibleTeachers) {
      for (const room of eligibleRooms) {
        for (const teacherSlot of teacher.timeSlots) {
          for (const roomSlot of room.timeSlots) {
            if (this.isTimeSlotAvailable(teacherSlot, [teacherSlot], [roomSlot])) {
              availableSlots.push(teacherSlot);
            }
          }
        }
      }
    }

    return this.filterByPreferences(availableSlots, request);
  }

  private filterByPreferences(slots: TimeSlot[], request: SchedulingRequest): TimeSlot[] {
    return slots.filter((slot) => {
      const day = slot.startTime.getDay();
      const time = slot.startTime.getHours() * 60 + slot.startTime.getMinutes();

      // Check preferred days
      if (request.preferredDays && !request.preferredDays.includes(day)) {
        return false;
      }

      // Check preferred time ranges
      if (request.preferredTimeRanges) {
        return request.preferredTimeRanges.some((range) => {
          const [startHour, startMinute] = range.start.split(':').map(Number);
          const [endHour, endMinute] = range.end.split(':').map(Number);
          const rangeStart = startHour * 60 + startMinute;
          const rangeEnd = endHour * 60 + endMinute;
          return time >= rangeStart && time <= rangeEnd;
        });
      }

      return true;
    });
  }
}

export const availabilityEngine = new AvailabilityEngine();
