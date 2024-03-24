---
description: Permisos y Requisitos para Endpoints de la API
---

# Permisos

En varios end points se te pedirá tu API KEY para poder validar la carga de permisos dentro de el cliente, lo que es por default es el TOKEN que se obtiene en el login cada 1hr

```typescript
import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { id } from "common-tags";

async function requestURL() {
	const response = await axios({
		url: "http://localhost:3000/api/v1/products/create",
		method: "POST",
		data: {
			name: "test",
			id: "SYE2-DUE2-E833-DWU2-EF9F",
			description: "",
			price: 30,
			dowloadLink: "",
			imageURL: "",
			category: "",
			supportEnabled: false,
			creatorId: ""
		},
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"api-key": `<api key>`,
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

#### Api Client

Aquí la cosa es muy diferente ya que no importan tus roles dentro del servidor de discord, lo que se cuenta son las características dentro del perfil creado en tu primera vez interactuando con la aplicación.

A la hora de registrarte por defecto entraras como usuario así que tendrás limitaciones dentro de las funciones, con el tiempo se mejoran la clasificación de rangos en dos ramas mas que son customer y desarrollador&#x20;
