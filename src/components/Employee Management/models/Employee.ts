// src/models/Employee.ts
export interface Employee {
    id: string;
    fullName: string;
    position: string;
    department: string;
    salary: number;
    status: 'Contract Signed' | 'Probation';
}