// src/pages/EmployeeManagement.tsx
import React, { useEffect, useState } from 'react';
import { Button, Modal, notification } from 'antd';
import EmployeeList from '../components/Employee List';
import EmployeeForm from '../components/EmployeeForm';
import { Employee } from '../models/Employee';
import { getEmployees, addEmployee, editEmployee } from '../services/Employee Service';

const EmployeeManagement: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        setEmployees(getEmployees());
    }, []);

    const handleAddEmployee = (employee: Employee) => {
        addEmployee(employee);
        setEmployees(getEmployees());
        notification.success({ message: 'Employee added successfully!' });
        setIsModalVisible(false);
    };

    const handleEditEmployee = (employee: Employee) => {
        if (currentEmployee) {
            editEmployee(employee);
            setEmployees(getEmployees());
            notification.success({ message: 'Employee updated successfully!' });
            setIsModalVisible(false);
        }
    };

    const openModal = (employee?: Employee) => {
        setCurrentEmployee(employee || null);
        setIsModalVisible(true);
    };

    return (
        <div>
            <h1>Employee Management</h1>
            <Button type="primary" onClick={() => openModal()}>Add Employee</Button>
            <EmployeeList onEdit={openModal} employees={employees} />
            <Modal
                title={currentEmployee ? 'Edit Employee' : 'Add Employee'}
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <EmployeeForm
                    employee={currentEmployee}
                    onSubmit={currentEmployee ? handleEditEmployee : handleAddEmployee}
                />
            </Modal>
        </div>
    );
};

export default EmployeeManagement;