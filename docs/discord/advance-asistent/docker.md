---
description: Configuración Docker de la base de datos, api y bot
---

# Docker

Este archivo `Dockerfile` define la configuración necesaria para ejecutar una aplicación Node.js en un contenedor Docker. Aquí te explicamos cada paso en detalle, con ejemplos y enlaces útiles para que puedas entender mejor cómo funciona.

## Dockerfile

```dockerfile
dockerfileCopiar código# Usa la imagen oficial de Node.js, versión 21.7.3
FROM node:21.7.3

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /home/app

# Copia los archivos de configuración de npm (package.json y package-lock.json) al directorio de trabajo
COPY build/package*.json ./

# Instala las dependencias de producción
RUN npm install --production

# Copia el resto de la aplicación al directorio de trabajo
COPY build/ .

# Expone el puerto 3000 para acceder a la aplicación
EXPOSE 3000

# Define el comando que se ejecutará al iniciar el contenedor
CMD ["node", "src/bot.js"]
```

#### Explicación de cada línea:

1. **`FROM node:21.7.3`**\
   Esta línea indica que se está utilizando la imagen oficial de Node.js con la versión `21.7.3`. Es importante usar imágenes oficiales para garantizar la estabilidad y seguridad del entorno.
   * Más información: Docker Hub: Node.js
2. **`WORKDIR /home/app`**\
   Define el directorio de trabajo dentro del contenedor como `/home/app`. Todos los comandos posteriores se ejecutarán dentro de este directorio.
3. **`COPY build/package*.json ./`**\
   Copia los archivos `package.json` y `package-lock.json` (si existe) desde el directorio local `build/` hacia el directorio de trabajo en el contenedor. Estos archivos son necesarios para instalar las dependencias del proyecto.
