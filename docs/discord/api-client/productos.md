---
description: >-
  El sistema de productos permite publicar, editar, eliminar y ver los datos
  guardados dentro de la base de datos
---

# Productos

Existen 7 end points relacionados a los productos de la WEB y la API, dos de ellos son de acceso publico y las 5 restantes necesitas permisos especiales para acceder. <mark style="background-color:red;">Cabe recalcar que para todas las end points disponibles se solicita como método de autorización por default en Token de logueo de su perfil</mark>

### Publicas

Los endpoints públicos de los productos y licencias son para que el usuario pueda interactuar con su perfil de registro y haga peticiones de desarrollo gratuitas.

Ejemplo de una petición POST de como agregar un producto a tu perfil por medio de **CURL**

```concurnas
curl -X POST \
  http://localhost:3000/api/user/123/add-product \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "123",
    "name": "Nombre del Producto",
    "category": "Categoria del Producto",
    "description": "Descripción del Producto",
    "image": "URL_de_la_imagen", //opcional
    "download": "URL_de_descarga"
  }'

```

Este es un ejemplo de como lo puedes hacer de manera rápida y sencilla en caso, de que quieras hacerlo por código como JavaScript o algún otro lenguaje seria de la siguiente forma

### JavaScript Petición

```javascript
const axios = require('axios');

const url = 'http://localhost:3000/api/user/123/add-product'; // Reemplaza '123' con el ID real
const data = {
  id: '123', // Reemplaza '123' con el ID real
  name: 'Nombre del Producto',
  category: 'Categoria del Producto',
  description: 'Descripción del Producto',
  image: 'URL_de_la_imagen',
  download: 'URL_de_descarga'
};

axios.post(url, data)
  .then(response => {
    console.log('Respuesta del servidor:', response.data);
  })
  .catch(error => {
    console.error('Error al realizar la solicitud:', error);
  });

```

### Python Petición

```python
import requests

url = 'http://localhost:3000/api/user/123/add-product'  # Reemplaza '123' con el ID real
data = {
    'id': '123',  # Reemplaza '123' con el ID real
    'name': 'Nombre del Producto',
    'category': 'Categoria del Producto',
    'description': 'Descripción del Producto',
    'image': 'URL_de_la_imagen',
    'download': 'URL_de_descarga'
}

response = requests.post(url, json=data)

if response.status_code == 200:
    print('La solicitud se completó exitosamente.')
    print('Respuesta del servidor:', response.json())
else:
    print('Error al realizar la solicitud:')
    print('Código de estado:', response.status_code)
    print('Contenido de la respuesta:', response.text)
```

### URL Endpoints

#### Agregar Producto

Al agregar un producto a tu perfil se hace el análisis si este producto ya se te entrego y se convalida, en caso contrario se considera como petición de desarrollo por lo que se mantendrá en espera hasta obtener respuesta de los desarrolladores por ticket.

{% swagger method="post" path="" baseUrl="http://localhost:3000/api/user/:id/add-product" summary="Agrega tus nuevos productos para que sean procesados por el desarrollador" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="id" type="String" required="true" %}
ID del producto que se va a desarrollar o ya se entrego
{% endswagger-parameter %}

{% swagger-parameter in="body" name="name" type="String" required="true" %}
Nombre del producto
{% endswagger-parameter %}

{% swagger-parameter in="body" name="category" type="String" required="true" %}
Categoria a la que pertenece
{% endswagger-parameter %}

{% swagger-parameter in="body" name="description" type="String" required="true" %}
descripcion de uso y del producto
{% endswagger-parameter %}

{% swagger-parameter in="body" name="download" type="String" required="true" %}
link de descarga del mismo en mega o otros sistemas de subida
{% endswagger-parameter %}

{% swagger-parameter in="body" name="image" type="String" %}
imagen del producto para ilustrar
{% endswagger-parameter %}

{% swagger-parameter in="path" name="id" type="Number" %}
Id del usuario que hace la peticion
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Producto agregado a su perfil de usuario" %}

