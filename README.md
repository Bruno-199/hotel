# Hotel

Este repositorio contiene el código fuente de un proyecto de hotel. A continuación, se presentan algunas recomendaciones y directrices para contribuir y mantener el código.

## Recomendaciones

- No usar mayúsculas en los nombres de archivos y directorios.
- Usar guion bajo `_` en lugar de espacios en los nombres de archivos y directorios.

## Estructura del Proyecto

Explico aquí brevemente la estructura del proyecto, las carpetas y archivos importantes.

## Estructura del Proyecto

```
hotel/
├── README.md
├── back/                   # Backend de la aplicación
│   ├── config/            # Configuraciones
│   │   └── db.js         # Configuración de la base de datos MySQL
│   ├── controllers/       # Controladores
│   │   ├── habitaciones.js    # Lógica de negocio para habitaciones
│   │   └── imagenes.js        # Lógica de negocio para imágenes
│   ├── routes/           # Rutas de la API
│   │   ├── habitaciones.js    # Endpoints de habitaciones
│   │   └── imagenes.js        # Endpoints de imágenes
│   ├── .gitignore        # Archivos ignorados por git
│   ├── index.js          # Punto de entrada de la aplicación
│   └── package.json      # Dependencias y scripts
│
└── front/                # Frontend de la aplicación
    └── index.html       # Página principal
```

### Descripción de la estructura

- **back/**: Contiene todo el código del servidor
  - **config/**: Archivos de configuración
    - `db.js`: Configuración de la conexión a MySQL
  - **controllers/**: Lógica de negocio
    - `habitaciones.js`: Gestión de habitaciones (CRUD)
    - `imagenes.js`: Gestión de imágenes de habitaciones
  - **routes/**: Definición de rutas API
    - `habitaciones.js`: Rutas para gestión de habitaciones
    - `imagenes.js`: Rutas para gestión de imágenes
  - `index.js`: Archivo principal que inicia el servidor
  - `package.json`: Gestión de dependencias y scripts

- **front/**: Contiene el código del cliente
  - `index.html`: Página principal de la aplicación

## Uso

Instrucciones de instalación y uso

```sh


# Instalar dependencias
npm install

# correr servidor
npm run dev
