import { utils, write } from 'xlsx';
import { TeachworksEmployee, TeachworksFamily } from './types';

export class DataExport {
  exportToExcel(data: any[], sheetName: string): Blob {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, sheetName);
    const buffer = write(wb, { type: 'array', bookType: 'xlsx' });
    return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }

  async exportEmployees(): Promise<Blob> {
    // Fetch and format employee data
    const employees = []; // Fetch from Supabase
    return this.exportToExcel(employees, 'Employees');
  }

  async exportFamilies(): Promise<Blob> {
    // Fetch and format family data
    const families = []; // Fetch from Supabase
    return this.exportToExcel(families, 'Families');
  }

  generateTemplates(): { [key: string]: Blob } {
    const templates = {
      employees: this.exportToExcel([{
        type: '',
        firstName: '',
        lastName: '',
        email: '',
        wageType: '',
        employeeWage: '',
        status: ''
      }], 'Employees Template'),
      
      families: this.exportToExcel([{
        firstName: '',
        lastName: '',
        email: '',
        additionalEmail: '',
        mobilePhone: '',
        status: ''
      }], 'Families Template')
    };

    return templates;
  }
}

export const dataExport = new DataExport();
