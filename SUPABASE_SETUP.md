# Activar cuentas y panel privado

1. Crea un proyecto gratuito en [Supabase](https://supabase.com/dashboard) y, en **SQL Editor**, ejecuta todo el archivo `supabase/schema.sql`.
2. En **Project settings > API**, copia la URL del proyecto y la clave `anon`. En Vercel, abre **Settings > Environment Variables** y agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` para Production, Preview y Development. Luego redeploy.
3. Regístrate en el Trainer con tu correo. En el mismo SQL Editor, ejecuta una sola vez:

```sql
update public.profiles set role = 'admin'
where id = (select id from auth.users where email = 'TU_CORREO@ejemplo.com');
```

Después de iniciar sesión otra vez, aparecerá **Resultados de usuarios** en tu menú. Ninguna otra cuenta verá esa opción ni podrá consultar registros ajenos: las políticas de Supabase restringen cada fila al propietario; solo el rol `admin` tiene lectura global.
