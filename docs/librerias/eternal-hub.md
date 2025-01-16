---
description: Documentación de la instalación y descarga de el proyecto
---

# Eternal Hub

## Instalacion

Para poder instalar el proyecto por completo se deben de realizar algunos ajustes en el archivo package.json esto debido a un control de versiones de nodejs, en el que si tiene el símbolo ^ se instala la versión mas reciente del proyecto y no la que se especifica en el json.

{% file src="../.gitbook/assets/package.json" %}

## Arranque

Para el arranque del proyecto es tan simple como ejecutar el comando

```
node src/index.js
```

En caso de no querer ver las advertencias de nodejs el comando se modifica al siguiente

```
node --no-warnings src/index.js
```

## Configuracion



Este archivo `config.yml` contiene configuraciones esenciales para conectar diversos servicios y gestionar el comportamiento de tu cliente API. A continuación, se proporciona una explicación detallada de cada sección, junto con ejemplos y enlaces de apoyo.

***

### **Configuración de la Base de Datos**

```yaml
database: '' # URI de conexión a MongoDB
```

**Descripción:** El campo `database` debe contener la URI de conexión para tu base de datos MongoDB.

**Ejemplo:**

```yaml
database: 'mongodb+srv://usuario:contraseña@cluster0.mongodb.net/miBaseDeDatos'
```

