---
description: documentación de las principales clases dentro de la aplicación
---

# Clases

## BotCore

La clase cliente del bot principal que extiende `Client` de Discord.js. Esta clase funciona como el núcleo del bot y administra comandos, eventos, controladores, bases de datos y métodos de utilidad.

### Extiende

* `Client`

### Constructores

#### new BotCore()

```ts
new BotCore(): BotCore
```

Inicializa una nueva instancia de la clase BotCore. Configura las opciones del cliente, las intenciones y los detectores de eventos.

**Devuelve**

`BotCore`

**Anulaciones**

`Client.constructor`

**Definido en**

[src/apps/class/client.ts:205](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L205)

### Propiedades

#### complementos

```ts
addons: Collection<unknown, unknown>;
```

Colección de complementos.

**Definido en**

[src/apps/class/client.ts:90](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L90)

***

#### alias

```ts
aliases: Collection<string, string>;
```

Colección de alias de comandos.

**Definido en**

[src/apps/class/client.ts:115](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L115)

***

#### animelist

```ts
animelist: AnimeList;
```

El administrador de listas de anime para manejar datos relacionados con el anime.

**Definido en**

[src/apps/class/client.ts:142](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L142)

***

#### aplicación

```ts
application: null | ClientApplication;
```

**Heredado de**

`Client.application`

***

#### botones

```ts
botones: Collection<string, Buttons>;
```

Colección de botones registrados.

**Definido en**

[src/apps/class/client.ts:58](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L58)

***

#### caché

```ts
cache: caché;
```

Controlador de caché para datos de bot.

**Definido en**

[src/apps/class/client.ts:182](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L182)

***

#### categorías

```ts
categorías: Collection<string, string[]>;
```

Colección de categorías de comandos, donde cada clave es un nombre de categoría y su valor es una matriz de nombres de comandos.

**Definido en**

[src/apps/class/client.ts:42](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L42)

***

#### canales

```ts
canales: ChannelManager;
```

**Heredado de**

`Client.channels`

***

#### comandos

```ts
comandos: Collection<string, Command>;
```

Colección de comandos de bot registrados.

**Definido en**

[src/apps/class/client.ts:50](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L50)

***

#### tiempo de reutilización

```ts
cooldown: Map<string, number>;
```

Mapa de tiempos de reutilización activos para comandos.

**Definido en**

[src/apps/class/client.ts:123](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L123)

***

#### datos

```ts
datos: cualquiera;
```

**Definido en**

[src/apps/class/client.ts:199](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L199)

***

#### embed()

```ts
embed: (embedData) => EmbedBuilder;
```

Método de utilidad para generar un mensaje de incrustación.

**Parámetros**

• **embedData**: `EmbedResolver`

Los datos para crear una incrustación.

**Devuelve**

`EmbedBuilder`

**Definido en**

[src/apps/class/client.ts:98](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L98)

***

#### incrustaciones

```ts
incrustaciones: incrustaciones;
```

Utilidad de controlador de incrustaciones.

**Definido en**

[src/apps/class/client.ts:174](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L174)

***

#### fuentes

```ts
fonts: Fuentes;
```

Administrador de fuentes para la representación de texto.

**Definido en**

[src/apps/class/client.ts:190](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L190)

***

#### getEmoji()

```ts
getEmoji: (guildId) => any;
```

Método de utilidad para obtener un emoji por ID de gremio.

**Parámetros**

• **guildId**: `string`

El ID de gremio del que se recuperará el emoji.

**Devuelve**

`any`

***

#### guilds

```ts
guilds: GuildManager;
```

**Heredado de**

`Client.guilds`

***

#### handlers

```ts
handlers: Handler;
```

Manejadores para administrar varios procesos de bot.

**Definido en**

[src/apps/class/client.ts:166](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L166)

***

#### menús

```ts
menus: Collection<string, Menus>;
```

Colección de menús seleccionados.

**Definido en**

[src/apps/class/client.ts:74](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L74)

***

