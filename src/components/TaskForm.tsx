import React from 'react';
import { Button, Form, Input } from 'antd';
import { createTask } from '../api/taskservice'; // Axios API function

const TaskForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      await createTask(values); // Send data to backend
      alert('✅ Task created successfully!');
      form.resetFields();
    } catch (err) {
      alert('❌ Failed to create task. Check console.');
      console.error('Error creating task:', err);
    }
  };

  return (
    <div style={{ marginBottom: 40 }}>
      <h2>Create New Task</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 400 }}
      >
        <Form.Item name="id" label="Task ID" rules={[{ required: true }]}>
          <Input placeholder="Enter task ID" />
        </Form.Item>
        <Form.Item name="name" label="Task Name" rules={[{ required: true }]}>
          <Input placeholder="Enter task name" />
        </Form.Item>
        <Form.Item name="owner" label="Owner" rules={[{ required: true }]}>
          <Input placeholder="Enter owner name" />
        </Form.Item>
        <Form.Item name="command" label="Command" rules={[{ required: true }]}>
          <Input placeholder="Enter shell command" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskForm;
