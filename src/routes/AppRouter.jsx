import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Users from '../pages/Users/Users';

const AppRouter = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/users" />} />
        <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/users" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;