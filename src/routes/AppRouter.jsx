import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Users from '../pages/Users/Users';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const isAuthenticated = token && user?.isActive;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const RootRedirect = () => {
  const token = localStorage.getItem('token');
  return <Navigate to={token ? '/users' : '/login'} replace />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirección inicial */}
        <Route path="/" element={<RootRedirect />} />

        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/users" element={<Users />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;