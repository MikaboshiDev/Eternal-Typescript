---
description: Herramientas de extensión de clases de las librerías básicas
---

# Extensiones

## Embed

Clase que representa una incrustación personalizada para Discord. Extiende la clase `EmbedBuilder` de `discord.js` para manejar mensajes de éxito de la aplicación.

### Ejemplo

```ts
const successEmbed = new Embed('guildId');
successEmbed.addField('Field Name', 'Field Value');
```

### Extiende

* `EmbedBuilder`

### Constructores

#### new Embed()

```ts
new Embed(guildId): Embed
```

Crea una instancia de Embed.

**Parámetros**

• **guildId**: `string`

El ID del gremio donde la operación fue exitosa.

**Devuelve**

`Embed`

**Anula**

`EmbedBuilder.constructor`

**Definido en**

[src/structure/extenders/embeds.extends.ts:102](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/structure/extenders/embeds.extends.ts#L102)

**Parámetros**

• **guildId**: `string`

El ID del gremio donde la operación fue exitosa.

**Devuelve**

`Embed`

**Anulaciones**

`EmbedBuilder.constructor`

**Definido en**

[src/structure/extenders/embeds.extends.ts:102](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/structure/extenders/embeds.extends.ts#L102)

## ErrorEmbed

Clase que representa una incrustación de error personalizada para Discord. Extiende la clase `EmbedBuilder` de `discord.js` para manejar mensajes de error de la aplicación.

### Ejemplo

```ts
const errorEmbed = new ErrorEmbed('guildId');
errorEmbed.setErrorCode('404').setStackTrace('Error stack trace');
```

### Extiende

* `EmbedBuilder`

### Constructores

#### new ErrorEmbed()

```ts
new ErrorEmbed(guildId): ErrorEmbed
```

Crea una instancia de ErrorEmbed.

**Parámetros**

• **guildId**: `string`

El ID del gremio donde ocurrió el error.

**Devuelve**

`ErrorEmbed`

**Anula**

`EmbedBuilder.constructor`

**Definido en**

[src/structure/extenders/embeds.extends.ts:27](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/structure/extenders/embeds.extends.ts#L27)

#### setErrorCode()

```ts
setErrorCode(code): this
```

Agrega un campo de código de error a la incrustación.

**Parámetros**

• **code**: `string`

El código de error que se mostrará.

**Devuelve**

`this`

La instancia de ErrorEmbed actualizada.

**Definido en**

[src/structure/extenders/embeds.extends.ts:60](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/structure/extenders/embeds.extends.ts#L60)

#### setStackTrace()

```ts
setStackTrace(stack): this
```

Adds the stack trace of the error to the embed.

**Parameters**

• **stack**: `string`

The error stack trace to display. Only the first 1024 characters will be shown.

**Returns**

`this`

The updated ErrorEmbed instance.

**Defined in**

[src/structure/extenders/embeds.extends.ts:71](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/structure/extenders/embeds.extends.ts#L71)
