---
description: >-
  El sistema de productos permite publicar, editar, eliminar y ver los datos
  guardados dentro de la base de datos
---

# Productos

Existen 7 end points relacionados a los productos de la WEB y la API, dos de ellos son de acceso publico y las 5 restantes necesitas permisos especiales para acceder. <mark style="background-color:red;">Cabe recalcar que para todas las end points disponibles se solicita como método de autorización por default en Token de logueo de su perfil</mark>

### Publicas

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
Descripcion del producto
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

