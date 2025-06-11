import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, message } from 'antd';
import { getAllTasks, searchTasks, deleteTask, runTask } from '../api/taskservice';

const TaskList = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [outputModalVisible, setOutputModalVisible] = useState(false);
  const [selectedOutput, setSelectedOutput] = useState('');

  const fetchAndSetTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(formatTasks(data));
    } catch (err) {
      console.error('Failed to load tasks:', err);
    }
  };

  useEffect(() => {
    fetchAndSetTasks();
  }, []);

  const formatTasks = (data: any[]) =>
    data.map((task: any, index: number) => ({
      key: task.id || index,
      id: task.id || 'N/A',
      name: task.name || 'N/A',
      owner: task.owner || 'N/A',
      command: task.command || 'N/A',
      executions: task.taskExecutions?.length ?? 0,
      output: task.taskExecutions?.[task.taskExecutions.length - 1]?.output || '',
    }));

  const handleSearch = async () => {
    try {
      const results = await searchTasks(searchText);
      setTasks(formatTasks(results));
    } catch (err) {
      message.error('Search failed');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      message.success('Task deleted');
      fetchAndSetTasks();
    } catch (err) {
      message.error('Delete failed');
    }
  };

  const handleRun = async (id: string) => {
    try {
      await runTask(id);
      message.success('Task executed');
      fetchAndSetTasks();
    } catch (err) {
      message.error('Execution failed');
    }
  };

  const columns = [
    { title: 'Task ID', dataIndex: 'id', key: 'id' },
    { title: 'Task Name', dataIndex: 'name', key: 'name' },
    { title: 'Owner', dataIndex: 'owner', key: 'owner' },
    { title: 'Command', dataIndex: 'command', key: 'command' },
    { title: 'Executions', dataIndex: 'executions', key: 'executions' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => handleRun(record.id)} style={{ marginRight: 8 }}>
            Run
          </Button>
          <Button danger onClick={() => handleDelete(record.id)} style={{ marginRight: 8 }}>
            Delete
          </Button>
          <Button
            type="default"
            onClick={() => {
              setSelectedOutput(record.output || 'No output yet');
              setOutputModalVisible(true);
            }}
          >
            View Output
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>All Tasks (From MongoDB)</h2>

      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search task by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300, marginRight: 8 }}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button onClick={fetchAndSetTasks} style={{ marginLeft: 8 }}>
          Reset
        </Button>
      </div>

      <Table dataSource={tasks} columns={columns} pagination={false} />

      <Modal
        title="Command Output"
        visible={outputModalVisible}
        onCancel={() => setOutputModalVisible(false)}
        footer={null}
      >
        <pre>{selectedOutput}</pre>
      </Modal>
    </div>
  );
};

export default TaskList;
