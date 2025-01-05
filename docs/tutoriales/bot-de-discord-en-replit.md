---
description: >-
  Este tutorial te guiará paso a paso para desplegar y mantener un bot de
  Discord en ejecución usando Replit, una plataforma en la nube que permite
  alojar y ejecutar proyectos de forma gratuita.
---

# Bot de Discord en Replit

## Cómo Encender un Bot de Discord en Replit

Este tutorial te guiará paso a paso para desplegar y mantener un bot de Discord en ejecución usando **Replit**, una plataforma en la nube que permite alojar y ejecutar proyectos de forma gratuita.

***

## **Requisitos Previos**

Antes de comenzar, asegúrate de tener:

* Una cuenta de Discord con permisos para crear aplicaciones y bots.
* Una cuenta en [Replit](https://replit.com/).
* Tu bot de Discord en un repositorio de GitHub o archivos locales.

***

### **Paso 1: Crear un Nuevo Proyecto en Replit**

1. **Inicia sesión en Replit**
   * Accede a [Replit](https://replit.com/) y haz clic en **Log in**.
2. **Crea un Nuevo Repl**
   * Haz clic en el botón **+ Create**.
   * Selecciona la plantilla **Node.js**.
   * Asigna un nombre a tu proyecto y haz clic en **Create Repl**.

***

### **Paso 2: Configurar tu Bot en Replit**

#### 2.1. **Subir los Archivos del Bot**

Si tu bot está en GitHub:

1. Haz clic en **Version Control** en el menú lateral.
2. Ingresa la URL de tu repositorio de GitHub y haz clic en **Import**.

Si tienes los archivos locales:

1. Haz clic en **Files**.
2. Sube tus archivos arrastrándolos o haciendo clic en **Upload Files**.

#### 2.2. **Configurar las Variables de Entorno**

1. Haz clic en **Secrets (Environment Variables)** en el menú lateral.
2. Agrega una nueva variable con el nombre `DISCORD_TOKEN` y como valor tu token de bot.

***

### **Paso 3: Ejecutar el Bot**

1. En el archivo `index.js` (o el archivo principal de tu bot), asegúrate de que el código esté listo para ejecutarse.
2. Haz clic en el botón **Run** en la parte superior de Replit.
3. Verifica la consola para asegurarte de que el bot se está ejecutando correctamente.

***

### **Paso 4: Mantener el Bot Siempre en Línea**

#### Opción 1: **Usar el Keep Alive Script**

Crea un archivo llamado `server.js` y agrega el siguiente código para mantener el bot activo:

```javascript
const express = require('express');
const server = express();

server.all('/', (req, res) => {
  res.send('El bot está activo');
});

server.listen(3000, () => {
  console.log('Servidor keep-alive activo');
});
```

Luego, modifica el archivo `index.js` para requerir el `server.js`:

```javascript
require('./server');
```

#### Opción 2: **Usar UptimeRobot**

1. Ve a [UptimeRobot](https://uptimerobot.com/) y crea una cuenta.
2. Crea un nuevo monitor con los siguientes detalles:
   * Tipo: **HTTP(s)**.
   * URL: El enlace de tu Repl (lo encontrarás en la parte superior del proyecto, algo como `https://tu-proyecto.tu-usuario.repl.co`).
3. Configura el tiempo de monitoreo cada 5 minutos.

***

## **Conclusión**

¡Felicidades! Ahora tienes tu bot de Discord ejecutándose en Replit y configurado para estar siempre en línea. Replit es una opción ideal para proyectos pequeños y prototipos. Recuerda mantener tu token seguro y actualizar tu bot regularmente.
