---
description: Url's para acceso a los productos dentro de la api del cliente
---

# Productos

* URL: `http://api.hiroshi-dev.me/v1`
* TOKEN: `"Authorization": "Bearer " + process.env.API_KEY`
* DEVELOPER: `"Secret-Auth": process.env.SECRET_AUTH`

`Note:` El DEVELOPER TOKEN  es opcional si y solo si tienes rol de desarrollador dentro de tu perfil guardado en la API

## Obtener un producto

<mark style="color:green;">`GET`</mark> `/products/:id`

Obtener un producto a partir de la id del mismo

**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

Path

| Name | Type   | Description              |
| ---- | ------ | ------------------------ |
| `id` | string | Id del producto guardado |

**Response**

{% tabs %}
{% tab title="200" %}
```json
[
  {
    "_id": "65dd78a38447ac9adbea59e9",
    "name": "Product 1",
    "id": "f67a203a-2855-4d3b-bd70-4433b8834f5a",
    "description": "Product 1 description here",
    "price": 100,
    "downloadLink": "http://www.example.com/download-link",
    "category": "Category 1",
    "supportEnabled": false,
    "createdAt": "2024-02-27T05:52:35.716Z",
    "updatedAt": "2024-02-27T05:52:35.716Z"
  }
]
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

## Obtener la lista de productos

<mark style="color:green;">`GET`</mark> `/products`

Obtener toda la lista de los productos guardados dentro de la base de datos

**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

**Response**

{% tabs %}
{% tab title="200" %}
<pre class="language-json"><code class="lang-json">[
  {
    "_id": "65dd78a38447ac9adbea59e9",
    "name": "Product 1",
    "id": "f67a203a-2855-4d3b-bd70-4433b8834f5a",
    "description": "Product 1 description here",
    "price": 100,
    "downloadLink": "http://www.example.com/download-link",
    "category": "Category 1",
    "supportEnabled": false,
    "createdAt": "2024-02-27T05:52:35.716Z",
    "updatedAt": "2024-02-27T05:52:35.716Z"
  },
    {
    "_id": "65dd78a38447ac9adbea59e9",
    "name": "Product 1",
    "id": "f67a203a-2855-4d3b-bd70-4433b8834f5a",
    "description": "Product 1 description here",
    "price": 100,
    "downloadLink": "http://www.example.com/download-link",
    "category": "Category 1",
    "supportEnabled": false,
    "createdAt": "2024-02-27T05:52:35.716Z",
    "updatedAt": "2024-02-27T05:52:35.716Z"
  }
<strong>]
</strong></code></pre>
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

## Crear un producto

<mark style="color:green;">`POST`</mark> `/products`

Crear un producto dentro del proyecto de la DB

**Headers**

| Name            | Value              |
| --------------- | ------------------ |
| Content-Type    | `application/json` |
| Authorization   | `Bearer <token>`   |
| Developer Token | `Secret-Auth`      |

**Body**

| Name             | Type    | Description                  |
| ---------------- | ------- | ---------------------------- |
| `name`           | string  | Nombre del producto          |
| `description`    | string  | Descripción de el producto   |
| `price`          | number  | Precio del producto          |
| `downloadLink`   | string  | Link de descarga             |
| `imageURL`       | string  | Imagen del producto          |
| `category`       | string  | Categoría a la que pertenece |
| `supportEnabled` | boolean | Tipo de soporte habilitado   |
| creatorId        | string  | Id del creador               |

**Response**

{% tabs %}
{% tab title="200" %}
* Este Url cuenta con validación de elementos por lo que se pide que la estructura de los datos ingresados sea acorde a lo que se necesita del mismo.

```json
[
"status": true,
"message": "PRODUCTS FOUND IN THE DATABASE",
"elements": 12,
"data": [
  {
    "_id": "65dd78a38447ac9adbea59e9",
    "name": "Product 1",
    "id": "f67a203a-2855-4d3b-bd70-4433b8834f5a",
    "description": "Product 1 description here",
    "price": 100,
    "downloadLink": "http://www.example.com/download-link",
    "category": "Category 1",
    "supportEnabled": false,
    "createdAt": "2024-02-27T05:52:35.716Z",
    "updatedAt": "2024-02-27T05:52:35.716Z"
  }
 ]
]
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
