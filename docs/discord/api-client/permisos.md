---
description: Permisos y Requisitos para Endpoints de la API
---

# Permisos

En varios end points se te pedirá tu <mark style="background-color:orange;">DISCORD PROFILE ID</mark> de usuario de discord o tu <mark style="background-color:orange;">TOKEN</mark> de logueo esto para verificar si estas dentro del servidor o si estas registrado dentro de nuestro cliente.

```typescript
import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { id } from "common-tags";

async function requestURL() {
	const response = await axios({
		url: "http://localhost:3000/api/products/create",
		method: "POST",
		data: {
			name: "test",
			price: 123,
			description: "test",
			category: "test",
			countInStock: 123,
			imageUrl: "test",
		},
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"User-id": `${localStorage.getItem("id")}`,
		},
	});

	return response;
}
```

## Características

Hay rutas tanto publicas, de compradores, desarrolladores todas estas se controlan a partir de la información guardada dentro de tu perfil y en el servidor de discord.

### Endpoints&#x20;

Los Endpoints son las rutas dentro de la Website y de la api a las que tienes acceso para realizar un montón de funciones, como crear productos, información del servicio, servidores, usuarios, productos, control de clientes etc. etc..

#### Desarrollador

Estas funciones se controlan de dos formas, dentro la web se controlan a partir de tus roles dentro del servidor de discord.

<figure><img src="../../.gitbook/assets/Captura de pantalla 2023-12-22 160059.png" alt=""><figcaption></figcaption></figure>

#### Api Client

Aquí la cosa es muy diferente ya que no importan tus roles dentro del servidor de discord, lo que se cuenta son las características dentro del perfil creado en tu primera vez interactuando con la aplicación.

```typescript
import { Schema, Types, model, Model } from "mongoose";

const UserSchema = new Schema(
	{
		password: { type: String, default: "Sin registrar" },
		email: { type: String, required: true, unique: true },
		blacklist: Boolean,
		licences: { type: Array },
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

A la hora de registrarte por defecto entraras como usuario asi que tendrás limitaciones dentro de las funciones, con el tiempo se mejoran la clasificación de rangos en dos ramas mas que son customer y desarrollador&#x20;
