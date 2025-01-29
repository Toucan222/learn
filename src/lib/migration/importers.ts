// Add transaction and rollback support
import { supabase } from '../supabase';
import { 
  TeachworksEmployee, 
  TeachworksFamily,
  MigrationResult,
  MigrationError 
} from './types';
import { transformEmployee, transformFamily } from './transformers';

export class DatabaseImporter {
  private errors: MigrationError[] = [];
  private processed = {
    employees: 0,
    families: 0,
    students: 0,
    lessons: 0,
    payments: 0
  };

  async importEmployees(employees: TeachworksEmployee[]): Promise<MigrationResult> {
    // Start a Supabase transaction
    const { data: client } = await supabase.rpc('begin_transaction');

    try {
      for (const employee of employees) {
        try {
          const transformed = transformEmployee(employee);
          const { error } = await supabase
            .from('teachers')
            .upsert(transformed, { onConflict: 'id' });

          if (error) {
            this.errors.push({
              type: 'employee',
              id: employee.profileId,
              field: 'database',
              message: error.message
            });
          } else {
            this.processed.employees++;
          }
        } catch (error) {
          this.errors.push({
            type: 'employee',
            id: employee.profileId,
            field: 'transform',
            message: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      if (this.errors.length > 0) {
        // Rollback if there were any errors
        await supabase.rpc('rollback_transaction');
        return {
          success: false,
          errors: this.errors,
          warnings: [],
          stats: this.processed
        };
      }

      // Commit the transaction
      await supabase.rpc('commit_transaction');
      return {
        success: true,
        errors: [],
        warnings: [],
        stats: this.processed
      };
    } catch (error) {
      // Ensure rollback on any unexpected errors
      await supabase.rpc('rollback_transaction');
      throw error;
    }
  }

  // Similar transaction handling for other import methods...
}

export const databaseImporter = new DatabaseImporter();
