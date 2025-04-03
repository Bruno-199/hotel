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
│   │   ├── habitaciones.js    # Consultas para habitaciones
│   │   └── imagenes.js        # Consultas para imágenes
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


## Uso

Instrucciones de instalación y uso

```sh


# Instalar dependencias (front y back por separado)

cd front
npm install
---------
cd back
npm install

# Correr front
cd front
npm run dev

# Correr servidor
cd back
npm run dev
