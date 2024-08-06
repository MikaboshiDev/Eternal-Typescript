---
description: Control de Versiones del proyecto Eternal Support
---

# Eternal Support

## Log

### `v1.0.9`

> Agosto 05, 2024

* `Fix`: Se arreglaron todos los errores y se renombraron funciones de la `v1.0.4` en adelante
* `Add`: Se agrego `GithubData` que acomoda y resume la informacion de un perfil de github por medio de la api
* `Add`: `DiscordLogger` una forma rapida de añadir logs a tu servidor

### `v1.0.4`

> Mayo 12, 2024

* `Fix`: Arreglo en las funciones de anime y manga en general
* `Add`: Registro de errores por medio de archivos .log
* `Fix`: Cambio en el nombre de las propiedades del Nsfw y Anime
* `Remove`: Clase de utilidades de minecraft
* `Add`: Middlwares para api rest de blacklist y morgan
* `Add`: Funciones de discord bots (comandos de texto, obtención de archivos y control de errores por express)

{% hint style="warning" %}
En la versión 1.0.5 hay un error de typescript que cuenta como un dato inexistente response.data dentro de la petición a la api, esto se arregla definiendo como un dato cualquiera a response.

Este error no existe en JavaScript

```typescript
import { animeClient, mangaClient } from 'eternal-support';
const response: any = await animeClient.random();
console.log(response.data)
```
{% endhint %}



### `v1.0.0`

> Abril 20, 2024

* `Add:` Clase de utilidades privadas para Eternal IA
* `Remove:` ApiTools se removió por errores de funcionamiento base
* `Fix:` Corregido error de anime y mangas
* `Add:` Logueo por medio de archivo .log dentro de la función anti crash

### `v0.0.7-alpha`

> Abril 04, 2024

* `Remove`: Obtención de jugadores de los servidores de minecraft
* `Remove`: Handlers de express, whatsapp-web.js y discord.js

### `v0.0.7`

> Abril 04, 2024

* `Add`: Estado de servidores de minecraft (java / bedrock)
* `Fix`: Error de petición HTTP a la api de night supports
* `Fix`: Error de obtención de imágenes de nekos.life y akaneko api
* `Add`: Documentación del código TS de la librería y agregado de reglas de eslint

### `v0.0.6`

> Marzo 29, 2024

* `Fix`: Tipos de funciones para compatibilidad
* `Add`: Función de soporte para errores del cliente de discord y general
* `Fix`: Clase de ApiTools arreglada
* `Add`: Handlers para comandos de Whatsapp y Api
* `Add`: Test de las funciones y clases dentro de la librería
* `Fix`: Respuesta de las funciones de anime y manga

### `v0.0.4`

> Marzo 28, 2024

* `Add`: Funciones de Sfw y Nsfw por medio de clasificación
* `Fix`: Funciones de Anime y Manga clasificadas
* `Remove:` Funciones generales
* `Add`: Herramientas para la interacción con la api privada de la organización
* `Add`: Función de alertas ante modificaciones de Mongoose

### `v0.0.3`

> Marzo 27, 2024

* `Add`: Funciones de anime, manga, consola dentro del paquete
* `Add`: Implementación de funciones akaneko
* `Add`: Compatibilidad con JavaScript

### `v0.0.3-alpha`

> Marzo 27, 2024

* `Add`: Función de estilos de consola
* `Add`: Funciones de anime y manga por medio de Api
* `Remove`: Tipos para exportación de paquetes
