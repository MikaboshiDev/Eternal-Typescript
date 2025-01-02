---
description: Validacion de datos para proteccion de peticiones http
---

# Token API

Valida la presencia y autenticidad de un token JWT en las solicitudes HTTP. Se utiliza para proteger rutas en un servidor Express asegurando que solo usuarios autenticados puedan acceder a ellas.

### Funcionamiento

1. **Extracción del Token:**
   * Busca el token en el encabezado HTTP `Authorization` de la solicitud.
   *   Se espera que el encabezado tenga el formato:

       ```http
       Authorization: Bearer <token>
       ```
   * Si el encabezado no está presente o el formato es incorrecto, el middleware responde con un error `401 Unauthorized`.
2. **Validación del Token:**
   * El token se valida mediante una función específica (`getToken` o similar).
   * Si el token no es válido o está expirado, el middleware responde con un error `401 Unauthorized`.
3. **Usuario Decodificado:**
   * Si el token es válido, se decodifica y el usuario asociado al token se añade a la solicitud en `req.user` para que las siguientes capas del servidor puedan acceder a esta información.
4. **Errores Inesperados:**
   * Si ocurre un error interno durante la validación, el middleware responde con un error `500 Internal Server Error`.

***

### Respuestas del Middleware

#### 1. Token Ausente o Formato Incorrecto

**Código de Estado:** `401 Unauthorized`\
**Cuerpo de la Respuesta:**

```json
{
  "data": null,
  "errors": {
    "message": "Token not found in headers",
    "date": "2025-01-02T00:00:00.000Z"
  }
}
```

#### 2. Token Inválido

**Código de Estado:** `401 Unauthorized`\
**Cuerpo de la Respuesta:**

```json
{
  "data": null,
  "errors": {
    "message": "Token not valid",
    "date": "2025-01-02T00:00:00.000Z"
  }
}
```

#### 3. Error Interno del Servidor

**Código de Estado:** `500 Internal Server Error`\
**Cuerpo de la Respuesta:**

```json
{
  "data": null,
  "errors": {
    "message": "Internal server error",
    "details": "Descripción del error interno",
    "date": "2025-01-02T00:00:00.000Z"
  }
}
```

### Ejemplo de Peticiones

#### Petición con `curl`

**Token Válido**

```bash
curl -X GET http://localhost:3000/api/protected \
-H "Authorization: Bearer <token_válido>"
```

**Respuesta:**

```json
{
  "message": "Acceso autorizado",
  "user": {
    "id": "12345",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Token Ausente**

```bash
curl -X GET http://localhost:3000/api/protected
```

**Respuesta:**

```json
{
  "data": null,
  "errors": {
    "message": "Token not found in headers",
    "date": "2025-01-02T00:00:00.000Z"
  }
}
```

**Token Inválido**

```bash
curl -X GET http://localhost:3000/api/protected \
-H "Authorization: Bearer invalid_token"
```

**Respuesta:**

```json
{
  "data": null,
  "errors": {
    "message": "Token not valid",
    "date": "2025-01-02T00:00:00.000Z"
  }
}
```
