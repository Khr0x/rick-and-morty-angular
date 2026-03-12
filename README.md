# Rick and Morty Angular

Proyecto Angular para explorar personajes de Rick & Morty.

Estado
------
- Aplicación SPA en Angular (frontend).

Rutas principales
------------------
- `/` — Lista de personajes (pantalla principal).
- `/character/:id` — Detalle del personaje.

Requisitos
----------
- Node.js 18+ o entorno compatible
- npm (u otro gestor de paquetes si prefieres)

Instalación
-----------
```bash
# Instalar dependencias
npm install
```

Desarrollo
----------
```bash
# Inicia servidor de desarrollo (hot-reload)
npm start
```

Build de producción
-------------------
```bash
npm run build
```

Tests
-----
- `npm test` (si tienes tests configurados en el proyecto).

Descripción rápida del proyecto
-------------------------------
- Tema: dark theme personalizado (variables en `src/styles.css`).
- Layout principal en `src/app/layouts/main-layout`.
- Lógica de personajes en `src/app/features/characters` (servicios, lista, detalle).

Notas importantes
-----------------
- La pantalla principal ahora es `/` y el detalle se encuentra en `/character/:id`.
- El `README` incluye los comandos básicos; revisa `package.json` para scripts adicionales.

Sugerencias rápidas
-------------------
- Añadir paginación o lazy-loading de más datos para mejorar UX.
- Cachear respuestas de la API si planeas muchas consultas.

Contacto
-------
Modifica y prueba localmente.
