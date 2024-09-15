---
description: configuración y lectura de todos los archivos YML del proyecto
---

# Configuración

## Panel de control

```ts
const panel de control: DashType;
```

### Definido en

[src/structure/config.ts:30](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/structure/config.ts#L30)

## Config

```ts
const config: ConfigType;
```

### Definido en

[src/structure/config.ts:32](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/structure/config.ts#L32)

## Comandos

```ts
const comandos: ConfigType;
```

### Definido en

[src/structure/config.ts:31](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/structure/config.ts#L31)

## readConfigFile

```ts
función readConfigFile<T>(filename): T
```

### Parámetros de tipo

• **T**

### Parámetros

• **filename**: `string`

### Devuelve

`T`

### Definido en

[src/structure/config.ts:17](https://github.com/MikaboshiDev/Eternal-Application-IA/blob/3498a43c3e916a7fd1a545a2113cf473cab0e66c/src/structure/config.ts#L17)

## initializeLavalinkManager

```ts
función initializeLavalinkManager(): Promise<Manager>
```

La función inicializa un administrador de Lavalink al encontrar nodos, crear una nueva instancia de Administrador e inicializarla con el ID de usuario del cliente.

### Devuelve

`Promise`<`Manager`>

La función `initializeLavalinkManager` devuelve una instancia de `Manager` después de inicializarla con los nodos proporcionados y configurar una función de envío para enviar cargas útiles al fragmento de un gremio.
