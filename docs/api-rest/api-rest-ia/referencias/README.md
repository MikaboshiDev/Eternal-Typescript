---
description: >-
  Esta página le ayudará a comprender cómo utilizar la API Rest. Recomendamos
  encarecidamente leer esto antes de comenzar a utilizar la API.
---

# Referencias

## Rate Limits

La API tiene un límite de velocidad de 1 solicitud por segundo. Si supera este límite, recibirá una respuesta 429. Puede utilizar el encabezado `Retry-After` y `X-RateLimit-Reset` para determinar cuánto tiempo esperar antes de volver a intentarlo.

Si excedes el límite de velocidad 10 veces en la misma hora, quedarás bloqueado durante una hora.

## Autentificación

La api requiere de una autentificación regular en gran parte de las solicitudes, aquellas que no lo necesiten se especificarán dentro de las mismas.

Una vez que tengas tu token de autorización debes configurarlo de la siguiente manera (1hr)

```
Authorization: Bearer <token>
```

## Búsquedas

{% hint style="warning" %}
Se sigue trabajando en esta sección hasta el momento de su ultima modificación dentro de la documentación y el proyecto
{% endhint %}

## Respuesta

La API siempre devolverá un objeto JSON. La respuesta tendrá la siguiente estructura:

```json
{
 "status": Boolean,
 "message": String,
 "data": Object
}
```

## Errores

Si se produce un error, la API devolverá un objeto JSON con la siguiente estructura dependiendo del tipo de error:

### Validación

```json
{
  "errors": [
    {
      "location": "query",
      "msg": "Invalid value",
      "path": "person",
      "type": "field"
    }
  ]
}
```

### Comunes

```json
{
 "status": Boolean,
 "message": String,
 "data": Object
}
```

## EndPoints

Aun que existe una documentación de estos mismos dentro de la Api aquí te explicare cuales son públicos y cuales requieren de un token de acceso o rol de desarrollador dentro de el perfil.

```
http://api.night-support.xyz/v1/
```

### Privados

{% hint style="warning" %}
En construcción `Marzo 28, 2024` puedes visitar el siguiente link [Doc EndPoints](broken-reference)
{% endhint %}
