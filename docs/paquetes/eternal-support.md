---
description: >-
  Librería de NPM enfocada en el soporte de múltiples funciones y control de
  peticiones a una api privada del servidor
---

# Eternal Support

`Eternal-Support` es una biblioteca de soporte, que agrega funciones y solicitudes útiles a bibliotecas como nekos.life y akaneko, su objetivo es la optimización de los recursos de trabajo.

{% hint style="warning" %}
Se actualizo gran cantidad de nombres de las funciones y las clases que contiene esta librería debido a un error de sintaxis encontrado al momento de hacer peticiones HTTP, por lo que se recomienda actualizar a la versión 1.0.8
{% endhint %}

## Contenido

Te listare las funciones de la librería según la versión en la que la misma se encuentre en estos momentos que revises la documentación:

### Anime

|      Funcion     |                                      Descripción                                      |
| :--------------: | :-----------------------------------------------------------------------------------: |
|    animeRandom   |               Obtiene algún anime random de la base de datos de el sitio              |
|    animeSearch   |            Busca un anime a partir de la id que el mismo sitio proporciona            |
| animeRecommended | Obtén alguno de los animes recomendados según las valoraciones del mismo en animelist |

Estas funciones son dedicadas para la búsqueda de anime en [Animelist](https://myanimelist.net/) por medio de un cliente externo para el consumo de su Api de forma mas rápida,

```typescript
import { Anime, Manga } from "eternal-support";
async function request() {
  console.log(await Anime.animeSearch(1246))
}

request();
```

### Manga

|      Funcion     |                                      Descripcion                                     |
| :--------------: | :----------------------------------------------------------------------------------: |
|    mangaRandom   |              Obtiene algún manga random de la base de datos de el sitio              |
|    mangaSearch   |           Busca un manga a partir de la id que el mismo sitio proporciona            |
| mangaRecommended | Obtén alguno de los manga recomendados según las valoraciones del mismo en animelist |

Como abras notado son las mismas funciones del [Anime](eternal-support.md#anime) sin embargo orientadas a la búsqueda de manga de la misma plataforma

```typescript
import { Anime, Manga } from "eternal-support";
async function request() {
  console.log(await Manga.mangaSearch(1246))
}

request();
```

### Nekos

|   Función  |                                          Descripcion                                          |
| :--------: | :-------------------------------------------------------------------------------------------: |
|    smug    |                          Obtiene una URL de una imagen/gif presumido                          |
|    baka    |                            Obtiene una URL de una imagen/gif idiota                           |
|   tickle   |                        Obtiene una URL de una imagen/gif de cosquillas                        |
|    slap    |                         Obtiene una URL de una imagen/gif de bofetada.                        |
|    poke    |                             Obtiene una URL de una imagen/gif poke                            |
|     pat    |                         Obtener una URL de una imagen/gif de palmadita                        |
|    meow    |                          Obtener una URL de una imagen/gif de un gato                         |
|   lizard   |                            Obtener una URL de una imagen de lagarto                           |
|    kiss    |                           Obtener una URL de una imagen/gif de beso                           |
|     hug    |                          Obtener una URL de una imagen/gif de abrazo                          |
|   foxGirl  |                      Obtener una URL de una imagen/gif de una chica zorro                     |
|    feed    |                       Obtener una URL de una imagen/gif de alimentación                       |
|   cuddle   |                          Obtener una URL de una imagen/gif de abrazo                          |
| kemonomimi |                        Obtener una URL de una imagen/gif de kemonomimi                        |
|    holo    |                             Obtener una URL de una imagen/gif Holo                            |
|    woof    |                           Obtener una URL de una imagen/gif de perro                          |
|  wallpaper |                            Obtener una URL de un fondo de pantalla                            |
|    goose   |                             Obtener una URL de una imagen de ganso                            |
|    gecg    |            Obtenga una URL de una imagen de gecg (catgirl genéticamente modificada)           |
|   avatar   |                            Obtener una URL de una imagen de avatar                            |
|    waifu   |                              Obtener una URL de una imagen waifu                              |
|     why    |                                 Obtener texto de una pregunta                                 |
|   catText  |                               Obtener texto de un emoji de gato                               |
|   OwOify   |                              Obtener texto OwOified de una cadena                             |
|  eightBall | Envía el texto y responde con un texto como respuesta a la mágica 8Ball y una imagen también. |
|    fact    |              Obtiene el texto y responde con un texto que es un hecho aleatorio.              |
|   spoiler  |                       Crea un spoiler individual por letra para Discord                       |

Todos los puntos finales excepto los marcados con texto, excepto `Chat/8Ball/Fact` en la descripción, devolverán JSON: {url: }.

`eternal.catText` devolverá JSON: `{cat: }`&#x20;

`eternal.why` devolverá JSON `{why: <texto porqué>}`&#x20;

`eternal.OwOify` devolverá JSON `{owo: }`

`eternal.fact` devolverá JSON {hecho: }&#x20;

`eternal.eightBall` devolverá JSON `{response: <cadena de respuesta de 8Ball>, url: <URL a una imagen de 8Ball coincidente>}`

{% hint style="warning" %}
Estas peticiones se obtuvieron basándose en librerías como [nekos.life](https://www.npmjs.com/package/nekos.life) y [nekosapis](https://docs.nekos.best/) de NPM, no son de propia creación de nosotros&#x20;
{% endhint %}

```typescript
import { NekoClient } from "eternal-support";
const neko = new NekoClient();

async function request() {
  console.log(await neko.hug())
}
```

### Sfw & Nsfw

#### Sfw

|      Funcion     |                       Descripcion                       |
| :--------------: | :-----------------------------------------------------: |
|       neko       |               SFW Neko Girls (Chicas Gato)              |
|      foxgirl     |                      SFW Fox Girls                      |
| mobileWallpapers |    ¡Obtén un fondo de pantalla SFW aleatorio! (Móvil)   |
|     lewdNeko     |              NSFW Neko Girls (Chicas Gato)              |
|    wallpapers    | ¡Obtén un fondo de pantalla SFW aleatorio! (Escritorio) |

#### Nsfw

{% hint style="danger" %}
Estas funciones se obtuvieron basándonos en la librería de [akaneko](https://www.npmjs.com/package/akaneko) por lo que si deseas conocerlas, visita su documentación
{% endhint %}

```javascript
//import { nsfw } from "eternal-support"
const akaneko = require('akaneko');

// Option 1, using and calling an asyncronous function //
async function yourFunctionName() {
  //return console.log(await nsfw.maid());
  return console.log(await akaneko.nsfw.maid()); // Output: Some weird long link that you probably will definitely try to open //
}

// Don't forget to call your function! //
yourFunctionName();

// Option 2, Returning a Promise //
//nsfw.maid().then((imageURL) => {
// return console.log(imageURL);
//})
akaneko.nsfw.maid().then((imageURL) => {
  return console.log(imageURL);
})
```

## Utilidades

1. Obtención de imágenes de anime y Nsfw.
2. Petición a Apis publicas de los animes mas recomendados, búsquedas y obtenciones random.
3. Logueo en consola.
4. Estado de bases de datos de Mongoose.

### Neko

{% hint style="info" %}
Clase optimizada de la librería de Neko.life para la optencion de imagenes de anime por medio de peticiones https
{% endhint %}

```typescript
import { NekoClient } from "eternal-support"
const neko = new NekoClient();

async function work() {
  let owo = await neko.OwOify({text: 'This lib is really awesome!'});
  console.log(owo);
}

work();
```

```typescript
import { NekoClient } from "eternal-support"
const neko = new NekoClient();

neko.catText().then((catText) => console.log(catText));
```

### Anti Crash

Función de soporte ante errores del cliente y de la aplicación de discord, envía los errores y el motivo a un canal dentro del mismo servidor

{% hint style="danger" %}
Ahora integrada por default dentro de la clase [`Tools`](eternal-support.md#tools-hub)
{% endhint %}

### Tools Hub

> Funcion Privada de Eternal IA, nose garantiza funcionamiento fuera de ellos

Clase con funciones de Mongoose y licencias personales, esto se agrego con el fin de ahorrar recursos y código dentro de los proyectos cuenta con las siguientes funciones.

* Logueo de Errores (Webhook y Logs)
* Conexión a base de datos Mongoose
* Peticion de Licencias

```typescript
import { discordApp } from '../../apps/discord/app';
import { config } from './configuration';
import { Tools } from 'eternal-support';

const webhook = 'URL'; //URL de tu webhook
const databaseUrl = config.database;
const tools = new Tools(database, webhook, './files/logs', discordApp);
```

## Ejemplos

```typescript
import { Nsfw, Stw } from "eternal-support";
async function request() {
  console.log(await Nsfw.doujin())
}

request();
```

```typescript
import { Anime, Manga } from "eternal-support";
async function request() {
  console.log(await Manga.search(1246))
}

request();
```

```typescript
import { logWithLabel } from 'eternal-support';
logWithLabel('info', 'Hello World');

//custom properties
logWithLabel('custom', 'Hello World', "message");
```

```typescript
import { mobileWallpapers } from 'eternal-support';
async function getMobileWallpapers() {
  const mobileWallpapers = await mobileWallpapers();
  console.log(mobileWallpapers);
}

getMobileWallpapers();

```

`getGithubData` acomoda y optimiza la busqueda de perfiles de github por medio de peticiones http, incluye informacion de los seguidores y repositorios publicos del usuario

```typescript
//Nueva version 1.0.8 GithubData
import { getGithubData } from 'eternal-support';
async function GithubUser(username: string) {
  const res = await getGithubData(username);
  return res;
}

GithubUser();
```

### Discord Logger

con el fin de no tener que crear mil archivos diferentes de los eventos de discord, `Logger` se encarga de loguear los eventos de discord en un canal especifico, en este caso el canal es `Id channel server discord` y los eventos a loguear son:

* AutoModerationActionExecution
* MessageUpdate
* AutoModerationRuleCreate
* GuildMemberRemove
* GuildMemberAdd
* ChannelDelete
* ChannelCreate
* GuildEmojiCreate
* GuildRoleCreate
* GuildRoleDelete
* GuildRoleUpdate
* InviteCreate
* InviteDelete
* MessageDelete

```typescript
const logger = new Logger(
  'Id channel server discord',
  [
    'AutoModerationActionExecution',
    'MessageUpdate',
    'AutoModerationRuleCreate',
    'GuildMemberRemove',
    'GuildMemberAdd',
    'ChannelDelete',
    'ChannelCreate',
    'GuildEmojiCreate',
    'GuildRoleCreate',
    'GuildRoleDelete',
    'GuildRoleUpdate',
    'InviteCreate',
  ],
  client
);
```
