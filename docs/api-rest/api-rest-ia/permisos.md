---
description: Permisos y Requisitos para Endpoints de la API
---

# Permisos

En múltiples puntos finales (endpoints) de la API, se solicitará la API KEY del usuario para validar los permisos de acceso dentro del cliente. Por defecto, esta API KEY es equivalente al TOKEN obtenido durante el proceso de inicio de sesión, el cual tiene una duración de validez de una hora. Esta medida asegura la adecuada carga de permisos y autorizaciones al interactuar con el cliente.

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

Existen diversas categorías de rutas en la plataforma, incluyendo aquellas que son públicas, dirigidas a compradores y a desarrolladores. El acceso y control de estas rutas se determinan mediante la información almacenada en el perfil del usuario, así como en los servidores de Discord.

## Endpoints

Los Endpoints representan las rutas disponibles tanto en el sitio web como en la API, a las cuales se puede acceder para llevar a cabo una variedad de funciones. Estas funciones abarcan la creación de productos, acceso a información de servicios, gestión de servidores, usuarios, productos, control de clientes, entre otras actividades.

## Desarrollador

Las funciones para desarrolladores son gestionadas de dos maneras distintas: en el sitio web, se determinan según los roles asignados dentro del servidor de Discord. Por otro lado, en la API Client, el enfoque difiere significativamente, ya que los roles dentro del servidor de Discord no tienen relevancia. En cambio, se consideran las características del perfil creado durante la interacción inicial con la aplicación.

## Registro

Al registrarse en la plataforma, los usuarios son automáticamente clasificados como "usuarios" por defecto, lo que implica ciertas limitaciones en cuanto a funcionalidades. Con el tiempo, se amplía esta clasificación para incluir dos categorías adicionales: "customer" y "desarrollador", con el fin de ofrecer una experiencia más personalizada y adaptada a las necesidades individuales.
