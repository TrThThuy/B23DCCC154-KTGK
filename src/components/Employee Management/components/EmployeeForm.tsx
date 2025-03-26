// src/components/EmployeeForm.tsx
import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { Employee } from '../models/Employee';

const { Option } = Select;

interface EmployeeFormProps {
    employee: Employee | null;
    onSubmit: (employee: Employee) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSubmit }) => {
    const [form] = Form.useForm();
    
    useEffect(() => {
        if (employee) {
            form.setFieldsValue(employee);
        } else {
            form.resetFields();
        }
    }, [employee, form]);

    const handleFinish = (values: any) => {
        const newEmployee: Employee = {
            id: employee ? employee.id : Date.now().toString(), // Generate ID
            fullName: values.fullName,
            position: values.position,
            department: values.department,
            salary: values.salary,
            status: 'Probation', // Default status
        };
        onSubmit(newEmployee);
    };

    return (
        <Form form={form} onFinish={handleFinish}>
            <Form.Item
                name="fullName"
                label="Full Name"
                rules={[{ required: true, message: 'Please input the full name!', min: 10, max: 50 }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="position"
                label="Position"
                rules={[{ required: true, message: 'Please select a position!' }]}
            >
                <Select>
                    <Option value="Manager">Manager</Option>
                    <Option value="Developer">Developer</Option>
                    <Option value="Designer">Designer</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="department"
                label="Department"
                rules={[{ required: true, message: 'Please select a department!' }]}
            >
                <Select>
                    <Option value="HR">HR</Option>
                    <Option value="IT">IT</Option>
                    <Option value="Sales">Sales</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="