{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Error del servidor" %}

{% endswagger-response %}
{% endswagger %}

#### Información Productos

Obtén la información del producto del que estés interesado con tan solo su id de registro, desde un solo producto a toda la lista guardada en el momento

{% swagger method="get" path="" baseUrl="http://localhost:3000/api/products/:id" summary="Obtén la información de uno de los productos por medio de su ID" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}
ID del producto que vas solicitar
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Devuelve la información de el producto solicitado en el URL" %}

{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="La ID no corresponde a ninguno de los productos" %}

{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Sin datos guardados dentro de la base de datos" %}

{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Error por parte del servidor en el momento de buscar el producto" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="" baseUrl="http://localhost:3000/api/products" summary="Obtén todos los productos guardados hasta el momento" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-response status="200: OK" description="Devuelve los productos en un Array de datos" %}

{% endswagger-response %}

{% swagger-response status="404: Not Found" description="No hay datos guardados en el momento" %}

{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Error al obtener los datos por parte del servidor" %}

{% endswagger-response %}
{% endswagger %}

### Privadas

Son end points a los que solo usuarios de nivel administrador pueden acceder o usuarios con rol de dueño o co-dueño dentro del servidor de discord

#### URL Productos

Estas son url para los desarrolladores ya que modifican y interactúan directamente con los schema de los productos originales, por lo que se necesita un permiso de desarrollador o una licencia temporal para poder interactuar con ellos&#x20;

{% swagger method="put" path="" baseUrl="http://localhost:3000/api/products/:id/update" summary="Actualiza los datos de alguno de los productos dentro de la DB" %}
{% swagger-description %}
Se requieren permisos de desarrollador para esta petición dentro del headers
{% endswagger-description %}

{% swagger-parameter in="header" name="User-id" type="String" required="true" %}
ID de usuario dentro del servidor de discord
{% endswagger-parameter %}

{% swagger-parameter in="body" name="name" type="String" required="true" %}
Nombre del producto
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Token" type="String" %}
Token de login anteriormente dado
{% endswagger-parameter %}

{% swagger-parameter in="body" name="id" type="String" required="true" %}
ID del producto
{% endswagger-parameter %}

{% swagger-parameter in="body" name="price" type="Number" required="false" %}
Nuevo precio a asignar del producto
{% endswagger-parameter %}

{% swagger-parameter in="body" name="description" type="String" %}
Descripción del producto
{% endswagger-parameter %}

{% swagger-parameter in="body" name="category" type="String" %}
Nueva categoría a asignar
{% endswagger-parameter %}

{% swagger-parameter in="body" name="image" type="String" %}
Nueva imagen
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Datos actualizados del producto" %}

{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Error al actualizar el producto" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="" baseUrl="http://localhost:3000/api/products/:id/delete" summary="Elimina uno de los productos registrados" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Token" type="String" required="true" %}
Token de login anteriormente dado
{% endswagger-parameter %}

{% swagger-parameter in="header" name="User-id" type="String" %}
ID de usuario dentro del servidor de discord
{% endswagger-parameter %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}
ID del producto que deseas eliminar
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Producto eliminado con éxito de la base de datos" %}

{% endswagger-response %}

{% swagger-response status="404: Not Found" description="No se encontró un producto con esa ID" %}

{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Error al intentar eliminar el producto" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="" baseUrl="http://localhost:3000/api/products/create" summary="Crea un nuevo producto dentro de la API " %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="name" type="String" required="true" %}
Nombre del producto
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Token" type="String" required="true" %}
Token de login anteriormente dado
{% endswagger-parameter %}

{% swagger-parameter in="body" name="id" type="String" required="true" %}
ID de reconocimiento de el producto
{% endswagger-parameter %}

{% swagger-parameter in="header" name="User-id" type="String" required="true" %}
ID de usuario dentro del servidor de discord
{% endswagger-parameter %}

{% swagger-parameter in="body" name="price" type="Number" required="true" %}
Precio de mercado
{% endswagger-parameter %}

{% swagger-parameter in="body" name="description" type="String" required="true" %}
Descripción del producto&#x20;
{% endswagger-parameter %}

{% swagger-parameter in="body" name="image" type="String" %}
URL de la imagen de ilustración
{% endswagger-parameter %}

{% swagger-parameter in="body" name="category" type="String" %}
Categoría de clasificacion
{% endswagger-parameter %}
{% endswagger %}

