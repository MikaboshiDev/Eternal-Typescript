---
description: limite de peticiones en ciertos endpoints dentro de nuestra api de trabajo
---

# RateLimit

Es una solución sencilla para controlar el número de peticiones realizadas a tu servidor desde una misma dirección IP a un endpoint específico. Este middleware establece límites basados en una ventana de tiempo configurable y aplica un periodo de enfriamiento (cooldown) cuando se excede el límite de peticiones permitidas.

### Respuesta del Middleware

Cuando se excede el límite de peticiones o se intenta acceder durante el tiempo de enfriamiento, el middleware responde con un estado `429 Too Many Requests` y un cuerpo JSON con información relevante:

```json
{
  "error": "Too many requests. Please try again later.",
  "cooldownUntil": 1706757654321
}
```

#### Headers de la Respuesta

| Header                  | Descripción                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `X-RateLimit-Limit`     | Límite máximo de peticiones permitidas en la ventana de tiempo configurada.                                               |
| `X-RateLimit-Remaining` | Número de peticiones restantes en la ventana de tiempo actual.                                                            |
| `X-RateLimit-Reset`     | Marca de tiempo UNIX (en milisegundos) indicando cuándo se reiniciará el contador o finalizará el tiempo de enfriamiento. |

***

### Realizar Peticiones desde la Terminal

Puedes usar `curl` para probar las peticiones a tu servidor:

#### Petición Exitosa

```bash
curl -X GET http://localhost:3000/api/example -i
```

Respuesta esperada:

```makefile
HTTP/1.1 200 OK
X-RateLimit-Limit: 50
X-RateLimit-Remaining: 49
X-RateLimit-Reset: 1706757654321
Content-Type: application/json
{
  "message": "Esta es una ruta con rate limiting."
}
```

#### Exceder el Límite

Haz múltiples peticiones para exceder el límite configurado (`maxRequests`):

```bash
for i in {1..51}; do curl -X GET http://localhost:3000/api/example -i; done
```

Respuesta esperada tras exceder el límite:

```makefile
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 50
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1706757654321
Content-Type: application/json
{
  "error": "Too many requests. Please try again later.",
  "cooldownUntil": 1706757654321
}
```

***

### Notas Adicionales

1. **Ventana de Tiempo:** El contador de peticiones se reinicia automáticamente después de la duración configurada en `windowMs`.
2. **Enfriamiento:** Si un cliente excede el límite de peticiones, todas las solicitudes posteriores serán bloqueadas hasta que finalice el periodo de enfriamiento (`cooldownMs`).

Esta implementación asegura que los recursos del servidor estén protegidos frente a abusos o uso excesivo de cualquier cliente.