#### modales

```ts
modals: Collection<string, Modals>;
```

Colección de modales registrados.

**Definido en**

[src/apps/class/client.ts:66](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L66)

***

#### nhentai

```ts
nhentai: NhentaiAPI;
```

Cliente API para servicios nhentai.

**Definido en**

[src/apps/class/client.ts:158](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L158)

***

#### opciones

```ts
opciones: Omit<ClientOptions, "intents"> & object;
```

**Declaración de tipo**

**intenciones**

```ts
intents: IntentsBitField;
```

**Heredado de**

`Client.options`

***

#### paginadores

```ts
paginadores: Collection<string, Paginator>;
```

**Definido en**

[src/apps/class/client.ts:126](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L126)

***

#### precomandos

```ts
precomandos: Collection<string, unknown>;
```

Colección de comandos precargados.

**Definido en**

[src/apps/class/client.ts:82](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L82)

***

#### prisma

```ts
prisma: PrismaClient<PrismaClientOptions, never, DefaultArgs>;
```

Cliente Prisma para acceso a la base de datos.

**Definido en**

[src/apps/class/client.ts:134](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L134)

***

#### readyTimestamp

```ts
readyTimestamp: null | number;
```

**Heredado de**

`Client.readyTimestamp`

***

#### resto

```ts
resto: REST;
```

**Heredado de**

`Client.rest`

***

#### fragmento

```ts
fragmento: null | ShardClientUtil;
```

**Heredado de**

`Client.shard`

***

#### usuario

```ts
usuario: null | ClientUser;
```

**Heredado de**

`Client.user`

***

#### users

```ts
users: UserManager;
```

**Heredado de**

`Client.users`

***

#### util

```ts
util: Util;
```

Administrador de utilidades para varias funciones auxiliares.

**Definido en**

[src/apps/class/client.ts:198](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L198)

***

#### voice

```ts
voice: ClientVoiceManager;
```

**Heredado de**

`Client.voice`

***

#### voiceGenerator

```ts
voiceGenerator: any;
```

Generador de voz para funciones relacionadas con la voz.

**Definido en**

