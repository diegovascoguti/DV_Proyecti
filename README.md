*App Cuidador de Pacientes**

Esta es una aplicación de gestión para cuidadores de pacientes con Parkinson. La aplicación permite a los cuidadores gestionar actividades diarias, realizar una encuesta inicial sobre el estado del paciente y conectarse con una red de apoyo. La aplicación está desarrollada con un enfoque Full Stack utilizando React para el frontend y Node.js con Express y MongoDB para el backend.

---

**Funcionalidades**

- **Registro e Inicio de Sesión**: Los cuidadores pueden registrarse e iniciar sesión. Al iniciar sesión por primera vez, deben realizar una encuesta de diagnóstico.
- **Gestión de Actividades**: Los cuidadores pueden agregar, modificar y eliminar actividades para los pacientes. Solo se pueden eliminar las actividades marcadas como cumplidas.
- **Encuesta de Diagnóstico**: Los cuidadores completan una encuesta sobre el estado del paciente. Los resultados se almacenan y se muestran en la pantalla principal.
- **Red de Apoyo**: La aplicación permite a los cuidadores conectarse con otros cuidadores a través de una red de apoyo.

---

**Tecnologías**

**Frontend**:

- React.js con axios para las solicitudes HTTP.
- Bootstrap para el diseño e interfaz de usuario.
- JWT-decode para manejar los tokens de autenticación.
- FontAwesome para iconos visuales.

**Backend**:

- Node.js y Express.js para el servidor.
- MongoDB para la base de datos.
- Mongoose para modelar los datos.
- JSON Web Tokens (JWT) para la autenticación.

---

**Instalación y configuración**

1. **Clonar el repositorio**:
    - Ejecutar el comando: git clone [https://github.com/diegovascoguti/DV_Proyecti.git](https://github.com/diegovascoguti/DV_Proyecti.git)
    - Navegar al proyecto: `cd cuidador-parkinson-app`
2. **Instalar dependencias del frontend**:
    - Navegar al directorio frontend: `cd frontend`
    - Ejecutar: `npm install`
3. **Instalar dependencias del backend**:
    - Navegar al directorio backend: `cd ../backend`
    - Ejecutar: `npm install`
4. **Configurar variables de entorno**:
    - Crear un archivo `.env` en la raíz del directorio backend con el siguiente contenido:
    
    JWT_SECRET=your_jwt_secret
    MONGO_URI=mongodb://localhost:27017/cuidadorDB
    
    1. **Iniciar la aplicación**:
    - Para el backend, ejecutar: `npm start`
    - Para el frontend, navegar al directorio frontend: `cd frontend` y ejecutar: `npm start`
    - La aplicación estará disponible en `http://localhost:3000`.

**Estructura del proyecto**

- frontend/
    - src/
        - components/
            - ActivityManager.js
            - Main.js
        - App.js
        - index.js
- backend/
    - models/
        - User.js
        - Survey.js
        - Activity.js
    - routes/
        - auth.js
        - survey.js
        - activity.js
    - server.js
- [README.md](http://readme.md/)

Aquí tienes el contenido de tu README en texto normal:

---

**App Cuidador de Pacientes**

Esta es una aplicación de gestión para cuidadores de pacientes con Parkinson. La aplicación permite a los cuidadores gestionar actividades diarias, realizar una encuesta inicial sobre el estado del paciente y conectarse con una red de apoyo. La aplicación está desarrollada con un enfoque Full Stack utilizando React para el frontend y Node.js con Express y MongoDB para el backend.

---

**Funcionalidades**

- **Registro e Inicio de Sesión**: Los cuidadores pueden registrarse e iniciar sesión. Al iniciar sesión por primera vez, deben realizar una encuesta de diagnóstico.
- **Gestión de Actividades**: Los cuidadores pueden agregar, modificar y eliminar actividades para los pacientes. Solo se pueden eliminar las actividades marcadas como cumplidas.
- **Encuesta de Diagnóstico**: Los cuidadores completan una encuesta sobre el estado del paciente. Los resultados se almacenan y se muestran en la pantalla principal.
- **Red de Apoyo**: La aplicación permite a los cuidadores conectarse con otros cuidadores a través de una red de apoyo.

---

**Tecnologías**

**Frontend**:

- React.js con axios para las solicitudes HTTP.
- Bootstrap para el diseño e interfaz de usuario.
- JWT-decode para manejar los tokens de autenticación.
- FontAwesome para iconos visuales.

**Backend**:

- Node.js y Express.js para el servidor.
- MongoDB para la base de datos.
- Mongoose para modelar los datos.
- JSON Web Tokens (JWT) para la autenticación.

---

**Instalación y configuración**

1. **Clonar el repositorio**:
    - Ejecutar el comando: `git clone https://github.com/diegovascoguti/DV_Proyecti.git`
    - Navegar al proyecto: `cd cuidador-parkinson-app`
2. **Instalar dependencias del frontend**:
    - Navegar al directorio frontend: `cd frontend`
    - Ejecutar: `npm install`
3. **Instalar dependencias del backend**:
    - Navegar al directorio backend: `cd ../backend`
    - Ejecutar: `npm install`
4. **Configurar variables de entorno**:
    - Crear un archivo `.env` en la raíz del directorio backend con el siguiente contenido:
    
    ```bash
    bash
    Copiar código
    JWT_SECRET=your_jwt_secret
    MONGO_URI=mongodb://localhost:27017/cuidadorDB
    
    ```
    
5. **Iniciar la aplicación**:
    - Para el backend, ejecutar: `npm start`
    - Para el frontend, navegar al directorio frontend: `cd frontend` y ejecutar: `npm start`
    - La aplicación estará disponible en `http://localhost:3000`.

---

**Estructura del proyecto**

```markdown

- frontend/
  - src/
    - components/
      - ActivityManager.js
      - Main.js
    - App.js
    - index.js
- backend/
  - models/
    - User.js
    - Survey.js
    - Activity.js
  - routes/
    - auth.js
    - survey.js
    - activity.js
  - server.js
- README.md

```

---

**Funcionalidades detalladas**

**Gestión de Actividades**

El módulo de gestión de actividades permite a los cuidadores:

- Agregar nuevas actividades con una descripción y fecha.
- Marcar si la actividad ha sido completada utilizando un selector en la tabla.
- Las actividades marcadas como "Sí" pueden eliminarse, mientras que las actividades no completadas activan una alerta que impide su eliminación.

---

**Encuesta de Pacientes**

- Los cuidadores deben completar una encuesta con preguntas relacionadas con los síntomas del Parkinson al registrarse por primera vez.
- Los resultados de la encuesta se guardan en la base de datos y se muestran en una tarjeta en el menú principal.

---

**Créditos**

Desarrollado por Diego Vasco
