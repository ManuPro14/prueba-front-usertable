import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Modal } from 'antd';
import axios from 'axios';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Limpiar errores al cargar el componente
  useEffect(() => {
    setErrorVisible(false);
    setErrorMessage('');
  }, []);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/auth/login', values);
      console.log('Respuesta del servidor:', response.data);

      const { access_token, user } = response.data;
      const isValid = access_token && user?.isActive;

      if (isValid) {
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/users', { replace: true });
      } else {
        throw new Error('Estructura de respuesta inválida');
      }
    } catch (error) {
      // Manejo detallado de errores
      let message = 'Error de conexión con el servidor';
      
      if (error.response) {
        message = error.response.data?.message || 'Credenciales inválidas';
      } else if (error.message.includes('Estructura')) {
        message = 'Error en formato de respuesta del servidor';
      }
      
      setErrorMessage(message);
      setErrorVisible(true);
      
      // Limpiar credenciales inválidas
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: 500, 
      margin: '100px auto', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      padding: 20
    }}>
      <h1 style={{ marginBottom: 30 }}>Inicie sesión para ver los usuarios</h1>
      
      <Form 
        onFinish={handleLogin} 
        style={{ width: '100%' }}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="Correo electrónico"
          rules={[
            { required: true, message: 'Campo obligatorio' },
            { 
              type: 'email', 
              message: 'Formato de email inválido',
              validateTrigger: 'onBlur'
            }
          ]}
        >
          <Input placeholder="ejemplo@dominio.com" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            { required: true, message: 'Campo obligatorio' },
            { min: 6, message: 'Mínimo 6 caracteres' }
          ]}
        >
          <Input.Password placeholder="••••••" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          size="large"
          style={{ marginTop: 20 }}
        >
          Ingresar
        </Button>
      </Form>

      <Modal
        title="Error en autenticación"
        open={errorVisible}
        onOk={() => setErrorVisible(false)}
        onCancel={() => setErrorVisible(false)}
        okText="Entendido"
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
      >
        <div style={{ padding: 20 }}>
          <p style={{ marginBottom: 0 }}>❌ {errorMessage}</p>
        </div>
      </Modal>
    </div>
  );
};

export default Login;