// src/services/employeeService.ts
import { Employee } from '../models/Employee';

const EMPLOYEE_STORAGE_KEY = 'employees';

export const getEmployees = (): Employee[] => {
    const employees = localStorage.getItem(EMPLOYEE_STORAGE_KEY);
    return employees ? JSON.parse(employees) : [];
};

export const saveEmployees = (employees: Employee[]) => {
    localStorage.setItem(EMPLOYEE_STORAGE_KEY, JSON.stringify(employees));
};

export const addEmployee = (employee: Employee) => {
    const employees = getEmployees();
    employees.push(employee);
    saveEmployees(employees);
};

export const editEmployee = (updatedEmployee: Employee) => {
    const employees = getEmployees().map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp);
    saveEmployees(employees);
};

export const deleteEmployee = (id: string) => {
    const employees = getEmployees().filter(emp => emp.id !== id);
    saveEmployees(employees);
};