---
description: >-
  El proyecto se divide por módulos y clases conforme la sección que se desea
  abordar
---

# Clases

Exxplicaremos las clases principales dentro del proyecto y que hay que tenner en ecuenta segun o que se menciona anteriormente

{% hint style="danger" %}
Esta seccion esta sugeta a cambios frecuentes por parte del desarrollador encargado por favor sea paciente y revise la documentacion `09 de Enero del 2024`
{% endhint %}

## Documentación de la Clase AppManager

### Descripción General

La clase `AppManager` es un componente central del proyecto que gestiona múltiples clientes y servicios utilizados en la aplicación. Esta clase maneja la inicialización y gestión de:

* **Bot de Discord** (a través de `BotClient`)
* **Cliente de WhatsApp** (a través de `WhatsApp`)
* **Servidor API Express** (a través de `APIClient`)
* **ORM de Base de Datos** (a través de `PrismaClient`)
* **Cache en Memoria** (a través de `Cache`)

La clase `AppManager` funciona como un controlador centralizado para estos servicios, proporcionando métodos para iniciar y administrar la aplicación.

***

### Importaciones

```typescript
import chalk from "chalk";

import { APIClient } from "@backend/express";
import { EnvConfig } from "@helpers/envconfig";
import { Cache } from "@lib/class/cache";
import { BotClient } from "@modules/discord/class/client";
import { WhatsApp } from "@modules/whatsapp/whatsapp";
import { PrismaClient } from "@prisma/client";
import { logWithLabel } from "@utils/log";
```

La clase importa diversas utilidades y clases de clientes necesarias para gestionar la aplicación, así como la biblioteca `chalk` para la salida de texto coloreada en la consola.

***

### Definición de la Clase

```typescript
export class AppManager {
```

La clase `AppManager` se exporta como una clase pública para ser utilizada en otras partes del proyecto.

***

### Propiedades

#### prisma

```typescript
public prisma: PrismaClient;
```

* **Descripción:** Esta es una instancia del cliente ORM de Prisma utilizado para interactuar con la base de datos.
* **Tipo:** `PrismaClient`
* **Uso:** La propiedad `prisma` es accesible públicamente y permite a la aplicación realizar operaciones en la base de datos.

#### discord

```typescript
private discord: BotClient;
```

* **Descripción:** Esta propiedad contiene una instancia de la clase `BotClient`, que gestiona la interacción con la API de Discord.
* **Tipo:** `BotClient`
* **Uso:** La propiedad `discord` es privada y se utiliza internamente dentro de la clase.

#### whatsapp

```typescript
private whatsapp: WhatsApp;
```

* **Descripción:** Esta propiedad contiene una instancia de la clase `WhatsApp`, que gestiona la interacción con la API de WhatsApp.
* **Tipo:** `WhatsApp`
* **Uso:** La propiedad `whatsapp` es privada y se utiliza internamente dentro de la clase.

#### backend

```typescript
private backend: APIClient;
```

* **Descripción:** Esta propiedad contiene una instancia de la clase `APIClient`, que es responsable de gestionar el servidor Express.
* **Tipo:** `APIClient`
* **Uso:** La propiedad `backend` es privada y se utiliza internamente dentro de la clase para iniciar el servidor API.

#### cache

```typescript
public cache: Cache;
```

* **Descripción:** Esta propiedad contiene una instancia de la clase `Cache`, que gestiona el almacenamiento en memoria para la aplicación.
* **Tipo:** `Cache`
* **Uso:** La propiedad `cache` es accesible públicamente y se puede utilizar para almacenar y recuperar datos rápidamente sin realizar consultas a la base de datos.

***

### Constructor

```typescript
constructor() {
  this.discord = new BotClient();
  this.whatsapp = new WhatsApp();
  this.backend = new APIClient();

  this.cache = new Cache();
  this.prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
}
```

El constructor inicializa las propiedades de la clase `AppManager`:

* **Bot de Discord:** Inicializa una instancia de la clase `BotClient`.
* **Cliente de WhatsApp:** Inicializa una instancia de la clase `WhatsApp`.
* **Servidor Express:** Inicializa una instancia de la clase `APIClient`.
* **Gestor de Caché:** Inicializa una instancia de la clase `Cache`.
* **Cliente de Base de Datos:** Inicializa una instancia de la clase `PrismaClient` con opciones de registro de logs.

***

### Métodos

#### login()

```typescript
public async login(): Promise<BotClient> {
  this.discord._login().then(async () => {
    logWithLabel(
      "custom",
      [
        `Time the application was recorded within discord`,
        `🤖 ${chalk.magenta(new Date().toLocaleString() + " UTC")}`,
      ].join("\n"),
      "App"
    );
  });

  return this.discord;
}
```

* **Descripción:** Inicia sesión del bot en Discord utilizando la clase `BotClient`.
* **Devuelve:** Una `Promise` que se resuelve con una instancia de `BotClient`.
* **Uso:** Este método se utiliza para autenticar el bot de Discord y registrar en la consola el momento en que se completó la sesión.
* **Registro de Logs:** Utiliza la utilidad `logWithLabel` para registrar un mensaje personalizado en la consola, incluyendo la marca de tiempo de inicio de sesión.

