export type TimeSlot = {
  startTime: Date
  endTime: Date
  available: boolean
}

export type RoomAvailability = {
  id: string
  name: string
  capacity: number
  branch: string
  timeSlots: TimeSlot[]
}

export type TeacherAvailability = {
  id: string
  name: string
  subjects: string[]
  timeSlots: TimeSlot[]
}

export type SchedulingSuggestion = {
  teacher: TeacherAvailability
  room: RoomAvailability
  timeSlot: TimeSlot
  score: number // Higher score means better match
}

export type LessonType = 'group' | 'private' | 'trial' | 'ongoing'

export type SchedulingRequest = {
  lessonType: LessonType
  subject: string
  level?: string
  preferredBranch?: string
  studentCount: number
  duration: number // in minutes
  preferredTeacherId?: string
  preferredDays?: number[] // 0-6 for Sunday-Saturday
  preferredTimeRanges?: {
    start: string // HH:mm format
    end: string // HH:mm format
  }[]
}
