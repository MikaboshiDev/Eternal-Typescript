---
description: Como hostear tu Bot de discord comprado con nosotros
---

# Hosting

Cuando compres un Bot con nosotros hay 4 formas en que damos estos proyectos:

## Como copilar el proyecto ?

En caso de que el proyecto se le haya dado sin copilar la forma de arreglarlo es sencillo, solo sigue los siguientes pasos:

1. Instala las dependencias del proyecto.

```
npm install
```

2. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables dentro de `./env.example`.
3. Configurar el archivo config dentro de la ruta `./src/structure/config` (_el Bot no enciende sin que este archivo esté configurado_).
4. Inicia el proyecto para confirmar que todo está funcionando correctamente.

```
npm run dev
```

5. Listo, ya tienes el proyecto instalado ahora compila el proyecto.

```
npm run build
```

6. Si todo salió bien, ya tienes el proyecto listo para ser subido a tu hosting dentro de la ruta `./dist`

## Como usar el sistema de procesamiento de lenguaje ?

La aplicación está integrada con una API personal en la que también se establecen URL's públicas, una de ellas es el análisis y comparación de textos por medio de lenguaje natural.

```typescript
import axios from 'axios';
const res = await axios({
  method: 'POST',
  url: 'http://104.128.49.50:25529/v1/devs/processing/natural',
  data: {
    message: '',
    predifined: '',
  },
  headers: {
    'authorization': '',
    'x-developer-token': '',
  },
});
```

Este servicio ayuda a comparar textos y a analizarlos para poder hacer un análisis de sentimientos y de palabras clave. Se considera como correcta la comparación de textos cuando la similitud es de más del 70% al predefinido.

{% hint style="warning" %}
Necesitas de dos tokens para poder acceder a este servicio, uno es el token de autorización y el otro es el token de desarrollador, sin embargo, si deseas obtener estos tokens puedes contactarme en mi servidor de discord.
{% endhint %}

## Como subir mi bot al hosting ?

Bueno esto depende mucho también de el tipo de hosting ya que asi como hay algunos muy estrictos hay otros que no lo son. Uno de los que uso mucho es [Teramont](https://teramont.net/)&#x20;

1. Una vez tienes copilado tu codigo y has revisado que sea correcto tenemos dos formas de subirlo una es por Filezilla y otro es media compresion normalmente usamos mas filezilla pero en caso de no poder usarlo puedes comprimir un archivo `ZIP` y subirlo al host con todos los archivos.

<figure><img src="../.gitbook/assets/Captura de pantalla 2024-08-05 195459.png" alt=""><figcaption></figcaption></figure>

2. No es necesario añadir los nombres de las dependencias como en otros hostings ya que aquí mismo se reconocen por medio del package.json del proyecto una vez descomprimido, lo que tienes que hacer ahora es dirigirte a `INICIO` en el apartado de `JS FILE` y colocar `src/bot.js` es el path que normalmente usamos en caso de que sea otro siempre estará en el package.json

<figure><img src="../.gitbook/assets/Captura de pantalla 2024-08-05 200021.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/Captura de pantalla 2024-08-05 195936.png" alt=""><figcaption></figcaption></figure>

3. Una vez los dos pasos anteriores solo debes de elejir la version de `NODE` que el bot usara usualmente se trabaja con versiones superiores a al 19.

<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

4. En algunos casos usamos un framework para la base de datos llamado PRISMA asi que como paso adicional antes de prender deberas agregar el siguiente comando

<figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

Una vez todo completado ya puedes disfrutar de tu aplicacion :drum:
