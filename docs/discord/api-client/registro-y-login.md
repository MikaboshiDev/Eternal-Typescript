---
description: Registro y Login dentro de el API CLIENT
---

# Registro y Login

Bueno como ya  te abras dado cuenta debes de registrarte la primera vez que usas o ingresas a esta API esto debido a protocolos de seguridad del cliente.

> El registro y logueo dentro del cliente es obligatorio cada que accedas a alguna de las funciones mencionadas en esta documentación

El entorno de la WEB y de la API son zonas diferentes por lo que no funcionan del todo igual, explicándolo mejor si tienes roles de desarrollador en la web pero no se te asignaron igual en la API CLIENT no podrás acceder a los sitios de desarrollador.

```typescript
import { Schema, Types, model, Model } from "mongoose";

const UserSchema = new Schema(
	{
		password: { type: String, default: "Sin registrar" },
		email: { type: String, required: true, unique: true },
		rank: { type: String, default: "user" },
		name: { type: String, required: true },
		id: { type: String, required: true },
		products: { type: Array },
		invoice: { type: Array },
		rangos: { type: Array },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
const UserModel = model("User-model", UserSchema);
export default UserModel;
```

Al momento de hacer el logueo dentro la API te dará dos cosas:

1. Contraseña: Tu contraseña será encriptada para evitar robos o suplantación de datos
2. Token: Se te genera un token único que podrás usar para acceder a los demás sitios de la api

### Registro

{% swagger method="post" path="" baseUrl="http://localhost:3000/api/auth/register" summary="Realizar registro dentro del cliente de la aplicacion" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="email" type="String" required="true" %}
Email con el que te quieres registrar
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" type="String" required="true" %}
Contraseña para tu perfil&#x20;
{% endswagger-parameter %}

{% swagger-parameter in="body" name="name" type="String" required="true" %}
Nombre de identificacion
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Perfil guardado correctamente" %}

{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Error de parte del servidor" %}

{% endswagger-response %}
{% endswagger %}

El registro de el usuario es permanente por lo que no deberás hacerlo de nuevo, sin embargo deberás loguearte cada 1hr de tiempo ya que el token es temporal, este token se coloca en los <mark style="color:orange;">bearer token</mark>

```json
{
  "password": "$2a$08$CCjYdU9UYDb/I.goDm2ctOBWxYEtKR1rBINw9ODNrAL1YjHvQZUva",
  "email": "luisantonio200386@gmail.com",
  "licences": [],
  "rank": "user",
  "name": "Luis Antonio Porras Hernandez",
  "id": "679560282929889331",
  "products": [],
  "invoice": [],
  "rangos": [],
  "_id": "65867e9131ce6a9a1264200f",
  "createdAt": "2023-12-23T06:30:41.844Z",
  "updatedAt": "2023-12-23T06:30:41.844Z"
}
```

### Login

{% swagger method="post" path="" baseUrl="http://localhost:3000/api/auth/login" summary="Realiza un logueo del usuario para un token de registro temporal de 1hr" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="email" type="String" required="true" %}
Correo con el que te registraste anteriormente
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" type="String" required="true" %}
Contraseña del perfil
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Usuario logueado token jwt generado" %}

{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Error de parte del servidor" %}

{% endswagger-response %}
{% endswagger %}

Esto es lo que genera el token de registro que es temporal, se pide en la mayoría de end points de la api excepto de las url de uso general

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imx1aXNhbnRvbmlvMjAwMzg2QGdtYWlsLmNvbSIsImlhdCI6MTcwMzMxMzM0NywiZXhwIjoxNzAzMzk5NzQ3fQ.mXe2oLMoYJmHojLFTSBsEab0LYqjPtYwkgBcGHIr4wM",
  "user": {
    "_id": "65867e9131ce6a9a1264200f",
    "password": "$2a$08$CCjYdU9UYDb/I.goDm2ctOBWxYEtKR1rBINw9ODNrAL1YjHvQZUva",
    "email": "luisantonio200386@gmail.com",
    "licences": [],
    "rank": "user",
    "name": "Luis Antonio Porras Hernandez",
    "id": "679560282929889331",
    "products": [],
    "invoice": [],
    "rangos": [],
    "createdAt": "2023-12-23T06:30:41.844Z",
    "updatedAt": "2023-12-23T06:30:41.844Z"
  }
}
```
