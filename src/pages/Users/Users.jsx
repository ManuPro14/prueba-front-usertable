import { useEffect, useState } from 'react';
import { Table, Tag, Button, Typography, message, Space, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserModal from './UsersModal'; 
import { LogOut, Plus } from 'lucide-react';

const { Title } = Typography;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch {
      message.error('No se pudieron obtener los usuarios');
    }
  };

  const toggleUser = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/users/${id}/toggle`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isActive: !user.isActive } : user
        )
      );
    } catch {
      message.error('Error al actualizar usuario');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Fecha Creación',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Estado',
      dataIndex: 'isActive',
      key: 'estado',
      render: (active) => (
        <Tag color={active ? 'green' : 'red'}>
          {active ? 'Activo' : 'Inactivo'}
        </Tag>
      ),
    },
    {
      title: 'Cambiar estado',
      key: 'switch',
      render: (_, record) => (
        <Switch
          checked={record.isActive}
          onChange={() => toggleUser(record.id)}
          style={{ backgroundColor: record.isActive ? '#52c41a' : '#d9d9d9' }}
        />
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: '0 20px' }}>
      <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 20 }}>
        <Title level={2} style={{color: 'white'}}>Usuarios Registrados</Title>
        <Button onClick={handleLogout} danger style={{ marginLeft: 'auto' }}>
          <LogOut style={{ marginRight: 4 }} />
        </Button>
      </Space>

      <Button type="primary" onClick={() => setShowModal(true)} style={{ marginBottom: 20, backgroundColor: '#3C99C7' }}>
        <Plus style={{ margin: 2 }} />
        Crear usuario
      </Button>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered={true}
        style={{ backgroundColor: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
      />

      <UserModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        refresh={fetchUsers}
      />
    </div>
  );
};

export default Users;