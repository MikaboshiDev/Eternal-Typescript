---
description: >-
  Esta página le ayudará a comprender cómo utilizar la API Rest. Recomendamos
  encarecidamente leer esto antes de comenzar a utilizar la API.
---

# Referencias

### Rate Limits

La API tiene un límite de velocidad de 1 solicitud por segundo. Si supera este límite, recibirá una respuesta 429. Puede utilizar el encabezado `Retry-After` y `X-RateLimit-Reset` para determinar cuánto tiempo esperar antes de volver a intentarlo.

Si excedes el límite de velocidad 10 veces en la misma hora, quedarás bloqueado durante una hora.

### Autentificación

La api requiere de una autentificación regular en gran parte de las solicitudes, aquellas que no lo necesiten se especificarán dentro de las mismas.

Una vez que tengas tu token de autorización debes configurarlo de la siguiente manera (1hr)

```
Authorization: Bearer <token>
```

### Búsquedas

{% hint style="warning" %}
Se sigue trabajando en esta sección hasta el momento de su ultima modificación dentro de la documentación y el proyecto
{% endhint %}
