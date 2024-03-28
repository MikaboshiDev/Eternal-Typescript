---
description: >-
  Librería de NPM enfocada en el soporte de múltiples funciones y control de
  peticiones a una api privada del servidor
---

# Eternal Support

Eternal-Support es una biblioteca de soporte, que agrega funciones y solicitudes útiles a bibliotecas como nekos.life y akaneko, su objetivo es la optimización de los recursos de trabajo.

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
import { anime, manga } from "eternal-support";
async function request() {
  console.log(await anime.animeSearch(1246))
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
import { anime, manga } from "eternal-support";
async function request() {
  console.log(await manga.mangaSearch(1246))
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
4. Registro de aplicación y obtención de las mismas (Api Privada).
5. Estado de bases de datos de Mongoose.

### Api Tools

Es una clase de el paquete que ayuda en el control y registro de aplicaciones (bots), esto para mejorar y facilitar el registro de los bots relacionados con eternal-manager

#### `POST`

Registro de la aplicación dentro de la web

```typescript
import { ApiTools, logWithLabel } from 'eternal-support';
import { DiscordBot } from '../structure/clientApp';

module.exports = (client: DiscordBot) => {
setInterval(registerApp, 300000); // 5 minutes
  function registerApp() {
    const res = new ApiTools('<api privada>', client);
    res
      .postAppWeb({
        description: 'Api-rest IA, control project focused on the manipulation of products, servers.',
        iconURL: client.user?.displayAvatarURL({ forceStatic: true, extension: 'png' }) as any,
        ownerId: "",
        licence: 'MIT',
        email: '',
        supportServer: '',
      })
      .then((data) => {
      return data;  
      })
      .catch((err) => {
        console.error(err);
      });
  } 
};
```

#### `GET ID`

```typescript
import { ApiTools, logWithLabel } from 'eternal-support';
import { DiscordBot } from '../structure/clientApp';

async function request(id: number){
   const res = new ApiTools('<api privada>', client);
   return res.getAppWeb({ id })
}

request();
```

#### `GETS`

```typescript
import { ApiTools, logWithLabel } from 'eternal-support';
import { DiscordBot } from '../structure/clientApp';

async function request(){
   const res = new ApiTools('<api privada>', client);
   return res.getAppsWeb()
}

request();
```

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

## Ejemplos

```typescript
import { nsfw stw } from "eternal-support";
async function request() {
  console.log(await nsfw.doujin())
}

request();
```

```typescript
import { ApiTools, logWithLabel } from 'eternal-support';
import { DiscordBot } from '../structure/clientApp';

module.exports = (client: DiscordBot) => {
setInterval(registerApp, 300000); // 5 minutes
  function registerApp() {
    const res = new ApiTools('<api privada>', client);
    res
      .postAppWeb({
        description: 'Api-rest IA, control project focused on the manipulation of products, servers.',
        iconURL: client.user?.displayAvatarURL({ forceStatic: true, extension: 'png' }) as any,
        ownerId: "",
        licence: 'MIT',
        email: '',
        supportServer: '',
      })
      .then((data) => {
      return data;  
      })
      .catch((err) => {
        console.error(err);
      });
  } 
};
```

```typescript
import { anime, manga } from "eternal-support";
async function request() {
  console.log(await manga.mangaSearch(1246))
}

request();
```