[src/apps/class/client.ts:150](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/client.ts#L150)

***

#### ws

```ts
ws: WebSocketManager;
```

**Heredado de**

`Client.ws`

### Accesores

#### emojis

```ts
get emojis(): BaseGuildEmojiManager
```

**Devuelve**

`BaseGuildEmojiManager`

**Heredado de**

`Client.emojis`

***

#### readyAt

```ts
get readyAt(): If<Ready, Date, null>
```

**Devuelve**

`If`<`Ready`, `Date`, `null`>

**Heredado de**

`Client.readyAt`

***

#### uptime

```ts
get uptime(): If<Ready, number, null>
```

**Devuelve**

`If`<`Ready`, `number`, `null`>

**Heredado de**

`Client.uptime`

### Métodos

#### \[asyncDispose]\()

```ts
asyncDispose: Promise<void>
```

**Devuelve**

`Promise`<`void`>

**Heredado de**

`Client.[asyncDispose]`

***

#### deleteWebhook()

```ts
deleteWebhook(id, options?): Promise<void>
```

**Parámetros**

• **id**: `string`

• **opciones?**: `WebhookDeleteOptions`

**Devuelve**

`Promise`<`void`>

**Heredado de**

`Client.deleteWebhook`

***

#### destroy()

```ts
destroy(): Promise<void>
```

**Devuelve**

`Promise`<`void`>

**Heredado de**

`Client.destroy`

***

#### emit()

**emit(event, args)**

```ts
emit<Event>(event, ...args): booleano
```

**Parámetros de tipo**

• **Evento** _extiende_ la clave de `ClientEvents`

**Parámetros**

• **event**: `Evento`

• ...**args**: `ClientEvents`\[`Evento`]

**Devuelve**

`booleano`

**Heredado de**

`Client.emit`

**emit(event, args)**

```ts
emit<Event>(event, ...args): booleano
```

**Parámetros de tipo**

• **Evento** _extiende_ `string` | `símbolo`

**Parámetros**

• **evento**: `Exclude`<`Evento`, clave de `ClientEvents`>

• ...**args**: `unknown`\[]

**Devuelve**

`booleano`

**Heredado de**

`Client.emit`

***

#### fetchGuildPreview()

```ts
fetchGuildPreview(guild): Promise<GuildPreview>
```

**Parámetros**

• **guild**: `GuildResolvable`

**Devuelve**

`Promise`<`GuildPreview`>

**Heredado de**

`Client.fetchGuildPreview`

***

#### fetchGuildTemplate()

```ts
fetchGuildTemplate(plantilla): Promise<GuildTemplate>
```

**Parámetros**

• **plantilla**: `string`

**Devuelve**

`Promise`<`GuildTemplate`>

**Heredado de**

`Client.fetchGuildTemplate`

***

#### fetchGuildWidget()

```ts
fetchGuildWidget(guild): Promise<Widget>
```

**Parámetros**

• **guild**: `GuildResolvable`

**Devuelve**

`Promise`<`Widget`>

**Heredado de**

`Client.fetchGuildWidget`

***

#### fetchInvite()

```ts
fetchInvite(invite, options?): Promise<Invite>
```

**Parámetros**

• **invite**: `string`

• **options?**: `ClientFetchInviteOptions`

**Devuelve**

`Promise`<`Invite`>

**Heredado de**

`Client.fetchInvite`

***

#### ~~fetchPremiumStickerPacks()~~

```ts
fetchPremiumStickerPacks(): Promise<Collection<string, StickerPack>>
```

**Devuelve**

`Promise`<`Collection`<`string`, `StickerPack`>>

**Obsoleto**

Use Client.fetchStickerPacks en su lugar.

**Heredado de**

`Client.fetchPremiumStickerPacks`

***

#### fetchSticker()

```ts
fetchSticker(id): Promise<Sticker>
```

**Parámetros**

• **id**: `string`

**Devuelve**

`Promise`<`Sticker`>

**Heredado de**

`Client.fetchSticker`

***

#### fetchStickerPacks()

```ts
fetchStickerPacks(): Promise<Collection<string, StickerPack>>
```

**Devuelve**

`Promise`<`Collection`<`string`, `StickerPack`>>

**Heredado de**

`Client.fetchStickerPacks`

***

#### fetchVoiceRegions()

```ts
fetchVoiceRegions(): Promise<Collection<string, VoiceRegion>>
```

**Devuelve**

`Promise`<`Collection`<`string`, `VoiceRegion`>>

**Heredado de**

`Client.fetchVoiceRegions`

***

#### fetchWebhook()

```ts
fetchWebhook(id, token?): Promise<Webhook<WebhookType>>
```

**Parámetros**

• **id**: `string`

• **token?**: `string`

**Devuelve**

`Promise`<`Webhook`<`WebhookType`>>

**Heredado de**

`Client.fetchWebhook`

***

#### generateInvite()

```ts
generateInvite(options?): string
```

**Parámetros**

• **opciones?**: `InviteGenerationOptions`

**Devuelve**

`string`

**Heredado de**

`Client.generateInvite`

***

#### isReady()

```ts
isReady(): este es Client<true>
```

**Devuelve**

`este es Client<true>`

**Heredado de**

`Client.isReady`

***

#### login()

```ts
login(token?): Promise<string>
```

**Parámetros**

• **token?**: `string`

**Devuelve**

`Promise`<`string`>

**Heredado de**

`Client.login`

***

#### off()

**off(event, listener)**

```ts
off<Event>(event, listener): this
```

**Parámetros de tipo**

• **Evento** _extiende_ keyof `ClientEvents`

**Parámetros**

• **event**: `Event`

• **listener**

**Devuelve**

`this`

**Heredado de**

`Client.off`

**off(event, listener)**

```ts
off<Event>(event, listener): this
```

**Parámetros de tipo**

• **Evento** _extiende_ `string` | `símbolo`

**Parámetros**

• **evento**: `Exclude`<`Evento`, keyof `ClientEvents`>

• **escucha**

**Devuelve**

`this`

**Heredado de**

`Client.off`

***

#### on()

**on(evento, escucha)**

```ts
on<Evento>(evento, escucha): this
```

**Parámetros de tipo**

• **Evento** _extiende_ keyof `ClientEvents`

**Parámetros**

• **evento**: `Evento`

• **escucha**

**Devuelve**

`this`

**Heredado de**

`Client.on`

**on(event, listener)**

```ts
on<Event>(event, listener): this
```

**Parámetros de tipo**

• **Event** _extiende_ `string` | `símbolo`

**Parámetros**

• **evento**: `Exclude`<`Evento`, keyof `ClientEvents`>

• **escucha**

**Devuelve**

`this`

**Heredado de**

`Client.on`

***

#### once()

**once(evento, escucha)**

```ts
once<Evento>(evento, escucha): this
```

**Parámetros de tipo**

• **Evento** _extiende_ keyof `ClientEvents`

**Parámetros**

• **evento**: `Evento`

• **escucha**

**Devuelve**

`this`

**Heredado de**

`Client.once`

**once(event, listener)**

```ts
once<Event>(event, listener): this
```

**Parámetros de tipo**

• **Event** _extiende_ `string` | `símbolo`

**Parámetros**

• **evento**: `Exclude`<`Evento`, keyof `ClientEvents`>

• **escucha**

**Devuelve**

`this`

**Heredado de**

`Client.once`

***

#### removeAllListeners()

**removeAllListeners(evento)**

```ts
removeAllListeners<Event>(evento?): this
```

**Parámetros de tipo**

• **Evento** _extiende_ keyof `ClientEvents`

**Parámetros**

• **evento?**: `Evento`

**Devuelve**

`this`

**Heredado de**

`Client.removeAllListeners`

**removeAllListeners(event)**

```ts
removeAllListeners<Event>(event?): this
```

**Parámetros de tipo**

• **Event** _extiende_ `string` | `symbol`

**Parámetros**

• **event?**: `Exclude`<`Event`, keyof `ClientEvents`>

**Devuelve**

`this`

**Heredado de**

`Client.removeAllListeners`

***

#### start()

```ts
start(token): Promise<void>
```

Inicia el bot iniciando sesión con el token proporcionado e inicializando los controladores y servicios.

**Parámetros**

• **token**: `string`

El token de inicio de sesión del bot.

**Devuelve**

`Promise`<`void`>

***

#### toJSON()

```ts
toJSON(): desconocido
```

**Devuelve**

`unknown`

**Heredado de**

`Client.toJSON`

***

#### on()

```ts
static on<Emitter, Events>(eventEmitter, eventName): AsyncIterableIterator<Emitter extiende Client<boolean> ? ClientEvents[Events] : any>
```

**Parámetros de tipo**

• **Emitter** _extiende_ `EventEmitter`

• **Events** _extiende_ keyof `ClientEvents`

**Parámetros**

• **eventEmitter**: `Emitter`

• **eventName**: `Emitter` _extiende_ `Client`<`boolean`> ? `Events` : `string`

**Devuelve**

`AsyncIterableIterator`<`Emitter` _extiende_ `Client`<`boolean`> ? `ClientEvents`\[`Events`] : `any`>

**Heredado de**

`Client.on`

***

#### once()

```ts
static once<Emitter, Event>(eventEmitter, eventName): Promise<Emitter extiende Client<boolean> ? ClientEvents[Event] : any[]>
```

**Parámetros de tipo**

• **Emitter** _extiende_ `EventEmitter`

• **Event** _extiende_ keyof `ClientEvents`

**Parámetros**

• **eventEmitter**: `Emitter`

• **eventName**: `Emitter` _extiende_ `Client`<`boolean`> ? `Event` : `string`

**Devuelve**

`Promise`<`Emitter` _extiende_ `Client`<`boolean`> ? `ClientEvents`\[`Event`] : `any`\[]>

**Heredado de**

`Client.once`

## Cache

### Constructores

#### new Cache()

```ts
new Cache(): Cache
```

**Devuelve**

`Cache`

### Métodos

#### addDoujin()

```ts
addDoujin(doujin): Promise<void>
```

La función `addDoujin` agrega un doujin (galería) a una colección si se cargó hace más de 24 horas.

**Parámetros**

• **doujin**: `Gallery`

El parámetro `doujin` es del tipo `Gallery`, que probablemente representa una galería o colección de doujinshi (trabajos autopublicados como manga o novelas). La función `addDoujin` es una función asincrónica que verifica si el objeto `doujin` tiene la fecha de carga @returns Si la condición `Date.now() - doujin.upload_date * 1000 < 1000 * 60 * 60 * 24` es verdadera, no se devolverá nada ya que la función saldrá antes debido a la declaración `return`. Si la condición es falsa, la función procederá al bloque `try` y esperará la función `addDoujinTransaction`.

**Devuelve**

`Promise`<`void`>

**Definido en**

[src/apps/class/cache.ts:94](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/cache.ts#L94)

***

#### doujinBase()

```ts
doujinBase(id): Promise<null | object & object>
```

Esta función TypeScript recupera una entrada doujinshi de una base de datos por su ID, incluidas las etiquetas asociadas.

**Parámetros**

• **id**: `number`

El parámetro `id` es un número que representa el identificador único de un doujinshi en la base de datos. La función `doujinBase` es una función asincrónica que recupera una entrada doujinshi de la base de datos en función del `id` proporcionado. Utiliza el cliente Prisma para consultar la base de datos

**Devuelve**

`Promise`<`null` | `object` & `object`>

La función `doujinBase` devuelve una Promesa que se resuelve en un único objeto doujinshi con el `id` especificado, incluidas sus etiquetas asociadas con el campo `tag` incluido.

**Definido en**

[src/apps/class/cache.ts:20](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/cache.ts#L20)

***

#### getDoujin()

```ts
getDoujin(id): Promise<null | PartialGallery>
```

La función `getDoujin` recupera y reformatea información sobre un doujin en función de su ID.

**Parámetros**

• **id**: `number`

La función `getDoujin` es una función asincrónica que toma un parámetro `id` de tipo número. Recupera información sobre un doujin (un tipo de manga o cómic japonés) en función del `id` proporcionado. La función devuelve una Promesa que se resuelve en un objeto PartialGallery o null si

**Devuelve**

`Promise`<`null` | `PartialGallery`>

La función `getDoujin` devuelve una Promesa que se resuelve en un objeto `PartialGallery` o `null`. El objeto `PartialGallery` contiene propiedades como `id`, `media_id`, `title`, `upload_date`, `tags`, `num_pages`, `num_favorites` e `images`. La función obtiene datos para un doujin en función del `id` proporcionado, reform

**Definido en**

[src/apps/class/cache.ts:50](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/cache.ts#L50)

***

#### getDoujinTags()

```ts
getDoujinTags(): Promise<object[]>
```

La función `getDoujinTags` recupera y devuelve de forma asincrónica etiquetas con sus nombres y tipos desde un cliente Prisma.

**Devuelve**

`Promise`<`object`\[]>

La función `getDoujinTags` devuelve una matriz de objetos con las propiedades `name` y `type` seleccionadas de las etiquetas en la base de datos Prisma.

**Definido en**

[src/apps/class/cache.ts:33](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/cache.ts#L33)

***

#### random()

```ts
random(): Promise<null | number>
```

La función `random` recupera de forma asincrónica un ID único aleatorio de una lista de doujinshi utilizando el cliente Prisma en TypeScript.

**Devuelve**

`Promise`<`null` | `number`>

La función `random()` devuelve el `id` de un doujinshi seleccionado aleatoriamente de la lista de doujinshi extraídos de la base de datos.

**Definido en**

[src/apps/class/cache.ts:184](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/cache.ts#L184)

***

#### safeRandom()

```ts
safeRandom(banned): Promise<null | number>
```

Esta función TypeScript recupera de forma asincrónica un ID de doujinshi aleatorio mientras excluye las etiquetas prohibidas.

**Parámetros**

• **banned**: `boolean`

El parámetro `banned` es un indicador booleano que determina si ciertas etiquetas deben excluirse del proceso de selección aleatoria. Si `banned` es `true`, la etiqueta con ID '0' será excluida. De lo contrario, las etiquetas especificadas en la constante `BANNED_TAGS` serán

**Devuelve**

`Promise`<`null` | `number`>

La función `safeRandom` devuelve el `doujinshiId` de un doujinshi aleatorio que no tiene ninguna etiqueta prohibida asociada a él. Si no hay doujinshi. Si cumple con los criterios, devuelve `null`.

**Definido en**

[src/apps/class/cache.ts:203](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/cache.ts#L203)

## DiscordLogger

La clase `DiscordLogger` es una clase que te permite registrar eventos en la biblioteca Discord.js. es una clase que te permite registrar eventos en la biblioteca Discord.js.

### Constructores

#### new DiscordLogger()

```ts
new DiscordLogger(events, client): DiscordLogger
```

La función constructora toma una matriz de tipos de eventos y un cliente BotCore como parámetros.

**Parámetros**

• **eventos**: (| `"Error"` | `"Debug"` | `"Warn"` | `"ApplicationCommandPermissionsUpdate"` | `"AutoModerationActionExecution"` | `"AutoModerationRuleCreate"` | `"AutoModerationRuleDelete"` | `"AutoModerationRuleUpdate"` | `"ClientReady"` | `"EntitlementCreate"` | `"EntitlementDelete"` | `"EntitlementUpdate"` | `"GuildAuditLogEntryCreate"` | `"GuildAvailable"` | `"GuildCreate"` | `"GuildDelete"` | `"GuildUpdate"` | `"GuildUnavailable"` | `"GuildMemberAdd"` | `"GuildMemberRemove"` | `"GuildMemberUpdate"` | `"GuildMemberAvailable"` | `"GuildMembersChunk"` | `"GuildIntegrationsUpdate"` | `"GuildRoleCreate"` | `"GuildRoleDelete"` | `"InviteCreate"` | `"InviteDelete"` | `"GuildRoleUpdate"` | `"GuildEmojiCreate"` | `"GuildEmojiDelete"` | `"GuildEmojiUpdate"` | `"GuildBanAdd"` | `"GuildBanRemove"` | `"ChannelCreate"` | `"ChannelDelete"` | `"ChannelUpdate"` | `"ChannelPinsUpdate"` | `"MessageCreate"` | `"MessageDelete"` | `"MessageUpdate"` | `"MessageBulkDelete"` | `"MessagePollVoteAdd"` | `"MessagePollVoteRemove"` | `"MessageReactionAdd"` | `"MessageReactionRemove"` | `"MessageReactionRemoveAll"` | `"MessageReactionRemoveEmoji"` | `"ThreadCreate"` | `"ThreadDelete"` | `"ThreadUpdate"` | `"ThreadListSync"` | `"ThreadMemberUpdate"` | `"ThreadMembersUpdate"` | `"UserUpdate"` | `"PresenceUpdate"` | `"VoiceServerUpdate"` | `"VoiceStateUpdate"` | `"TypingStart"` | `"WebhooksUpdate"` | `"InteractionCreate"` | `"CacheSweep"` | `"ShardDisconnect"` | `"ShardError"` | `"ShardReconnecting"` | `"ShardReady"` | `"ShardResume"` | `"Invalidated"` | `"Raw"` | `"StageInstanceCreate"` | `"StageInstanceUpdate"` | `"StageInstanceDelete"` | `"GuildStickerCreate"` | `"GuildStickerDelete"` | `"GuildStickerUpdate"` | `"GuildScheduledEventCreate"` | `"GuildScheduledEventUpdate"` | `"GuildScheduledEventDelete"` | `"GuildScheduledEventUserAdd"` | `"GuildScheduledEventUserRemove"`)\[]

El parámetro `events` es una matriz que contiene claves del tipo `Events`.

• **client**: `BotCore`

El parámetro `client` en el constructor es una instancia de la clase `BotCore`. Es probable que se utilice para interactuar con las funcionalidades y servicios básicos del bot dentro de la clase donde se define este constructor.

**Devuelve**

`DiscordLogger`

**Definido en**

[src/apps/class/loggers.ts:27](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/loggers.ts#L27)

### Métodos

#### init()

```ts
init(): any
```

La función inicializa los detectores de eventos para varias acciones y registra la información correspondiente en un formato estructurado.

**Devuelve**

`any`

**Definido en**

[src/apps/class/loggers.ts:36](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/loggers.ts#L36)

## Addons

Clase que representa un complemento en el sistema del bot. Esta clase define la estructura y el comportamiento de inicialización de un complemento.

### Ejemplo

```ts
const addon = new Addons(addonStructure, (client, config) => {
// Código de inicialización para el complemento
});

@class
```

### Constructores

#### new Addons()

```ts
new Addons(structure, initialize): Addons
```

Crea una instancia de Addons.

**Parámetros**

• **structure**: `AddonConfig`

La estructura de configuración del complemento.

• **initialize**

La función de inicialización que configura el complemento, que toma un cliente `BotCore` y un objeto de configuración.

**Devuelve**

`Addons`

**Definido en**

[src/apps/class/addons.ts:40](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/addons.ts#L40)

### Propiedades

#### initialize()

```ts
readonly initialize: (client, configuration) => void;
```

Una función que inicializa el complemento con el cliente y la configuración proporcionados.

**Parámetros**

• **cliente**: `BotCore`

• **configuración**: `ConfigType`

**Devuelve**

`void`

**Definido en**

[src/apps/class/addons.ts:24](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/addons.ts#L24)

***

#### estructura

```ts
estructura de solo lectura: AddonConfig;
```

La estructura que define la configuración del complemento.

**Definido en**

[src/apps/class/addons.ts:32](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/apps/class/addons.ts#L32)

## ApiClient

La clase `ApiClient` es responsable de configurar una aplicación Express, crear un servidor HTTP y establecer una conexión socket.io. También crea una instancia de la clase `StatusMonitor` y la monta

### Constructores

#### new ApiClient()

```ts
new ApiClient(): ApiClient
```

El constructor inicializa la aplicación Express, crea un servidor HTTP y configura la conexión socket.io. También crea una instancia de la clase `StatusMonitor` y la monta en la aplicación Express.

**Devuelve**

`ApiClient`

**Ejemplo**

```typescript
const api = new ApiClient();
api.start(3000);
```

**Definido en**

[src/backend/express.ts:40](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/backend/express.ts#L40)

### Propiedades

#### aplicación

```ts
app: Aplicación;
```

**Definido en**

[src/backend/express.ts:24](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/backend/express.ts#L24)

***

#### io

```ts
io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, cualquiera>;
```

**Definido en**

[src/backend/express.ts:26](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/backend/express.ts#L26)

***

#### servidor

```ts
servidor: cualquiera;
```

**Definido en**

[src/backend/express.ts:25](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/backend/express.ts#L25)

### Métodos

#### start()

```ts
start(port): void
```

La función `start` escucha en un puerto específico y registra la información del servidor tras un inicio exitoso. número de puerto en el que el servidor escuchará las conexiones entrantes. Este número de puerto se utiliza para identificar diferentes servicios que se ejecutan en el mismo servidor.

**Parámetros**

• **puerto**: `número`

**Devuelve**

`void`

**Definido en**

[src/backend/express.ts:104](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/backend/express.ts#L104)
