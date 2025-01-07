---
description: >-
  Este tutorial te guiará paso a paso para desplegar y encender un bot de
  Discord en un servidor o máquina Linux. Aprenderás cómo configurar el entorno
  necesario, clonar tu bot desde GitHub y mantenerlo
---

# Bot de Discord en Linux

***

## Cómo Encender un Bot de Discord en Linux

Este tutorial te guiará paso a paso para desplegar y encender un bot de Discord en un servidor o máquina Linux. Aprenderás cómo configurar el entorno necesario, clonar tu bot desde GitHub y mantenerlo en ejecución.



## **Requisitos Previos**

Antes de comenzar, asegúrate de tener los siguientes requisitos:

* Una cuenta de Discord con permisos para crear aplicaciones y bots.
* Un servidor o máquina Linux (puede ser un VPS o tu máquina local).
* Node.js y npm instalados.
* Git instalado.

### **Paso 1: Preparar el Entorno en Linux**

#### 1.1. **Actualizar los Paquetes**

Abre la terminal de tu servidor o máquina Linux y ejecuta los siguientes comandos:

```bash
sudo apt update
sudo apt upgrade -y
```

Esto asegurará que todos los paquetes estén actualizados.

#### 1.2. **Instalar Node.js y npm**

Para instalar Node.js y npm, ejecuta:

```bash
sudo apt install nodejs npm -y
```

Verifica la instalación:

```bash
node -v
npm -v
```

#### 1.3. **Instalar Git**

Si aún no tienes Git instalado, ejecuta:

```bash
sudo apt install git -y
```

Verifica la instalación:

```bash
git --version
```

***

### **Paso 2: Clonar tu Bot desde GitHub**

Si tu bot de Discord está alojado en GitHub, clónalo a tu máquina Linux.

1.  Dirígete al directorio donde deseas clonar el bot:

    ```bash
    cd ~
    ```
2.  Clona el repositorio:

    ```bash
    git clone https://github.com/usuario/nombre-repositorio.git
    ```
3. Accede al directorio del bot

```bash
cd nombre-repositorio
```

***

### **Paso 3: Configurar el Bot**

#### 3.1. **Instalar las Dependencias**

Dentro del directorio del bot, instala las dependencias necesarias ejecutando:

```bash
npm install
```

#### 3.2. **Configurar Variables de Entorno**

Crea un archivo `.env` para almacenar tu token de Discord y otras variables necesarias.

```bash
nano .env
```

Agrega las variables necesarias, por ejemplo:

```env
DISCORD_TOKEN=tu_token_de_discord
```

Guarda y cierra el archivo (Ctrl + O, Enter y Ctrl + X).

***

### **Paso 4: Ejecutar el Bot**

Para ejecutar el bot, utiliza el siguiente comando:

```bash
node index.js
```

⚠️ **Nota:** Asegúrate de que el archivo principal de tu bot sea `index.js`. Si tiene otro nombre, cámbialo en el comando.

***

### **Paso 5: Mantener el Bot en Ejecución**

Para mantener el bot ejecutándose incluso después de cerrar la terminal, utiliza `pm2` o `screen`.

#### Opción 1: **Usar PM2**

1.  Instala PM2:

    ```bash
    npm install -g pm2
    ```
2.  Inicia el bot con PM2:

    ```bash
    pm2 start index.js --name "discord-bot"
    ```
3.  Guarda la configuración para que el bot se reinicie automáticamente al reiniciar el servidor:

    ```bash
    pm2 save
    pm2 startup
    ```

#### Opción 2: **Usar Screen**

1.  Inicia una nueva sesión de Screen:

    ```bash
    screen -S discord-bot
    ```
2.  Ejecuta el bot dentro de la sesión:

    ```bash
    node index.js
    ```
3.  Para desconectarte de la sesión sin detener el bot, presiona:

    ```
    Ctrl + A, luego D
    ```

Para volver a la sesión:

```bash
screen -r discord-bot
```

***

## **Conclusión**

¡Felicidades! Ahora tienes tu bot de Discord ejecutándose en un servidor Linux. Con `pm2` o `screen`, puedes asegurarte de que el bot esté siempre en línea. Recuerda mantener tu token seguro y actualizar las dependencias de tu bot regularmente.
