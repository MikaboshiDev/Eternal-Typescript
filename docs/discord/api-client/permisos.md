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
