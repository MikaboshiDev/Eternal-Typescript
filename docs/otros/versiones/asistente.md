---
description: >-
  Proyecto con integraciones como discord Bot, Web, Whatsapp Bot, api privada y
  publica
---

# Asistente

## 0.0.9

`25 Diciembre de 2024`

* `Fix:` configuración de Prettier, agregar nuevo emoji para renombrar y eliminar archivo obsoleto de PM2; ajustar rutas de renderizado y agregar nuevas funcionalidades en el controlador de API
* `Add:`  integración de WhatsApp con respuestas automáticas y registro de historial de mensajes
* `Add:`  nuevos archivos JavaScript y SCSS para funcionalidades de interfaz; incluir iconos SVG
* `Add:`  nuevos archivos y configuraciones para el asistente; eliminar archivos obsoletos
* `Add:`  soporte para internacionalización con i18next; crear archivos de traducción en inglés y español; extender la interfaz de solicitud para incluir el idioma
* `Add:` validación de autenticación y nuevas rutas; eliminar documentación obsoleta
* `Delete:`  el adaptador de Playwright y simplificar la configuración de Puppeteer en WhatsApp

## 0.0.10

`28 Diciembre de 2024`

* `Fix`: configuración del bot, agregar nuevos emojis y mejorar la gestión de tareas y tickets
* `Add`: soporte para criptomonedas; incluir modelo BotCrypto, nuevas rutas y controlador para registro y visualización de bots&#x20;
* `Add`: soporte para múltiples idiomas en el comando ping; implementar traducciones y ajustar la lógica de interacción&#x20;
* `Fix`: documentación de la API; actualizar descripciones y ejemplos en las rutas de salud y fuente

## 0.0.11

`28 Diciembre de 2024`

* `Add`: soporte para gestión de invitaciones; implementar registro de eventos de miembros en el canal de logs&#x20;
* `Add`: soporte para SQLite; incluir configuración y rutas para manejar órdenes y fuentes&#x20;
* `Add`: webhook de consola y actualizar rutas de API; mejorar configuración del bot&#x20;

## 0.0.12

`30 Diciembre de 2024`

* `Fix`: rutas de API para usar plural; agregar manejo de errores personalizados&#x20;
* `Add`: archivos de configuración para prettier y eslint; optimizar el formato de código en varios archivos
* `Add`: archivos de tipos y mapas para ModMail; eliminar archivos obsoletos de configuración
* `Add`: funcionalidad para crear y gestionar productos; actualizar rutas y vistas relacionadas&#x20;
* `Add`: nuevos tipos y archivos de configuración; eliminar archivos obsoletos y mejorar la estructura del proyecto
* `Fix`: la legibilidad del código y ajustar configuraciones de prettier; agregar nuevas rutas a .prettierignore

## 0.0.13

`01 Enero de 2025`

* `Add`: comandos NSFW y mejorar la gestión de eventos de depuración
* `Add`: funcionalidad de monitoreo y estadísticas del bot; incluir nueva política de seguridad&#x20;
* `Add`: modelos de registro de advertencias y logs de servidor; actualizar comandos de administración&#x20;
* `Delete`: dependencia de quick.db; agregar funcionalidad de paginación en embeds&#x20;
* `Fix`: manejo de errores en el modal y actualizar rutas; agregar nuevas variables de entorno&#x20;
* `Resume`: el middleware de autenticación eliminando la verificación de encabezados&#x20;

## 0.0.14

`01 Enero de 2025`

{% hint style="warning" %}
Informacion de cambios en la version `0.0.15`
{% endhint %}

## 0.0.15

`01 Enero de 2025`

* `Fix`: .gitignore para incluir nuevas exclusiones y eliminar archivo obsoleto&#x20;
* `Fix`: configuraciones de eslint y tsconfig; agregar soporte para Jest y mejorar manejo de errores&#x20;
* `Fix`: rutas de API de PayPal y mejorar la estructura de rutas; ajustar nombre de ruta y eliminar código innecesario&#x20;
* `Add`: nuevos módulos y tipos para nhentai; actualizar configuraciones y dependencias
* `Delete`: archivos de documentación obsoletos y actualizar configuraciones de eslint
* `Fix`: import paths for BotClient to improve module structure
* `Rebuild`: estructura de módulos y actualizar tipos; eliminar archivos obsoletos

## 0.0.16

`06 Enero de 2025`

* `Fix`: enlaces en la documentación para reflejar la nueva estructura de archivos
* `Add`: documentación para nuevas clases y funciones en varios módulos&#x20;
* `Add`: documentación para nuevos módulos y funciones; eliminar archivos obsoletos y actualizar configuraciones de exclusión en tsconfig&#x20;
* `Add`: pruebas unitarias para nuevos módulos y funciones; mejorar la cobertura de código
* `Rebuild`: configuración de entorno centralizada y eliminar dependencias innecesarias&#x20;

{% hint style="success" %}
Publicación de la version de desarrollo del asistente dentro de la plataforma de Built
{% endhint %}

## 0.0.20

`03 Febrero de 2025`

* `Fix`: manejo de rutas y configuración; eliminar registros obsoletos y mejorar la gestión de archivos en WhatsApp; agregar nuevas configuraciones en el archivo de configuración
* `Add`: configuración de ecosistema y mejorar la gestión de nombres en el bot; actualizar dependencias y optimizar mensajes de log
* `Add`: configuración de GitBook y nuevas interfaces; actualizar esquema de tareas y emojis; mejorar manejo de interacciones en menús
* `Add`: configuración de GitBook; eliminar archivo de configuración obsoleto y mejorar manejo de errores en la API; actualizar referencias en el código
* `Delete`: archivos obsoletos de tipos y configuraciones de bibliotecas; limpiar el código y optimizar la estructura del proyecto&#x20;
* `Delete`: archivos obsoletos, agregar nuevas rutas y mejorar la gestión de configuraciones; optimizar el manejo de errores y permisos&#x20;
* `Rebuild`: la gestión de rutas y configuraciones; agregar webhooks para errores y consola; eliminar configuraciones obsoletas; optimizar carga de comandos y eventos&#x20;

### 0.0.21-alpha

`03 Febrero de 2025`

* `Add`: configuraciones de husky, eslint y prettier; añadir mixins y funciones SCSS; eliminar archivos obsoletos&#x20;
* `Add`: configuraciones de husky, eslint y prettier; añadir mixins y funciones SCSS; implementar manejo de errores en Express
* `Add`: documentación para los comandos de economía y otros módulos&#x20;
* `Add`: módulo de verificación con captcha y actualizar configuración del bot&#x20;
* `Add`: nombre al bot y actualizar configuraciones; eliminar documentación obsoleta
* `Add`: ofuscación de código y actualizar comandos de ranking con imágenes adjuntas&#x20;
* `Add`: sistema de ranking y economía; actualizar dependencias y eliminar código obsoleto&#x20;
* `Delete`: subproyectos obsoletos y actualizar configuración de tickets con tiempo de creación
* `Add`: documentación a las funciones utilitarias y modelo Doujinshi
* `Add`: documentación inicial para varios módulos y clases&#x20;
* `Delete`: archivos README obsoletos de la documentación
* `Add`: sistema de economía con comandos de saldo y pago; agregar eventos y utilidades&#x20;

<figure><img src="../../.gitbook/assets/Captura de pantalla 2025-02-03 123721.png" alt=""><figcaption><p>Swagger Administrator</p></figcaption></figure>

<figure><img src="../../.gitbook/assets/Captura de pantalla 2025-02-03 124758.png" alt=""><figcaption><p>IA Gemini Api Generate</p></figcaption></figure>
