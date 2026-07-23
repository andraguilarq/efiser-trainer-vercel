# EFISER Trainer

Aplicación de entrenamiento para el examen EFISER, construida con React y Vite.

## Desarrollo local

```bash
npm install
npm run dev
```

## Verificación de producción

```bash
npm install
npm run build
```

## Publicación en Vercel

1. Subir a la raíz del repositorio `src`, `public`, `index.html`, `package.json`, `package-lock.json`, `vite.config.js` y `vercel.json`.
2. No subir `node_modules`, `dist`, `.sandbox-bin` ni archivos ZIP.
3. Conectar el repositorio a Vercel usando la rama `main`.
4. Vercel ejecutará `npm run build` y publicará la carpeta `dist`.

El progreso de cada usuario se conserva localmente en su navegador.