#### apps()

```typescript
public async apps(): Promise<BotClient> {
  this.backend.start(Number(EnvConfig().port) || 3000);
  this.whatsapp.start();
  this.login();

  return this.discord;
}
```

* **Descripción:** Inicia todos los servicios principales de la aplicación:
  * **Servidor Express** mediante la clase `APIClient`.
  * **Cliente de WhatsApp** mediante la clase `WhatsApp`.
  * **Bot de Discord** mediante la clase `BotClient`.
* **Devuelve:** Una `Promise` que se resuelve con una instancia de `BotClient`.
* **Uso:** Este método es el punto de entrada para iniciar toda la aplicación. Lanza el servidor API Express, el cliente de WhatsApp y registra al bot de Discord en la API.

***

### Ejemplo de Uso

```typescript
const appManager = new AppManager();
appManager.apps().then(() => {
  console.log("Todos los servicios se han iniciado correctamente.");
});
```

En este ejemplo, se crea una instancia de `AppManager` y se llama al método `apps` para iniciar todos los servicios principales de la aplicación. Una vez que los servicios están en ejecución, se registra un mensaje de éxito en la consola.

***

### Dependencias y Utilidades

* **chalk:** Utilizado para la salida de texto coloreada en la consola.
* **APIClient:** Gestiona el servidor Express.
* **EnvConfig:** Proporciona la configuración del entorno.
* **Cache:** Gestiona el almacenamiento en memoria.
* **BotClient:** Gestiona el bot de Discord.
* **WhatsApp:** Gestiona el cliente de WhatsApp.
* **PrismaClient:** Gestiona las interacciones con la base de datos.
* **logWithLabel:** Utilidad para registrar mensajes etiquetados en la consola.

***

### Resumen

La clase `AppManager` es una parte crítica de la aplicación, responsable de inicializar y gestionar los servicios principales necesarios para que la aplicación funcione. Simplifica el proceso de iniciar la aplicación encapsulando la lógica para iniciar el bot de Discord, el cliente de WhatsApp, el servidor API Express y el gestor de caché en una sola clase centralizada.

## Documentación de la Clase Cache

### Descripción General

La clase `Cache` es responsable de gestionar el almacenamiento en caché de datos relacionados con doujinshi (mangas autónomos publicados). Proporciona métodos para almacenar y recuperar información de una base de datos mediante Prisma ORM.

La clase incluye funcionalidades para:

* Recuperar entradas de doujinshi y sus etiquetas asociadas.
* Agregar nuevas entradas de doujinshi a la base de datos.
* Seleccionar aleatoriamente un doujinshi, excluyendo aquellos que tienen etiquetas prohibidas.

***

### Importaciones

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */

import { manager } from "@/index";
import { Gallery, PartialGallery } from "@typings/nhentai/nhentai";
import { logWithLabel } from "@utils/log";