**Enlace de apoyo:** [Guía oficial de MongoDB](https://www.mongodb.com/docs/guides/)

***

### **Modelo de Clave y Versión**

```yaml
keyModel: ''
version: '0.0.6'
```

**Descripción:**

* `keyModel`: El nombre del modelo de clave utilizado para la autenticación de la API.
* `version`: La versión actual de tu API.

**Ejemplo:**

```yaml
keyModel: 'AuthKey'
version: '1.0.0'
```

***

### **URL del Webhook**

```yaml
webhookURL: ''
```

**Descripción:** La URL a la que tu API enviará notificaciones mediante webhooks.

**Ejemplo:**

```yaml
webhookURL: 'https://example.com/webhook'
```

***

### **Configuración de PayPal**

```yaml
paypal:
  secret: ''
  id: ''
  URLs:
    desarrollo: 'https://api-m.paypal.com'
    produccion: ''
    redirect: ''
```

**Explicación de los campos:**

* `secret`: Clave secreta de la API de PayPal.
* `id`: ID del cliente de PayPal.
* `URLs`: Contiene las URLs específicas del entorno para acceder a la API de PayPal.
  * `desarrollo`: URL para el entorno de desarrollo.
  * `produccion`: URL para el entorno de producción.
  * `redirect`: URL a la que los usuarios serán redirigidos después de un pago.

**Ejemplo:**

```yaml
paypal:
  secret: 'TU_PAYPAL_SECRET'
  id: 'TU_PAYPAL_ID'
  URLs:
    desarrollo: 'https://api-m.sandbox.paypal.com'
    produccion: 'https://api-m.paypal.com'
    redirect: 'https://example.com/paypal/redirect'
```

**Enlace de apoyo:** [Documentación de la API de PayPal](https://developer.paypal.com/docs/api/overview/)

***

### **Configuración del Backend**

```yaml
backend:
  ownerSecret: '1325606820152086650-secret'
  ip: 'localhost'
  port: 3000
  version: '0.0.6'
  URL: ''
  secrets:
    public: '1325606820152086650-public'
    private: '1325606820152086650-private'
```

**Explicación de los campos:**

* `ownerSecret`: Identificador único del propietario del backend.
* `ip`: Dirección IP del servidor backend.
* `port`: Puerto utilizado por la API del backend.
* `version`: Versión de la API.
* `URL`: URL del servidor backend.
* `secrets`: Contiene las claves API públicas y privadas.

**Ejemplo:**

```yaml
backend:
  ownerSecret: 'mi-secreto-backend'
  ip: '192.168.1.100'
  port: 4000
  version: '1.0.0'
  URL: 'https://api.example.com'
  secrets:
    public: 'mi-clave-publica'
    private: 'mi-clave-privada'
```

***

### **Configuración de MultiBotHub**

#### **Configuración del Bot de Discord**

```yaml
botnet:
  discord:
    token: 'MTMyODM1NjgwODIwODY4MzAwOA.GTCpEL.NfI7pUKWOiPHtwPYOqiBqgh0bZhTPNSkbIu4cQ'
    clientId: '1328356808208683008'
    guildId: '1322533141130252338'
    ownerId: '1325606820152086650'
    channelNotifications: '1328358819964911616'
    roles:
      developer: ''
      customers: ''
    webhooks:
      errorsWebhook: ''
      updatesWebhook: ''
    dashboard:
      clientSecret: '3gfnuQSZuxProJ5QTf5F1331tw1PBzeG'
      callbackURL: ''
    setups:
      reviewsChannelID: ''
      logs:
        status: false
        channelID: ''
      panel:
        enabled: false
        messageID: ''
        channelID: ''
      status:
        messageID: ''
        channelID: ''
      moderator:
        channelID: ''
```

**Explicación de los campos:**

* `token`: Token del bot de Discord.
* `clientId`: ID del cliente del bot de Discord.
* `guildId`: ID del servidor de Discord.
* `ownerId`: ID del propietario del bot en Discord.
* `channelNotifications`: ID del canal de Discord para enviar notificaciones.
* `roles`: IDs de los roles de Discord para diferentes tipos de usuarios.
* `webhooks`: URLs de los webhooks para errores y actualizaciones.
* `dashboard`: Configuración para el panel de OAuth2.
* `setups`: Contiene configuraciones para registros, paneles y moderadores.

**Ejemplo:**

```yaml
botnet:
  discord:
    token: 'TU_DISCORD_BOT_TOKEN'
    clientId: 'TU_CLIENT_ID'
    guildId: 'TU_GUILD_ID'
    ownerId: 'TU_OWNER_ID'
    channelNotifications: 'TU_CHANNEL_ID'
    roles:
      developer: 'TU_ROLE_ID'
      customers: 'TU_ROLE_ID_CLIENTE'
    webhooks:
      errorsWebhook: 'https://discord.com/api/webhooks/errores'
      updatesWebhook: 'https://discord.com/api/webhooks/actualizaciones'
```

***

#### **Configuración del Bot de WhatsApp**

```yaml
botnet:
  whatsapp:
    status: false
    UrlAlerts: ''
    prefix: '!'
    keyHash: ''
```

**Explicación de los campos:**

* `status`: Booleano para activar/desactivar el bot de WhatsApp.
* `UrlAlerts`: URL del webhook de Discord para enviar alertas.
* `prefix`: Prefijo de los comandos del bot.
* `keyHash`: Hash de clave único para el bot.

**Ejemplo:**

```yaml
botnet:
  whatsapp:
    status: true
    UrlAlerts: 'https://discord.com/api/webhooks/whatsapp-alertas'
    prefix: '!'
    keyHash: 'mi-hash-de-clave'
```

***

### **Información del Creador**

```yaml
creator:
  image: ''
  email: ''
  portafolio: 'https://bento.me/mikaboshi'
  documentacion: 'https://docs.night-support.xyz/'
  licencias: 'http://licence.night-support.xyz'
  web: 'http://api.night-support.xyz'
  github: 'https://github.com/MikaboshiDev'
```

**Explicación de los campos:**

* `image`: URL de la imagen de perfil del creador.
* `email`: Dirección de correo electrónico del creador.
* `portafolio`: URL del portafolio del creador.
* `documentacion`: URL de la documentación del proyecto.
* `licencias`: URL de las licencias del proyecto.
* `web`: URL del sitio web del proyecto.
* `github`: URL del perfil de GitHub del creador.

**Ejemplo:**

```yaml
creator:
  image: 'https://example.com/imagen.png'
  email: 'creador@example.com'
  portafolio: 'https://bento.me/creador'
  documentacion: 'https://docs.creador.com'
  licencias: 'http://licencia.creador.com'
  web: 'http://api.creador.com'
  github: 'https://github.com/creador'
```
