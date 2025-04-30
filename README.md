```markdown
# Prueba Técnica - Frontend: Gestión de Usuarios

Aplicación React para gestión de usuarios con autenticación JWT y tabla dinámica.  
Integrada con backend NestJS y base de datos PostgreSQL.

![Demo](https://i.imgur.com/5XGJh3P.png)

## 🚀 Requisitos Previos

- [Node.js v18+](https://nodejs.org/)
- [Git](https://git-scm.com/)
- Backend en ejecución ([Repositorio del backend](https://github.com/ManuPro14/prueba-back-usertable))

## 📦 Estructura del Proyecto
```

prueba-front-usertable/
├── src/
│ ├── api/ # Configuración de Axios
│ ├── components/ # Componentes reutilizables
│ ├── pages/ # Vistas principales
│ ├── routes/ # Configuración de enrutamiento
│ └── App.jsx # Componente raíz
└── vite.config.js # Configuración de Vite

````

## 🛠️ Configuración Inicial

### 1. Clonar el Repositorio
```bash
git clone https://github.com/ManuPro14/prueba-front-usertable
cd prueba-front-usertable
````

### 2. Configurar Variables de Entorno

Crear archivo `.env` en la raíz:

```env
VITE_API_URL=http://localhost:3000  # URL del backend
```

## ⚙️ Instalar Dependencias

```bash
npm install
# o
yarn install
```

## 🚦 Ejecutar la Aplicación

```bash
npm run dev
# Aplicación disponible en: http://localhost:5173
```

## 🖥️ Vistas Principales

### Login

- Autenticación con email y contraseña
- Validación en tiempo real de formato
- Manejo de errores con modales

![Login](https://i.imgur.com/8fKXZQl.png)

### Tabla de Usuarios

- Listado dinámico con paginación
- Filtrado por estado activo/inactivo
- Botón para cambiar estado de usuarios
- Diseño responsive con Ant Design

![Tabla](https://i.imgur.com/3GvVW7a.png)

## 🔌 Integración con Backend

El frontend consume estos endpoints:

| Método | Ruta              | Función                    |
| ------ | ----------------- | -------------------------- |
| POST   | /auth/login       | Autenticación JWT          |
| GET    | /users            | Obtener todos los usuarios |
| PATCH  | /users/:id/toggle | Cambiar estado de usuario  |

## 🛠️ Tecnologías Utilizadas

- **Core**: React 18, Vite
- **UI**: Ant Design, CSS Modules
- **Gestión de Estado**: React Router, LocalStorage
- **HTTP Client**: Axios
- **Herramientas**: npm, Git

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

### 🔗 Recursos Adicionales

- [Documentación de la API](http://localhost:3000/api) (requiere backend en ejecución)
- [Repositorio del Backend](https://github.com/ManuPro14/prueba-back-usertable)

![Flujo de Autenticación](https://i.imgur.com/XrJkF9m.png)

**¡Listo para desarrollar!** 🚀

```

Este README está optimizado para:
- ✅ Instalación rápida en 3 pasos
- ✅ Integración clara con el backend
- ✅ Visualización inmediata de funcionalidades
- ✅ Compatibilidad con entornos de desarrollo locales
```
