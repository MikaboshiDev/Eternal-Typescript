---
description: Utilidades y funciones auxiliares al proyecto
---

# Utils

## logWithLabel

```ts
function logWithLabel(
label,
message,
customName?): void
```

La función `logWithLabel` registra mensajes en la consola con formato y colores específicos según la etiqueta proporcionada.

### Parámetros

• **label**: `Labels` | `"custom"`

El parámetro `label` en la función `logWithLabel` se usa para especificar el tipo de etiqueta que se usará para el registro. Puede ser una de las etiquetas predefinidas de la enumeración `Labels` o una etiqueta personalizada especificada como una cadena.

• **message**: `string`

El parámetro `message` en la función `logWithLabel` es una cadena que representa el mensaje real que desea registrar en la consola. Puede ser cualquier información, advertencia, error o mensaje de depuración que desee mostrar junto con la etiqueta especificada.

• **customName?**: `string`

El parámetro `customName` en la función `logWithLabel` es un parámetro opcional de tipo `string`. Se utiliza cuando el parámetro `label` se establece en `'custom'`, lo que indica un tipo de etiqueta personalizada. Si la `etiqueta` es `'personalizada'`, entonces el `nombre_personalizado`

### Devuelve

`void`

### Definido en

[src/structure/utils/logger.ts:77](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/structure/utils/logger.ts#L77)

## WinstonError

WinstonError

### Descripción

Clase WinstonError para registrar errores en la consola y en el webhook de Discord

La clase `WinstonError` registra errores en la consola y en el webhook de Discord. La clase tiene dos métodos: `logConsole` y `logMessage`.

El método `logConsole` registra el error en la consola mediante el registrador Winston. El método `logMessage` envía el mensaje de error a un webhook de Discord.

### Constructores

#### new WinstonError()

```ts
new WinstonError(message): WinstonError
```

**Parámetros**

• **message**: `string`

**Devuelve**

`WinstonError`

**Definido en**

[src/structure/winston.ts:16](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/structure/winston.ts#L16)

### Métodos

#### logConsole()

```ts
logConsole(): Promise<void>
```

**Devoluciones**

`Promise`<`void`>

**Definido en**

[src/structure/winston.ts:20](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/structure/winston.ts#L20)

***

#### logMessage()

```ts
logMessage(): Promise<void>
```

**Devoluciones**

`Promise`<`void`>

**Definido en**

[src/structure/winston.ts:35](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/structure/winston.ts#L35)

## CrashUtils

```ts
function CrashUtils(client): void
```

La función `CrashUtils` en TypeScript configura detectores de eventos para manejar varios tipos de errores y advertencias, registrándolos y enviando notificaciones a través de un webhook.

### Parámetros

• **client**: `BotCore`

El parámetro `client` en la función `CrashUtils` es una instancia de la clase `BotCore`. Parece usarse para manejar varios eventos relacionados con errores y excepciones en la aplicación del bot. La función configura detectores de eventos para diferentes escenarios de error como rechazos no controlados, un

### Devuelve

`void`

En la función `CrashUtils`, si el `webhook` no se crea correctamente (es decir, si es falsy), la función regresará antes y no ejecutará el resto del código dentro de la función.

### Definido en

[src/structure/utils/errorsHandler.ts:21](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/structure/utils/errorsHandler.ts#L21)
