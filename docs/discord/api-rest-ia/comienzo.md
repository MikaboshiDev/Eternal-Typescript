---
description: Registro y Login dentro del cliente
---

# Comienzo

Bueno como ya  te abras dado cuenta debes de registrarte la primera vez que usas o ingresas a esta API esto debido a protocolos de seguridad del cliente.

> El registro y logueo dentro del cliente es obligatorio cada que accedas a alguna de las funciones mencionadas en esta documentación

El entorno de la Web y de la Api son zonas diferentes por lo que no funcionan del todo igual, explicándolo mejor si tienes roles de desarrollador en la web pero no se te asignaron igual en el cliente no podrás acceder a los sitios de desarrollador.

Al momento de hacer el logueo dentro la Api te dará dos cosas:

1. Contraseña: Tu contraseña será encriptada para evitar robos o suplantación de datos
2. Token: Se te genera un token único que podrás usar para acceder a los demás sitios de la api

### Registro

## Realizar registro dentro del cliente de la aplicación

<mark style="color:green;">`POST`</mark> `http://localhost:3000/api/auth/register`

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

El registro de el usuario es permanente por lo que no deberás hacerlo de nuevo, sin embargo deberás loguearte cada 1hr de tiempo ya que el token es temporal, este token se coloca en los <mark style="color:orange;">bearer token</mark>

```json
{
  "password": "$2a$08$BDjR4rpsYwTJzPKvI6l8v.1t10MY/8MfCC3TFa8TVpnT274ONMw7W",
  "email": "luisantonio200386@gmail.com",
  "name": "Luis Antonio Porras Hernandez",
  "id": "6afcb364-c44b-47d2-8cd5-ec339684fd06",
  "rank": "user",
  "_id": "65dd76d5af9e7ad305a2f41b",
  "createdAt": "2024-02-27T05:44:54.011Z",
  "updatedAt": "2024-02-27T05:44:54.011Z"
}
```

### Login

## Realiza un logueo del usuario para un token de registro temporal de 1hr

<mark style="color:green;">`POST`</mark> `http://localhost:3000/api/auth/login`

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

Esto es lo que genera el token de registro que es temporal, se pide en la mayoría de end points de la api excepto de las url de uso general

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imx1aXNhbnRvbmlvMjAwMzg2QGdtYWlsLmNvbSIsImlhdCI6MTcwOTAxMjc0OCwiZXhwIjoxNzA5MDk5MTQ4fQ.IddjX7oSYxVWbr-b5W8rdqJp7AFsgCD1OBedmI0qZJg",
  "user": {
    "_id": "65dd76d5af9e7ad305a2f41b",
    "password": "$2a$08$BDjR4rpsYwTJzPKvI6l8v.1t10MY/8MfCC3TFa8TVpnT274ONMw7W",
    "email": "luisantonio200386@gmail.com",
    "name": "Luis Antonio Porras Hernandez",
    "id": "6afcb364-c44b-47d2-8cd5-ec339684fd06",
    "rank": "user",
    "createdAt": "2024-02-27T05:44:54.011Z",
    "updatedAt": "2024-02-27T05:44:54.011Z"
  }
}
```
