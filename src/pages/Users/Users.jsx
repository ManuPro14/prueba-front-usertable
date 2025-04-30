import React, { useEffect, useState } from 'react';
import { Table, Switch, Button, Space, notification, Card, Typography, Empty } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
// import api from '../../api';
import UserModal from './UsersModal';

const { Title, Text } = Typography;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockUsers = [
    { id: 1, fullName: 'Juan Pérez', email: 'juan@example.com', isActive: true },
    { id: 2, fullName: 'María García', email: 'maria@example.com', isActive: false },
  ];

  const fetchUsers = async () => {
    try {
      // const response = await api.get('/users');
      // setUsers(response.data);
      setUsers(mockUsers);
    } catch (error) {
      notification.error({ message: 'Error al cargar usuarios' });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleActive = async (userId) => {
    try {
      // await api.patch(`/users/${userId}/toggle-active`);
      setUsers(prev =>
        prev.map(user =>
          user.id === userId ? { ...user, isActive: !user.isActive } : user
        )
      );
    } catch (error) {
      notification.error({ message: 'Error al cambiar estado' });
    }
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <Text type="secondary">{text}</Text>,
    },
    {
      title: 'Estado',
      key: 'isActive',
      align: 'center',
      render: (_, record) => (
        <Switch
          checked={record.isActive}
          onChange={() => toggleActive(record.id)}
          checkedChildren="Activo"
          unCheckedChildren="Inactivo"
        />
      ),
    },
  ];

  return (
    <div style={{ padding: '40px 16px', heigth: 'auto', display: 'flex', justifyContent: 'center' }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '1200px',
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        }}
        bodyStyle={{ padding: 32 }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Space
            style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Title level={3} style={{ margin: 0 }}>
              <UserOutlined style={{ marginRight: 8 }} />
              Gestión de Usuarios
            </Title>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
              size="middle"
              style={{ borderRadius: 6 }}
            >
              Nuevo Usuario
            </Button>
          </Space>

          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            bordered
            pagination={{ pageSize: 5, showSizeChanger: false }}
            locale={{
              emptyText: <Empty description="No hay usuarios disponibles" />,
            }}
          />
        </Space>
      </Card>

      <UserModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refresh={fetchUsers}
      />
    </div>
  );
};

export default Users;