---
description: >-
  La configuración básica del Bot es el paso mas sencillo del Bot, te explicare
  como empezar.
---

# Configuración

La configuración para poder prender el Bot de discord se realiza por medio de un archivo[ YML](https://docs.ansible.com/ansible/latest/reference\_appendices/YAMLSyntax.html) no es necesario llenar todo el archivo solo lo que necesites, a continuación explicaremos como configurar el arranque.

```yaml
general:
  token: "" #token del bot en discord developers
  db: ""
  guild_id: ""
  webhook_faild: "" #link de un webhook de tu servidor para mandar los errores
  apikey: ""
  licence: "" #licencia para arranque

dashboard:
  client_id: ""
  client_secret: "" #el id secret que se da en discord developers
  callback: "" #URL de regreso en la dashboard
```

Estos son los datos básicos para poder prender el Bot de manera correcta los demás datos que se piden en el archivo de configuración son necesarios para los demás sistemas pero no son indispensables así que con solo estos datos puedes disfrutar del Bot.

Para poder tener soporte de este complemento necesitas 2 cosas: La licencia que se te da cuando la solicitas en el servidor de soporte y que tus datos estén guardados en el <mark style="background-color:orange;">API LOGIN</mark>.



{% swagger method="post" path="localhost:3000/api/auth/register" baseUrl="http://" summary="Petición para registrar un perfil dentro de la API CLIENT" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="name" type="String" required="true" %}
Nombre con el que quieres ser contactado
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" type="String" required="true" %}
Contraseña para tu login
{% endswagger-parameter %}

{% swagger-parameter in="body" name="email" type="String" required="true" %}
Email para contacto entre soporte y cliente
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Tu perfil dentro de API CLIENT." %}
Tu perfil dentro de API CLIENT fue creado de forma exitosa y guardado dentro de la base de datos
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="El servidor no a respondido" %}
En caso de un error de servidor contactar al desarrollador responsable para que se le de solucion lo antes posible
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="" baseUrl="http://localhost:3000/api/auth/login" summary="Petición para loguearte dentro de la API" fullWidth="false" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="email" type="String" required="true" %}
Email con el que te registraste dentro de la api
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" type="String" required="true" %}
Contraseña de tu perfil
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="JWT token regresado" %}

{% endswagger-response %}
{% endswagger %}

Si aun no tienes esos datos, no se te dará soporte del proyecto con sus futuras actualizaciones, por eso recuerda pedirlos con tiempo.
