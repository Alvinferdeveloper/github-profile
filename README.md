# Reto de Perfil de GitHub (GitHub Profile Challenge)

Este es un proyecto completo que consta de un backend desarrollado en **NestJS** y un frontend desarrollado en **Next.js (App Router)**. Permite buscar usuarios de GitHub y visualizar sus estadísticas y métricas públicas de manera interactiva con un diseño moderno.

---

## Captura de Pantalla

![Vista del proyecto](/frontend/public/docs/screenshot.png)

---

## Estructura del Proyecto

* **`/backend`**: API de NestJS que consulta la API pública de GitHub. Escucha en el puerto `3001` y tiene habilitado el soporte para CORS.
* **`/frontend`**: Aplicación de Next.js que consume el backend y renderiza la información de los usuarios usando **React Server Components**. Escucha en el puerto `3000`.

---

## Requisitos Previos

* **Node.js** (versión 18.0.0 o superior recomendada, ya que el backend utiliza la API global nativa `fetch`).
* **npm** o tu gestor de paquetes favorito.

---

## Instalación y Configuración

Sigue estos pasos para instalar las dependencias de ambas partes del proyecto:

### 1. Clonar el repositorio e instalar dependencias del Backend

Abre una terminal en la carpeta `/backend` e instala las dependencias:

```bash
cd backend
npm install
```

### 2. Instalar dependencias del Frontend

Abre otra terminal (o navega) a la carpeta `/frontend` e instala las dependencias:

```bash
cd ../frontend
npm install
```

---

## Cómo Ejecutar el Proyecto

Debes ejecutar tanto el servidor de backend como el de frontend simultáneamente:

### Paso 1: Levantar el Backend

En la carpeta `/backend`, ejecuta el siguiente comando para levantar el servidor de NestJS en modo desarrollo (escuchará en `http://localhost:3001`):

```bash
npm run start:dev
```

### Paso 2: Levantar el Frontend

En la carpeta `/frontend`, ejecuta el siguiente comando para levantar el servidor de desarrollo de Next.js (escuchará en `http://localhost:3000`):

```bash
npm run dev
```

---

## Verificación y Uso

1. Abre tu navegador en **[http://localhost:3000](http://localhost:3000)**.
2. Al cargar por primera vez, el sistema buscará y mostrará el perfil predeterminado (`Alvinferdeveloper`).
3. Utiliza la barra de búsqueda en la parte superior para ingresar cualquier otro nombre de usuario de GitHub (por ejemplo, `github`, `google`, `vercel`) y haz clic en **Buscar**.
4. La URL del navegador se actualizará automáticamente (ej. `/github`) y mostrará en tiempo real:
   * Foto de perfil, nombre, biografía y nombre de usuario.
   * Cantidad de repositorios públicos, seguidores y seguidos.
   * Datos adicionales como ubicación, organización, sitio web y fecha de registro.
   * Enlace directo para visitar su perfil oficial en GitHub.
