---
description: Rendimiento y especificaciones para el producto
---

# Introducción

Aun que no lo e probado al 100% las especificaciones de consumo que puedo dar son las siguientes

| Host Used | Consumo |
| --------- | ------- |
| 1GB Ram   | 230 MB  |
| 7GB Disco | 1.38GB  |
| CPU 300%  | 0.48%   |

{% hint style="info" %}
Este consumo es a dos bots con encendido por medio de PM2, aun que el limite de la api de discord no se alcanza a diario se tiene un registro de estos eventos dentro del handler
{% endhint %}

## Licencia

| Recursos       | Recomendado   |
| -------------- | ------------- |
| 3 IP Máximo    | 2 IP Máximos  |
| 3 Hwid Máximos | 1 Hwid Máximo |
| 1 Producto     | 1 Producto    |

## Configuracion



{% stepper %}
{% step %}
### Que rutas debo de crear dentro del proyecto

Por lastima y ya que estamos en versiones aun dentro de la beta debes de crear algunas rutas por tu cuenta en caso de tener ciertos complementos aqui te diré cuales son

Whatsapp Bot:&#x20;

* `config/whatsapp/chats`
* `config/whatsapp/media` : agregar `from` y `to` dentro de la ruta creada

Session Save

* `src/database/temp`: esto es en caso de error relacionado con la dashboard

Esperamos poder evitar esto en futuras versiones pero de momento necesitas hacer estos pasos la primera vez que enciendas la aplicación
{% endstep %}

{% step %}
### Que archivos debo de configurar en el proyecto

son dos archivos los que se deben de configurar de momento dentro de las versiones beta `0.0.<number>` y esos son los siguientes:

* `.env`: archivo de configuracion principal
* `config.yml`: configuracion secundaria desde webhooks y permisos
* `src/utils/variables` (solo si quieres cambiar rutas dentro del proyecto de estos cambios el staff no se hace responsable de errores) <mark style="color:red;">`deprecated`</mark>
{% endstep %}

{% step %}
### Lo pueden ustedes configurar dentro de mi host ?

Si lo podemos hacer nosotros si abres un ticket dentro del servidor de discord sin embargo ya que es un servicio gratuito esto o puede ser rapido o ser lento dende del desarrollador
{% endstep %}
{% endstepper %}
