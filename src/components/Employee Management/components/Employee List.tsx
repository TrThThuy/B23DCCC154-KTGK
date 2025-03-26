// src/components/EmployeeList.tsx
import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select } from 'antd';
import { Employee } from '../models/Employee';
import { getEmployees, deleteEmployee } from '../services/Employee Service';

const { Option } = Select;

const EmployeeList: React.FC<{ onEdit: (employee: Employee) => void }> = ({ onEdit }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filterPosition, setFilterPosition] = useState<string | undefined>(undefined);
    const [filterDepartment, setFilterDepartment] = useState<string | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setEmployees(getEmployees());
    }, []);

    const handleDelete = (id: string) => {
        const employee = employees.find(emp => emp.id === id);
        if (employee && employee.status !== 'Contract Signed') {
            deleteEmployee(id);
            setEmployees(getEmployees());
        } else {
            alert('Cannot delete employee with a signed contract.');
        }
    };

    const filteredEmployees = employees.filter(emp => {
        return (
            (!filterPosition || emp.position === filterPosition) &&
            (!filterDepartment || emp.department === filterDepartment) &&
            (emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || emp.id.includes(searchTerm))
        );
    });

    return (
        <div>
            <Input placeholder="Search by ID or Name" onChange={e => setSearchTerm(e.target.value)} />
            <Select placeholder="Filter by Position" onChange={setFilterPosition} style={{ width: 200 }}>
                <Option value="Manager">Manager</Option>
                <Option value="Developer">Developer</Option>
                <Option value="Designer">Designer</Option>
            </Select>
            <Select placeholder="Filter by Department" onChange={setFilterDepartment} style={{ width: 200 }}>
                <Option value="HR">HR</Option>
                <Option value="IT">IT</Option>
                <Option value="Sales">Sales</Option>
            </Select>
            <Table
                dataSource={filteredEmployees.sort((a, b) => b.salary - a.salary)}
                rowKey="id"
                columns={[
                    { title: 'Employee ID', dataIndex: 'id' },
                    { title: 'Full Name', dataIndex: 'full  },
                    