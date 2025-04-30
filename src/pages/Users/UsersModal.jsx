import React from 'react';
import { Modal, Form, Input, notification } from 'antd';

const UserModal = ({ visible, onClose, refresh }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      // Simulación de creación de usuario (mock)
      const newUser = {
        id: Date.now(),
        fullName: values.fullName,
        email: values.email,
        isActive: true,
      };

      // Guardar en almacenamiento local temporal o pasar a estado superior
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

      notification.success({ message: 'Usuario creado (modo demo)' });
      refresh(); // sigue funcionando igual cuando tengas la API
      onClose();
    } catch (error) {
      notification.error({ message: 'Error al crear usuario (demo)' });
    }
  };

  return (
    <Modal
      title="Nuevo Usuario"
      open={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="fullName"
          label="Nombre Completo"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;