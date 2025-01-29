// Modify auth to work with demo credentials without Supabase
export async function signIn(email: string, password: string) {
  // Demo mode authentication
  const demoUsers = {
    'admin@tutorbase.demo': { password: 'demo123', role: 'admin' },
    'sarah.j@tutorbase.demo': { password: 'demo123', role: 'teacher' },
    'john.smith@example.com': { password: 'demo123', role: 'family' }
  };

  if (demoUsers[email]?.password === password) {
    return { 
      data: { 
        user: { 
          email, 
          role: demoUsers[email].role,
          id: `demo-${demoUsers[email].role}`,
        } 
      }, 
      error: null 
    };
  }

  return { data: null, error: { message: 'Invalid credentials' } };
}

export async function signOut() {
  return { error: null };
}

export async function getCurrentUser() {
  // In demo mode, we'll return null as if user is logged out
  return { user: null, error: null };
}
