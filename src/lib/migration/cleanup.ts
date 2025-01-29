import { TeachworksEmployee, TeachworksFamily, MigrationResult } from './types';

export class DataCleanup {
  cleanEmployeeData(employee: Partial<TeachworksEmployee>): Partial<TeachworksEmployee> {
    return {
      ...employee,
      email: employee.email?.toLowerCase().trim(),
      firstName: this.formatName(employee.firstName),
      lastName: this.formatName(employee.lastName),
      subjects: this.cleanSubjects(employee.subjects),
      wageType: this.normalizeWageType(employee.wageType),
      status: this.normalizeStatus(employee.status)
    };
  }

  cleanFamilyData(family: Partial<TeachworksFamily>): Partial<TeachworksFamily> {
    return {
      ...family,
      email: family.email?.toLowerCase().trim(),
      additionalEmail: family.additionalEmail?.toLowerCase().trim(),
      firstName: this.formatName(family.firstName),
      lastName: this.formatName(family.lastName),
      zip: this.formatZip(family.zip),
      status: this.normalizeStatus(family.status)
    };
  }

  private formatName(name?: string): string {
    if (!name) return '';
    return name
      .trim()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  }

  private cleanSubjects(subjects?: string[]): string[] {
    if (!subjects) return [];
    return subjects
      .map(subject => subject.trim())
      .filter(Boolean)
      .filter((subject, index, self) => self.indexOf(subject) === index);
  }

  private normalizeWageType(wageType?: string): 'hourly' | 'fixed' | 'percentage' {
    switch (wageType?.toLowerCase().trim()) {
      case 'hourly':
      case 'hour':
      case 'per hour':
        return 'hourly';
      case 'fixed':
      case 'flat':
      case 'flat rate':
        return 'fixed';
      case 'percentage':
      case 'percent':
      case '%':
        return 'percentage';
      default:
        return 'hourly';
    }
  }

  private normalizeStatus(status?: string): 'active' | 'inactive' {
    const normalized = status?.toLowerCase().trim();
    return normalized === 'active' ? 'active' : 'inactive';
  }

  private formatZip(zip?: string): string {
    return zip?.replace(/[^\d]/g, '').slice(0, 5) || '';
  }
}

export const dataCleanup = new DataCleanup();
