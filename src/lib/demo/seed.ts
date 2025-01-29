export const demoTeachers = [
  {
    id: 'demo-teacher-1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@tutorbase.demo',
    phone: '+1234567890',
    subjects: ['Spanish', 'French'],
    wageType: 'hourly',
    wageRate: 35,
    status: 'active',
  },
  {
    id: 'demo-teacher-2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.c@tutorbase.demo',
    phone: '+1234567891',
    subjects: ['German', 'English'],
    wageType: 'hourly',
    wageRate: 40,
    status: 'active',
  }
] as const;

export const demoRooms = [
  {
    id: 'demo-room-1',
    name: 'Room 1.1',
    branch: 'Main Branch',
    capacity: 6,
    features: ['Whiteboard', 'Projector'],
    status: 'active',
  },
  {
    id: 'demo-room-2',
    name: 'Room 1.2',
    branch: 'Main Branch',
    capacity: 4,
    features: ['Whiteboard'],
    status: 'active',
  }
] as const;

export const demoLessons = [
  {
    id: 'demo-lesson-1',
    name: 'Spanish A1',
    teacherId: 'demo-teacher-1',
    studentIds: ['demo-student-1', 'demo-student-2'],
    locationId: 'demo-room-1',
    startTime: new Date('2024-01-20T10:00:00'),
    endTime: new Date('2024-01-20T11:30:00'),
    status: 'scheduled',
    type: 'group',
    capacity: 6,
    price: 4500,
  },
  {
    id: 'demo-lesson-2',
    name: 'German Private',
    teacherId: 'demo-teacher-2',
    studentIds: ['demo-student-3'],
    locationId: 'demo-room-2',
    startTime: new Date('2024-01-20T14:00:00'),
    endTime: new Date('2024-01-20T15:00:00'),
    status: 'scheduled',
    type: 'private',
    capacity: 1,
    price: 6000,
  }
] as const;

export const demoFamilies = [
  {
    id: 'demo-family-1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    mobilePhone: '+1234567892',
    status: 'active',
    stripeId: 'demo_cus_123',
  }
] as const;

export const demoStudents = [
  {
    id: 'demo-student-1',
    familyId: 'demo-family-1',
    firstName: 'Emma',
    lastName: 'Smith',
    email: 'emma.smith@example.com',
    startDate: new Date('2024-01-01'),
    subjects: ['Spanish'],
    grade: '10th',
    status: 'active',
  }
] as const;

export const demoInvoices = [
  {
    id: 'demo-invoice-1',
    number: 'INV-2024-001',
    type: 'student',
    date: new Date('2024-01-15'),
    dueDate: new Date('2024-01-30'),
    customerId: 'demo-family-1',
    customerEmail: 'john.smith@example.com',
    status: 'sent',
    subtotal: 45000,
    total: 45000,
    balance: 45000,
  }
] as const;
