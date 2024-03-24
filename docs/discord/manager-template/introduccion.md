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
