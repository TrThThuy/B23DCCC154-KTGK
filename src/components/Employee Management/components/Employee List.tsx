// src/components/EmployeeList.tsx
import React from 'react';
import { Table, Button } from 'antd';
import { Employee } from '../models/Employee';
import { deleteEmployee } from '../services/Employee Servic';

interface EmployeeListProps {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onEdit }) => {
    const handleDelete = (id: string) => {
        const employee = employees.find(emp => emp.id === id);
        if (employee && employee.status !== 'Contract Signed') {
            deleteEmployee(id);
            window.location.reload(); // Refresh the page to update the list
        } else {
            alert('Cannot delete employee with a signed contract.');
        }
    };

    return (
        <Table
            dataSource={employees}
            rowKey="id"
            columns={[
                { title: 'Employee ID', dataIndex: 'id' },
                { title: 'Full Name', dataIndex: 'fullName' },
                { title: 'Position', dataIndex: 'position' },
                { title: 'Department', dataIndex: 'department' },
                { title: 'Salary', dataIndex: 'salary' },
                { title: 'Status', dataIndex: 'status' },
                {
                    title: 'Actions',
                    render: (text, record) => (
                        <>
                            <Button onClick={() => onEdit(record)}>Edit</Button>
                            <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
                        </>
                    ),
                },
            ]}
        />
    );
};

export default EmployeeList;