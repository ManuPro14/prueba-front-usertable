import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    // Usuario genérico de prueba
    const dummyUser = {
      email: 'demo@demo.com',
      password: '123456',
      token: 'demo-token',
    };

    try {
      if (
        values.email === dummyUser.email &&
        values.password === dummyUser.password
      ) {
        localStorage.setItem('token', dummyUser.token);
        notification.success({ message: 'Inicio de sesión exitoso (demo)' });
        navigate('/users');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Credenciales inválidas o usuario inactivo (demo)',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '100px auto', flexDirection: 'column', alignItems: 'center', display: 'flex' }}>
      <h1 style={{}}>Inicie sesión para ver los usuarios.</h1>
      <Form onFinish={onFinish} style={{ padding: 20,maxWidth: 400 }} layout="vertical">
        <Form.Item
          name="email"
          rules={[{ required: true, type: 'email', message: 'Email inválido' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Ingresar
        </Button>
      </Form>
    </div>
  );
};

export default Login;