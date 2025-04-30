import React from 'react';
import { Modal, Form, Input, notification, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const UserModal = ({ visible, onClose, refresh }) => {
  const [form] = Form.useForm();
  const token = localStorage.getItem('token');

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:3000/users', {
        name: values.fullName,
        email: values.email,
        password: values.password,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      notification.success({ message: 'Usuario creado correctamente' });
      refresh();
      onClose();
      form.resetFields();
    } catch (error) {
      const msg = error.response?.data?.message;
  
      if (msg === 'El correo ya está registrado') {
        form.setFields([
          {
            name: 'email',
            errors: ['Este correo ya está en uso'],
          },
        ]);
      } else {
        notification.error({
          message: 'Error al crear usuario',
          description: msg || 'Error desconocido',
        });
      }
    }
  };

  return (
    <Modal
      title={<Title level={4} style={{ marginBottom: 0 }}>Nuevo Usuario</Title>}
      open={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Crear"
      cancelText="Cancelar"
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="fullName"
          label="Nombre Completo"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nombre completo" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Correo"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input placeholder="correo@ejemplo.com" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password placeholder="••••••" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;