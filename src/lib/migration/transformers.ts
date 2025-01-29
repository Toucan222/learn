import { 
  TeachworksEmployee, 
  TeachworksFamily,
  TeachworksPermissions 
} from './types';
import { Teacher, Family, User } from '@/types';

export function transformEmployee(employee: TeachworksEmployee): Teacher {
  return {
    id: employee.profileId,
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    phone: employee.mobilePhone,
    subjects: employee.subjects,
    wageType: transformWageType(employee.wageType),
    wageRate: employee.employeeWage,
    status: transformStatus(employee.status),
    createdAt: employee.createdAt,
    updatedAt: employee.updatedAt
  };
}

export function transformFamily(family: TeachworksFamily): Family {
  return {
    id: family.id,
    title: family.title,
    firstName: family.firstName,
    lastName: family.lastName,
    email: family.email,
    additionalEmail: family.additionalEmail,
    mobilePhone: family.mobilePhone,
    homePhone: family.homePhone,
    workPhone: family.workPhone,
    address: family.address,
    address2: family.address2,
    city: family.city,
    state: family.state,
    zip: family.zip,
    country: family.country,
    additionalInfo: family.additionalInfo,
    status: transformStatus(family.status),
    stripeId: family.stripeId,
    createdAt: family.createdAt,
    updatedAt: family.updatedAt
  };
}

function transformWageType(wageType: string): 'hourly' | 'fixed' | 'percentage' {
  switch (wageType.toLowerCase()) {
    case 'hourly':
      return 'hourly';
    case 'fixed':
      return 'fixed';
    case 'percentage':
      return 'percentage';
    default:
      return 'hourly';
  }
}

function transformStatus(status: string): 'active' | 'inactive' {
  return status.toLowerCase() === 'active' ? 'active' : 'inactive';
}
