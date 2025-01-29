import { demoTeachers, demoRooms, demoLessons, demoFamilies, demoStudents, demoInvoices } from './seed';

export async function initializeDemoData() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== 'true') {
    return;
  }

  const { supabase } = await import('../supabase');

  try {
    // Insert demo data in correct order to maintain relationships
    await supabase.from('teachers').upsert(demoTeachers);
    await supabase.from('rooms').upsert(demoRooms);
    await supabase.from('families').upsert(demoFamilies);
    await supabase.from('students').upsert(demoStudents);
    await supabase.from('lessons').upsert(demoLessons);
    await supabase.from('invoices').upsert(demoInvoices);

    console.log('Demo data initialized successfully');
  } catch (error) {
    console.error('Error initializing demo data:', error);
  }
}

export const DEMO_CREDENTIALS = {
  admin: {
    email: 'admin@tutorbase.demo',
    password: 'demo123'
  },
  teacher: {
    email: 'sarah.j@tutorbase.demo',
    password: 'demo123'
  },
  family: {
    email: 'john.smith@example.com',
    password: 'demo123'
  }
};