4. **`RUN npm install --production`**\
   Ejecuta el comando `npm install` con la opción `--production`, lo que instala solo las dependencias necesarias para la producción. Esto es útil para evitar instalar dependencias de desarrollo en entornos de producción, lo que reduce el tamaño del contenedor.
   * Más información: [npm install](https://docs.npmjs.com/cli/v9/commands/npm-install)
5. **`COPY build/ .`**\
   Copia todo el contenido del directorio `build/` (excluyendo los archivos listados en el archivo `.dockerignore`, si existe) al directorio de trabajo en el contenedor. Este paso asegura que el código de la aplicación esté disponible dentro del contenedor.
6. **`EXPOSE 3000`**\
   Expone el puerto `3000` del contenedor. Esto indica que la aplicación escuchará en este puerto y que se debe mapear este puerto a uno accesible en el host cuando se ejecute el contenedor.
   * Más información: Docker: EXPOSE
7. **`CMD ["node", "src/bot.js"]`**\
   Define el comando predeterminado que se ejecutará cuando el contenedor se inicie. En este caso, el comando ejecuta el archivo `bot.js` ubicado en el directorio `src` utilizando Node.js.
   * Más información: Docker: CMD

***

### Ejemplo de Uso

Para construir y ejecutar el contenedor con este `Dockerfile`, sigue estos pasos:

#### 1. Construir la imagen

En la terminal, navega al directorio donde se encuentra el `Dockerfile` y ejecuta el siguiente comando:

```bash
bashCopiar códigodocker build -t mi-bot-node .
```

Esto creará una imagen Docker llamada `mi-bot-node` basada en el archivo `Dockerfile`.

#### 2. Ejecutar el contenedor

Una vez que la imagen esté construida, puedes ejecutar el contenedor utilizando el siguiente comando:

```bash
bashCopiar códigodocker run -d -p 3000:3000 mi-bot-node
```

Esto ejecutará el contenedor en segundo plano (`-d`) y mapeará el puerto 3000 del contenedor al puerto 3000 del host (`-p 3000:3000`).

#### 3. Verificar el estado del contenedor

Para asegurarte de que el contenedor esté en ejecución, utiliza el comando:

```bash
bashCopiar códigodocker ps
```

Este comando mostrará una lista de contenedores en ejecución, incluida tu aplicación.

## Docker Compose

### Estructura general

El archivo está escrito para usar la versión `3.9` de Docker Compose, lo que indica que se está utilizando una versión moderna del sistema. Docker Compose es una herramienta que permite definir y ejecutar aplicaciones en contenedores con múltiples servicios interconectados.

```yaml
yamlCopiar códigoversion: '3.9'
```

Esto especifica la versión de Docker Compose que estamos usando. Si bien la versión `3.9` es una de las más recientes, asegúrate de que tu versión de Docker lo soporte.

***

### Servicios

Dentro de la clave `services`, se definen los diferentes contenedores que componen tu aplicación. En este caso, tienes dos servicios: `pixelapp` (tu aplicación principal) y `mongodb` (la base de datos MongoDB).

#### **Servicio `pixelapp`**

```yaml
yamlCopiar códigoservices:
  pixelapp:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      NODE_ENV: development
      PORT: 3000
      MONGO_URI: mongodb://hiroshi:dev001@mongodb:27017/pixelapp?authSource=admin
    depends_on:
      - mongodb
```

*   **build**: Esta sección define cómo construir el contenedor para tu aplicación. La clave `context` se refiere al directorio actual (`.`), mientras que `dockerfile` especifica el archivo Dockerfile que se utilizará para construir la imagen de la aplicación. Aquí, Docker buscará el Dockerfile en el mismo directorio que el `docker-compose.yml`.

    **Ejemplo**: Si tienes un Dockerfile personalizado que instala dependencias de Node.js, compila el código y lo prepara para ejecutarse en un entorno de desarrollo.
*   **ports**: Expone el puerto `3000` de la aplicación en el contenedor al puerto `3000` en tu máquina local. Esto significa que puedes acceder a la aplicación en `http://localhost:3000`.

    **Ejemplo**: Si cambias el puerto local a `4000:3000`, entonces accederías a la aplicación en `http://localhost:4000`, mientras que dentro del contenedor sigue ejecutándose en el puerto `3000`.
*   **volumes**: Monta dos volúmenes:

    1. El primero (`.:/app`) monta el directorio actual (`.`) en el contenedor en la ruta `/app`. Esto te permite hacer cambios en tu código localmente y que se reflejen de inmediato en el contenedor.
    2. El segundo (`/app/node_modules`) se usa para evitar que los módulos de Node.js sean sobreescritos en el contenedor, ya que `node_modules` a menudo es pesado y específico del sistema.

    **Ejemplo**: Puedes agregar más volúmenes para compartir archivos de configuración o assets con tu contenedor.
*   **environment**: Aquí defines las variables de entorno necesarias para tu aplicación:

    * `NODE_ENV`: Establece el entorno como `development`.
    * `PORT`: El puerto donde la aplicación se ejecutará dentro del contenedor (3000).
    * `MONGO_URI`: La URI de conexión a la base de datos MongoDB, incluyendo las credenciales y el nombre de la base de datos `pixelapp`.

    **Ejemplo**: En un entorno de producción, podrías cambiar `NODE_ENV` a `production` y utilizar una URI de MongoDB alojada en la nube.
* **depends\_on**: Esto garantiza que el servicio `mongodb` esté iniciado antes de intentar ejecutar `pixelapp`. Esto es útil para que la aplicación no falle si MongoDB aún no está listo.

***

#### **Servicio `mongodb`**

```yaml
yamlCopiar código  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: hiroshi
      MONGO_INITDB_ROOT_PASSWORD: dev001
```

*   **image**: Define la imagen de MongoDB a utilizar, en este caso, la versión `6.0` de la imagen oficial de MongoDB.

    **Ejemplo**: Podrías especificar una versión diferente de MongoDB o crear tu propia imagen personalizada si necesitas configuraciones especiales.
*   **ports**: Expone el puerto `27017` de MongoDB, lo cual es necesario para acceder a la base de datos desde fuera del contenedor (por ejemplo, desde tu máquina o la aplicación `pixelapp`).

    **Ejemplo**: Si quieres evitar que MongoDB sea accesible desde fuera de Docker, puedes eliminar o cambiar esta línea.
*   **volumes**: Monta el volumen `mongodb_data` en `/data/db` dentro del contenedor, lo cual es necesario para la persistencia de datos. Esto significa que incluso si el contenedor se reinicia o destruye, los datos de MongoDB no se perderán.

    **Ejemplo**: Puedes agregar volúmenes adicionales para respaldar otros directorios importantes, como los logs de MongoDB.
*   **environment**: Configura las credenciales de MongoDB utilizando variables de entorno:

    * `MONGO_INITDB_ROOT_USERNAME`: El nombre de usuario para el administrador de MongoDB.
    * `MONGO_INITDB_ROOT_PASSWORD`: La contraseña para ese usuario administrador.

    **Ejemplo**: En un entorno de producción, podrías cambiar estas credenciales por algo más seguro o almacenarlas en un archivo `.env` que Docker Compose pueda cargar.

***

### Volúmenes

```yaml
yamlCopiar códigovolumes:
  mongodb_data:
```

Aquí se define el volumen `mongodb_data`, que es donde se almacenarán los datos persistentes de MongoDB. Docker automáticamente lo gestionará y lo asignará a la ruta especificada en el contenedor (`/data/db`).

**Ejemplo**: Si deseas almacenar los datos en una ubicación específica de tu máquina, puedes hacer esto:

```yaml
yamlCopiar códigovolumes:
  mongodb_data:
    driver: local
    driver_opts:
      type: none
      device: /path/to/your/data
      o: bind
```

Esto haría que los datos se almacenen en una carpeta local (`/path/to/your/data`) en lugar de un volumen gestionado por Docker.

***

### Ejecución del Compose

Para iniciar estos servicios, solo necesitas correr el siguiente comando en la terminal desde el directorio donde está tu archivo `docker-compose.yml`:

```bash
bashCopiar códigodocker-compose up
```

Esto levantará ambos servicios (tu aplicación y MongoDB). Si solo quieres que los servicios se ejecuten en segundo plano, puedes usar:

```bash
bashCopiar códigodocker-compose up -d
```

***

### Ejemplos adicionales

* **Agregando un servicio de Redis**: Si más adelante necesitas usar Redis para cachear datos, podrías agregarlo fácilmente así:

```yaml
yamlCopiar código  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

* **Uso de múltiples entornos**: Puedes definir diferentes archivos de Compose para desarrollo y producción, por ejemplo, `docker-compose.prod.yml`, con configuraciones específicas para producción.
