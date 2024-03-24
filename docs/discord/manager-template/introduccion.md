---
description: Introducción a la configuración y arranque del Bot una vez descargado
---

# Introducción

Una vez que obtienes el source del Bot lo que queda es configurar su archivo principal para eso dirígete a [Configuracion](configuracion.md) una vez configurado tenemos dos opciones.

* Para habilitar la ejecución del Bot en diversos servicios de alojamiento de aplicaciones, es necesario compilar el código TypeScript a JavaScript. Este proceso permitirá la compatibilidad con una amplia gama de hostings. Por lo tanto, se requiere la compilación del archivo TypeScript para su posterior alojamiento como aplicación JavaScript.

```
npm run build
```

Después de ejecutar el comando `tsc`, será necesario editar varios archivos para ajustar los términos del código, de modo que la aplicación lea archivos con extensión `.js` en lugar de `.ts`. Aunque este cambio no provoca errores en el arranque, deshabilitará algunas funciones del cliente. Por lo tanto, es recomendable realizar este ajuste para garantizar el correcto funcionamiento de la aplicación.

## Arranque

Una vez que se haya compilado el código, podemos proceder con el arranque del bot siguiendo dos pasos sencillos.

**Dependencias:** La instalación de las dependencias varía según si se realiza de forma local (en una computadora o VPS) o en un servicio de hosting específico. Algunos hosts cuentan con un apartado especial para manejar estas dependencias, mientras que otros pueden instalarlas automáticamente a partir del archivo package.json.

```
npm install
npm i
```

Para llevar a cabo la instalación de dependencias de forma local, se ejecutará el comando de instalación que se especifica, en caso de existir. Esto garantizará que se instalen todas las dependencias mencionadas en dicho archivo.

En cuanto al hosting, se utilizará el apartado por defecto denominado "ADDITIONAL NODE PACKAGES". Este apartado facilita la instalación de las dependencias requeridas en el momento del arranque. La sintaxis para este apartado puede ser la siguiente:

```
discord.js, cookies-parser, fs, anime, express
```

## Encendido

Una vez completados todos los pasos, el Bot proporcionará un mensaje de inicio en la consola que incluirá una alerta indicando todos los componentes que se han activado correctamente, así como posibles errores menores.

<figure><img src="../../.gitbook/assets/Captura de pantalla 2024-03-17 225441.png" alt=""><figcaption></figcaption></figure>

## Errores

Los errores son redirigidos a un canal dentro del servidor de Discord mediante un webhook. En este canal, se especifica la razón del error y la línea de código donde ocurrió.

<figure><img src="../../.gitbook/assets/Captura de pantalla 2024-03-24 155014.png" alt=""><figcaption></figcaption></figure>

Este error también se registra en la consola, donde se detalla el archivo que emitió el error, la razón y el tipo de alerta dentro de la consola.

### Consola

El código que maneja los diferentes tipos de anuncios en la consola, como error, correcto, sitio web, Discord, multihub y otras funciones, es el siguiente:

```typescript
  const _getLogOrigin = () => {
    let filename: any;

    let _pst = Error.prepareStackTrace;
    Error.prepareStackTrace = function (err, stack) {
      return stack;
    };
    try {
      let err: any = new Error();
      let callerfile: string;
      let currentfile: string;

      currentfile = err.stack.shift().getFileName();

      while (err.stack.length) {
        callerfile = err.stack.shift().getFileName();

        if (currentfile !== callerfile) {
          filename = callerfile;
          break;
        }
      }
    } catch (err) {}
    Error.prepareStackTrace = _pst;

    return filename;
  };
```

Para poder registrar el error en la consola haremos lo siguiente:

```typescript
  /**
   * The `_getLogOrigin` function is a helper function that retrieves the origin or source of the log
   * message. It uses the `Error.prepareStackTrace` method to get the stack trace and extract the file
   * name of the calling file. This is used to determine the origin of the log message.
   * @returns {string} - The file name of the calling file, which is used as the origin of the log message.
   */
  const origin = _getLogOrigin().split(/[\\/]/).pop();
  const time = new Date().toLocaleTimeString();
  const labelColor = labelColors[label];
  const labelName = labelNames[label];

  console.log(
    labelColor(`${time}  ${labelName.padEnd(10, ' ')} | `) +
      chalk.grey(`${origin.length > 25 ? origin.substring(0, 17) + '...' : origin}`) +
      ' '.repeat(25 - (origin.length > 25 ? 25 : origin.length)) +
      ` | ${message}`
  );

  /* --- Send log message to Discord webhook --- */
  const webhookUrl = config.MultiBotHub.discord.webhooks.statusConsole;
  if (!webhookUrl) return;

  const webhook = new WebhookClient({ url: webhookUrl });
  webhook.send({ content: codeBlock('yaml', `${time} | ${labelName} | ${origin} | ${message}`) });
```
