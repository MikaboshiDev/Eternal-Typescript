---
description: Url's para acceso de las aplicaciones registradas dentro de el cliente
---

# Aplicaciones.

* URL: `http://api.night-support.xyz/v1`
* TOKEN: `"Authorization": "Bearer " + process.env.API_KEY`
* DEVELOPER: `"Secret-Auth": process.env.SECRET_AUTH`

`Note:` El DEVELOPER TOKEN  es opcional si y solo si tienes rol de desarrollador dentro de tu perfil guardado en la API

## Obtén una lista de aplicaciones

<mark style="color:green;">`GET`</mark> `/aplications`

Obtén una lista de todas las aplicaciones dentro de la base de datos

**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

**Response**

{% tabs %}
{% tab title="200" %}
```json
{
 status: true,
 message: "Aplications found in the database",
 elements: 10,
 data: [
  {
   "name": "",
   "id": "",
   "description": "",
   "licence": "MIT",
   "avatarURL": "",
   "ownerId": "",
   "guilds": [
     {}
   ],
   "supportServer": "",
   "emailContact": "",
  }
 ]
}
```
{% endtab %}

{% tab title="400" %}
```json
{
  "status": "error",
  "message": "internal server error",
  "reason": "reason the error request"
}
```
{% endtab %}
{% endtabs %}

## Obtén una aplicación

<mark style="color:green;">`GET`</mark> `/aplications/:id`

Obtén la información de una aplicación a partir de su id de registro

**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

Path

| Name | Type   | Description                    |
| ---- | ------ | ------------------------------ |
| id   | string | id de la aplicación registrada |

**Response**

{% tabs %}
{% tab title="200" %}
```json
```
{% endtab %}

{% tab title="400" %}
```json
{
  "status": "error",
  "message": "internal server error",
  "reason": "reason the error request"
}
```
{% endtab %}
{% endtabs %}

## Crea una aplicación

<mark style="color:green;">`POST`</mark> `/aplications`

Crea una aplicación dentro de la base de datos

**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

**Body**

<table><thead><tr><th width="288">Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>name</code></td><td>string</td><td>nombre de la app</td></tr><tr><td><code>id</code></td><td>string</td><td>id de la app (discord)</td></tr><tr><td><code>description</code></td><td>string</td><td>descripción de que hace la app</td></tr><tr><td><code>licence</code></td><td>string</td><td>licencia de la aplicación</td></tr><tr><td><code>avatarURL</code></td><td>string</td><td>foto de perfil</td></tr><tr><td><code>ownerId</code></td><td>string</td><td>dueño de la aplicación</td></tr><tr><td><code>guilds</code></td><td>array</td><td>servidores de la app</td></tr><tr><td><code>supportServer</code></td><td>string</td><td>invitación a el servidor de discord</td></tr><tr><td><code>emailContact</code></td><td>string</td><td>email de contacto</td></tr></tbody></table>

**Response**

{% tabs %}
{% tab title="200" %}
```json
{
 status: true,
 message: "Aplication found in the database",
 data: {
  {
   "name": "",
   "id": "",
   "description": "",
   "licence": "MIT",
   "avatarURL": "",
   "ownerId": "",
   "guilds": [
     {}
   ],
   "supportServer": "",
   "emailContact": "",
 }
 }
}
```
{% endtab %}

{% tab title="400" %}
```json
{
  "status": "error",
  "message": "internal server error",
  "reason": "reason the error request"
}
```
{% endtab %}
{% endtabs %}

## Actualizar una aplicación

<mark style="color:green;">`PUT`</mark> `/aplications/:id`

Actualizar alguna aplicación apartir del id proporcionado

**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |
| Secret-Auth   | `Developer Token`  |

Path

| Name | Type   | Value                                   |
| ---- | ------ | --------------------------------------- |
| `id` | string | id de la aplicacion en la base de datos |

**Body**

| Name            | Type   | Description                      |
| --------------- | ------ | -------------------------------- |
| `name`          | string | Nombre de la aplicación          |
| `id`            | string | Id de la aplicación              |
| `description`   | string | descripción de su funcionamiento |
| `licence`       | string | licencia de activacion           |
| `avatarURL`     | string | URL de foto de perfil de la app  |
| `ownerId`       | string | dueño de la aplicacion           |
| `guilds`        | array  | servidores de la aplicación      |
| `supportServer` | string | URL de su servidor de discord    |
| `emailContact`  | string | Email de contacto                |

**Response**

{% tabs %}
{% tab title="200" %}
```json
{
 status: true,
 message: "Aplication found in the database",
 data: {
  {
   "name": "",
   "id": "",
   "description": "",
   "licence": "MIT",
   "avatarURL": "",
   "ownerId": "",
   "guilds": [
     {}
   ],
   "supportServer": "",
   "emailContact": "",
 }
 }
}
```
{% endtab %}

{% tab title="400" %}
```json
{
  "status": "error",
  "message": "internal server error",
  "reason": "reason the error request"
}
```
{% endtab %}
{% endtabs %}

## Eliminar alguna aplicación

<mark style="color:red;">`DELETE`</mark> `/aplications/:id`

Eliminar los datos de la aplicacion dentro de la base de datos

**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |
| Secret-Auth   | `Developer Token`  |

Path

| Name | Type   | Description         |
| ---- | ------ | ------------------- |
| id   | string | Id de la aplicacion |

**Response**

{% tabs %}
{% tab title="200" %}
El siguiente URL consta de requisitos para su uso:

* Registro y Logueo dentro de  la API.
* Permisos de desarrollador o acceso a la clave de desarrollador
* Validación de datos

`200:` La aplicación a sido eliminada de forma correcta

```json
{
 "status": true,
 "message": "APP_DELETED"
}
```
{% endtab %}

{% tab title="400" %}
```json
{
  "status": "error",
  "message": "internal server error",
  "reason": "reason the error request"
}
```
{% endtab %}
{% endtabs %}