import { BANNED_TAGS } from "../../modules/nhentai/types/constants";
```

La clase utiliza el cliente Prisma y algunos tipos personalizados para interactuar con la base de datos, así como una función de utilidad para registrar mensajes en la consola.

***

### Métodos

#### doujinBase(id: number)

```typescript
async doujinBase(id: number) {
  return await manager.prisma.doujinshi.findUnique({
    where: { id },
    include: { tags: { include: { tag: true } } },
  });
}
```

**Descripción:** Recupera una entrada de doujinshi de la base de datos basada en su ID, incluyendo las etiquetas asociadas.

**Parámetros:**

* `id` (number): El ID único del doujinshi que se desea recuperar.

**Retorno:**

* Una promesa que resuelve con un objeto doujinshi que incluye sus etiquetas.

***

#### getDoujinTags()

```typescript
async getDoujinTags() {
  return await manager.prisma.tag.findMany({
    select: { name: true, type: true },
  });
}
```

**Descripción:** Recupera y devuelve una lista de etiquetas con sus nombres y tipos.

**Retorno:**

* Una promesa que resuelve con un array de objetos que contienen las propiedades `name` y `type`.

***

#### getDoujin(id: number)

```typescript
async getDoujin(id: number): Promise<PartialGallery | null> {
  const doujin = await this.doujinBase(id);
  if (!doujin) return null;
  const {
    mediaId,
    titleJapanese,
    titleEnglish,
    titlePretty,
    uploadDate,
    numPages,
    numFavourites,
    coverType,
    thumbType,
    tags,
  } = doujin;
  const reformatTags = tags.map(({ tag }) => ({
    id: tag.id,
    name: tag.name,
    type: tag.type,
    count: tag.count,
  }));
  return {
    id,
    media_id: mediaId,
    title: {
      japanese: titleJapanese as string,
      english: titleEnglish as string,
      pretty: titlePretty as string,
    },
    upload_date: Math.floor(uploadDate.getTime() / 1000),
    tags: reformatTags as any,
    num_pages: numPages,
    num_favorites: numFavourites,
    images: { cover: { t: coverType as any }, thumbnail: { t: thumbType as any } },
  };
}
```

**Descripción:** Recupera y reformatea la información de un doujin basado en su ID.

**Parámetros:**

* `id` (number): El ID del doujin que se desea recuperar.

**Retorno:**

* Una promesa que resuelve con un objeto `PartialGallery` o `null` si no se encuentra el doujin.

***

#### addDoujin(doujin: Gallery)

```typescript
async addDoujin(doujin: Gallery) {
  if (Date.now() - doujin.upload_date * 1000 < 1000 * 60 * 60 * 24) return;
  try {
    await this.addDoujinTransaction(doujin);
  } catch (err) {
    throw err;
  }
}
```

**Descripción:** Agrega un doujin a la base de datos si fue subido hace más de 24 horas.

**Parámetros:**

* `doujin` (Gallery): Objeto que representa un doujinshi.

**Retorno:**

* Ninguno.

***

#### addDoujinTransaction(doujin: Gallery)

```typescript
private async addDoujinTransaction(doujin: Gallery) {
  const { id, media_id, title, upload_date, num_pages, num_favorites, tags, images } = doujin;
  const { japanese, english, pretty } = title;

  if (!id || !media_id) return;
  if (typeof id !== "number") return;

  if (!tags.every((tag: { id: any }) => tag.id)) {
    logWithLabel("cache", `Doujin ${id} has invalid tags, skipping...`);
    return;
  }
  await manager.prisma.$transaction(async (prisma) => {
    await prisma.doujinshi.upsert({
      where: {
        id: id,
        mediaId: media_id as string,
      },
      update: {
        mediaId: media_id as string,
        titleJapanese: japanese ?? "",
        titleEnglish: english ?? "",
        titlePretty: pretty ?? "",
        uploadDate: new Date(upload_date * 1000),
        numPages: num_pages ?? 0,
        numFavourites: num_favorites ?? 0,
        coverType: images.cover.t,
        thumbType: images.thumbnail.t,
      },
      create: {
        id: id,
        mediaId: media_id as string,
        titleJapanese: japanese ?? "",
        titleEnglish: english ?? "",
        titlePretty: pretty ?? "",
        uploadDate: new Date(upload_date * 1000),
        numPages: num_pages ?? 0,
        numFavourites: num_favorites ?? 0,
        coverType: images.cover.t,
        thumbType: images.thumbnail.t,
        tags: {
          create: tags.map(
            (tag: { id: any; name: any; type: any; count: any }, index: number) =>
              ({
                id: index + 1,
                tag: {
                  connectOrCreate: {
                    where: { id: tag.id },
                    create: {
                      id: tag.id,
                      name: tag.name,
                      type: tag.type,
                      count: tag.count,
                    },
                  },
                },
              }) as any
          ),
        },
      },
    });
  });
}
```

**Descripción:** Agrega un doujin de forma transaccional a la base de datos utilizando Prisma.

**Parámetros:**

* `doujin` (Gallery): Objeto que representa un doujinshi.

**Retorno:**

* Ninguno.

***

#### random()

```typescript
async random() {
  const doujinshi = await manager.prisma.doujinshi.findMany({
    select: { id: true },
    distinct: ["id"],
  });
  if (!doujinshi.length) return null;
  const randomDoujin = doujinshi[Math.floor(Math.random() * doujinshi.length)];
  return randomDoujin.id;
}
```

**Descripción:** Recupera un ID aleatorio único de la lista de doujinshi disponibles.

**Retorno:**

* El ID de un doujinshi seleccionado aleatoriamente.

***

#### safeRandom(banned: boolean)

```typescript
async safeRandom(banned: boolean) {
  const tagsToExclude = [...(banned ? ["0"] : BANNED_TAGS)];

  const doujinshiTags = await manager.prisma.doujinshiTag.findMany({
    where: {
      tagId: { notIn: tagsToExclude.map(Number) },
    },
    select: { doujinshiId: true },
    distinct: ["doujinshiId"],
  });

  if (!doujinshiTags.length) return null;
  const randomDoujin = doujinshiTags[Math.floor(Math.random() * doujinshiTags.length)];
  return randomDoujin.doujinshiId;
}
```

**Descripción:** Recupera un ID aleatorio de doujinshi, excluyendo aquellos que tienen etiquetas prohibidas.

**Parámetros:**

* `banned` (boolean): Indica si se deben excluir las etiquetas prohibidas o solo la etiqueta con ID "0".

**Retorno:**

* El ID de un doujinshi que no tiene etiquetas prohibidas, o `null` si no hay doujinshi disponibles que cumplan con los criterios.

***

### Resumen

La clase `Cache` es esencial para optimizar el rendimiento de la aplicación mediante el almacenamiento en caché de datos frecuentemente utilizados. Proporciona métodos para recuperar y almacenar información de doujinshi de forma eficiente, además de ofrecer funcionalidad para seleccionar doujinshi aleatorios excluyendo
