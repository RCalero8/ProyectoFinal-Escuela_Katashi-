# 🥋 Escuela Katashi

Aplicación web full-stack para la gestión de una escuela de artes marciales. Permite administrar alumnos, clases, instructores y pagos desde una interfaz moderna y responsive.

---

## 🌐 Despliegue

| Entorno | URL |
|---|---|
| Frontend | [proyecto-final-escuela-katashi.vercel.app](https://vercel.com/rcalero8s-projects/proyecto-final-escuela-katashi/deployments) |
| Backend | [Railway](https://railway.com/project/1968c7da-9415-486c-a9e3-08dd7b234a18?environmentId=f9d634c7-709b-4ac1-a81d-35484cec04f8) |

---

## 🛠️ Tech Stack

### Frontend
| Tecnología | Uso |
|---|---|
| [React](https://react.dev/) | Librería UI |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Vite](https://vitejs.dev/) | Bundler y dev server |

### Backend
| Tecnología | Uso |
|---|---|
| [Node.js](https://nodejs.org/) | Runtime de JavaScript |
| [Express](https://expressjs.com/) | Framework HTTP |
| [JWT](https://jwt.io/) | Autenticación y autorización |
| Base de datos relacional | Persistencia de datos |

---

## 📁 Estructura del proyecto

```
proyecto-final-escuela-katashi/
├── frontend/          # React + TypeScript (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── ...
│   └── package.json
│
└── backend/           # Node.js + Express
    ├── src/
    │   ├── routes/
    │   ├── controllers/
    │   ├── models/
    │   └── middleware/
    └── package.json
```

---

## ⚙️ Instalación y ejecución local

### Requisitos previos

- Node.js `>= 18`
- npm o yarn
- Base de datos configurada y en ejecución

### 1. Clona el repositorio

```bash
git clone https://github.com/rcalero8/proyecto-final-escuela-katashi.git
cd proyecto-final-escuela-katashi
```

### 2. Configura el backend

```bash
cd backend
cp .env.example .env   # Rellena las variables de entorno
npm install
npm run dev
```

### 3. Configura el frontend

```bash
cd frontend
cp .env.example .env   # Rellena las variables de entorno
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:5173` y el backend en `http://localhost:3000`.

---

## 🔐 Variables de entorno

### Backend (`.env`)

```env
PORT=3000
DATABASE_URL=           # URL de conexión a la base de datos
JWT_SECRET=             # Clave secreta para firmar tokens JWT
JWT_EXPIRES_IN=7d
```

### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:3000   # URL del backend
```

---

## 🚀 Scripts disponibles

### Backend

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor en modo desarrollo |
| `npm run build` | Compila para producción |
| `npm start` | Inicia el servidor compilado |

### Frontend

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Previsualiza el build |

---

## 👤 Autor

**rcalero8** — [GitHub](https://github.com/rcalero8)

---

> Proyecto final desarrollado como parte del programa formativo de desarrollo web.
