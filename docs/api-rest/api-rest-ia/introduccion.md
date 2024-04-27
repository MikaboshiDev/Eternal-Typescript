---
description: Registro y Login dentro del cliente
---

# Introducción

Bueno como ya  te abras dado cuenta debes de registrarte la primera vez que usas o ingresas a esta API esto debido a protocolos de seguridad del cliente.

> El registro y logueo dentro del cliente es obligatorio cada que accedas a alguna de las funciones mencionadas en esta documentación

En este contexto, es importante destacar que el entorno web y el entorno de la API constituyen zonas distintas, cada una con sus propias peculiaridades de funcionamiento. Es crucial comprender que los roles de desarrollo asignados en el entorno web pueden diferir de aquellos asignados en el cliente, lo que implica que el acceso a recursos específicos puede variar en función de los roles asignados.

Al momento de autenticarse dentro de la API, el sistema proporcionará dos elementos esenciales:

1. **Contraseña encriptada**: La contraseña del usuario se encriptará utilizando técnicas de seguridad adecuadas para mitigar riesgos de robo o suplantación de identidad.
2. **Token único**: Se generará un token único para el usuario autenticado. Este token servirá como una credencial de acceso autorizada que habilitará al usuario para interactuar con otros sitios y servicios dentro de la API, garantizando un nivel adicional de seguridad y control de acceso.

URL: `http://api.night-support.xyz/v1`

### Primer Registro de Perfil

<mark style="color:green;">`POST`</mark> `/auth/register`

#### Request Body

| Name                                       | Type   | Description                           |
| ------------------------------------------ | ------ | ------------------------------------- |
| email<mark style="color:red;">\*</mark>    | String | Email con el que te quieres registrar |
| password<mark style="color:red;">\*</mark> | String | Contraseña para tu perfil             |
| name<mark style="color:red;">\*</mark>     | String | Nombre de identificacion              |

{% tabs %}
{% tab title="200: OK Perfil guardado correctamente" %}

{% endtab %}

{% tab title="500: Internal Server Error Error de parte del servidor" %}

{% endtab %}
{% endtabs %}

El registro de usuarios es persistente, lo que significa que no es necesario realizarlo repetidamente. Sin embargo, para mantener la sesión activa y garantizar la seguridad, se requiere un proceso de inicio de sesión periódico. En este caso, el token de autenticación generado tiene una duración temporal, expirando cada hora.

Es importante destacar que este token temporal debe ser incluido en los encabezados de las solicitudes HTTP, específicamente en el campo "Bearer Token". De este modo, se asegura la autorización adecuada para acceder a los recursos protegidos dentro de la API.

```json
{
  "password": "$2a$08$BDjR4rpsYwTJzPKvI6l8v.1t10MY/8MfCC3TFa8TVpnT274ONMw7W",
  "email": "",
  "name": "",
  "id": "6afcb364-c44b-47d2-8cd5-ec339684fd06",
  "rank": "user",
  "_id": "65dd76d5af9e7ad305a2f41b",
  "createdAt": "2024-02-27T05:44:54.011Z",
  "updatedAt": "2024-02-27T05:44:54.011Z"
api
```

### Logueo Temporal (1hr)

<mark style="color:green;">`POST`</mark> `/auth/login`

#### Request Body

| Name                                       | Type   | Description                                    |
| ------------------------------------------ | ------ | ---------------------------------------------- |
| email<mark style="color:red;">\*</mark>    | String | Correo con el que te registraste anteriormente |
| password<mark style="color:red;">\*</mark> | String | Contraseña del perfil                          |

{% tabs %}
{% tab title="200: OK Usuario logueado token jwt generado" %}

{% endtab %}

{% tab title="500: Internal Server Error Error de parte del servidor" %}

{% endtab %}
{% endtabs %}

El token de registro, siendo temporal, es generado mediante un proceso específico dentro del sistema. Este token es requerido para la mayoría de los puntos finales (Endpoints) de la API, excluyendo aquellos destinados a operaciones de uso general. Su función es garantizar la autenticación y autorización adecuadas al interactuar con los recursos protegidos dentro del sistema.

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imx1aXNhbnRvbmlvMjAwMzg2QGdtYWlsLmNvbSIsImlhdCI6MTcwOTAxMjc0OCwiZXhwIjoxNzA5MDk5MTQ4fQ.IddjX7oSYxVWbr-b5W8rdqJp7AFsgCD1OBedmI0qZJg",
  "user": {
    "_id": "65dd76d5af9e7ad305a2f41b",
    "password": "$2a$08$BDjR4rpsYwTJzPKvI6l8v.1t10MY/8MfCC3TFa8TVpnT274ONMw7W",
    "email": "",
    "name": "",
    "id": "6afcb364-c44b-47d2-8cd5-ec339684fd06",
    "rank": "user",
    "createdAt": "2024-02-27T05:44:54.011Z",
    "updatedAt": "2024-02-27T05:44:54.011Z"
  }
}
```

### Lista de Url's

<mark style="color:green;">`POST`</mark> `/endpoints`

Lista de Url's de la api

**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

**Response**

{% tabs %}
{% tab title="200" %}
```json
{
  "message": "ENDPOINTS LIST",
  "data": {
    "tools": {
      "health": "/v1/health",
      "emojis": "/v1/tools/emojis/download",
      "files": "/v1/tools/files",
      "fileDownload": "/v1/tools/files/:name",
      "fileUpload": "/v1/tools/files/upload"
    },
    "apps": {
      "applications": "/v1/aplications",
      "applicationById": "/v1/aplications/:id",
      "applicationUpdate": "/v1/aplications/:id",
      "applicationDelete": "/v1/aplications/:id",
      "applicationCreate": "/v1/aplications/:id"
    },
    "products": {
      "products": "/v1/products",
      "productById": "/v1/products/:id",
      "productUpdate": "/v1/products/:id",
      "productDelete": "/v1/products/:id",
      "productCreate": "/v1/products"
    },
    "users": {
      "users": "/v1/users",
      "userById": "/v1/users/:id",
      "userUpdate": "/v1/users/:id",
      "userDelete": "/v1/users/:id"
    },
    "auth": {
      "login": "/v1/auth/login",
      "register": "/v1/auth/register",
      "delete": "/v1/auth/delete",
      "profile": "/v1/auth/profile/:id"
    },
    "init": {
      "welcome": "/v1",
      "anime": "/v1/anime/:id",
      "manga": "/v1/manga/:id"
    }
  }
```
{% endtab %}

{% tab title="400" %}
```json
{
  "error": "Invalid request"
}
```
{% endtab %}
{% endtabs %}
