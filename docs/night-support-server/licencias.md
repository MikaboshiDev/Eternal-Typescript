---
description: Licencias de los productos mencionados en esta documentación
---

# Licencias

Aun que los productos son gratuitos, se hace petición de una licencia de uso (Opcional) para que puedas recibir un soporte por parte de nosotros como grupo. Esto se hace con la finalidad de poder mejorar las funciones de cada uno de los repositorios dentro de nuestro pasatiempo.

Estas licencias son sumamente opcionales es posible removerlas, pero en caso no se les brindara un soporte preferencial en caso de errores del producto o código.

<figure><img src="../.gitbook/assets/Captura de pantalla 2023-12-04 110759.png" alt=""><figcaption></figcaption></figure>

Estas licencias las puedes solicitar mediante el servidor de discord o mediante servicio WEB en el siguiente enlace [Night Support Server.](http://www.night-support.xyz/)

{% swagger method="post" path="" baseUrl="http://localhost:3000/api/users/:id/add-licence" summary="Agrega tu licencia asignada a tu perfil del servidor de discord" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}
ID del usuario con el que vas a interactuar
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Token" type="String" required="true" %}
Token que se te da al loguearte dentro de la API
{% endswagger-parameter %}

{% swagger-parameter in="body" name="Licence" type="String" required="true" %}
Licencia a agregar
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Licencia agregada a tu perfil" %}

{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Perfil del usuario no encontrado" %}

{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Error interno del servidor de discord" %}

{% endswagger-response %}
{% endswagger %}
