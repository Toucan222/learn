import { MigrationResult, MigrationError, MigrationWarning } from './types';
import { supabase } from '../supabase';

export class DataVerification {
  async verifyImport(result: MigrationResult): Promise<{
    verified: boolean;
    errors: MigrationError[];
    warnings: MigrationWarning[];
  }> {
    const errors: MigrationError[] = [];
    const warnings: MigrationWarning[] = [];

    // Verify employee counts
    const { count: employeeCount } = await supabase
      .from('teachers')
      .select('*', { count: 'exact' });

    if (employeeCount !== result.stats.employeesProcessed) {
      errors.push({
        type: 'employee',
        id: 'count-mismatch',
        field: 'count',
        message: `Expected ${result.stats.employeesProcessed} employees, found ${employeeCount}`
      });
    }

    // Verify family counts
    const { count: familyCount } = await supabase
      .from('families')
      .select('*', { count: 'exact' });

    if (familyCount !== result.stats.familiesProcessed) {
      errors.push({
        type: 'family',
        id: 'count-mismatch',
        field: 'count',
        message: `Expected ${result.stats.familiesProcessed} families, found ${familyCount}`
      });
    }

    // Verify data integrity
    const { data: duplicateEmails } = await supabase
      .from('teachers')
      .select('email')
      .filter('email', 'neq', null)
      .filter('email', 'neq', '')
      .group('email')
      .having('count', 'gt', 1);

    if (duplicateEmails && duplicateEmails.length > 0) {
      warnings.push({
        type: 'employee',
        id: 'duplicate-emails',
        field: 'email',
        message: `Found ${duplicateEmails.length} duplicate email addresses`
      });
    }

    return {
      verified: errors.length === 0,
      errors,
      warnings
    };
  }

  async verifyRelationships(): Promise<{
    errors: MigrationError[];
    warnings: MigrationWarning[];
  }> {
    const errors: MigrationError[] = [];
    const warnings: MigrationWarning[] = [];

    // Verify student-family relationships
    const { data: orphanedStudents } = await supabase
      .from('students')
      .select('id, firstName, lastName')
      .filter('familyId', 'not.is', null)
      .not('familyId', 'in', '(select id from families)');

    if (orphanedStudents && orphanedStudents.length > 0) {
      errors.push({
        type: 'student',
        id: 'orphaned',
        field: 'familyId',
        message: `Found ${orphanedStudents.length} students with invalid family references`
      });
    }

    return { errors, warnings };
  }
}

export const dataVerification = new DataVerification();
