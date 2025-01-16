---
description: Proceso de instalación del proyecto y descarga de las dependencias
---

# Instalación

## Descarga de Dependencias

En el proyecto se agrega el package.json para que una vez en el host, vps o local que uses ejecutes el comando `npm install` pero hay casos especiales en los que esto da algún tipo de error

### Errores

#### Versión de nodejs

Aun que trabajamos con algunas de las versiones mas recientes de nodejs para evitar el uso de dependencias que anteriormente eran obligatorias, esto lo especificamos en el json para evitar problemas de compatibilidad.

```json
"engines": { "node": ">=21.7.3" }
```

esto es para evitar la incompatibilidad con las versiones de desarrollo y producción aun que estaremos eliminando este problema en versiones posteriores.

#### Deprecated&#x20;

Algunas de las librerías que se usan son muy antiguas o ya no son compatibles aun que de momento pueden salirte algunas advertencias al momento de la instalación de dependencias dentro del proyecto

### Carpetas

Este problema ya lo explicamos en el siguiente URL [Introduccion Docs](../../../)

## Arranque&#x20;

Para arrancar el proyecto hay dos condiciones dependiendo de la situación usa el que mejor te convenga:

{% stepper %}
{% step %}
### BuiltByt Proyecto

Si tu proyecto es uno comprado por medio de licencia lo único que tienes que hacer para arrancarlo de forma correcta es ejecutar el script dentro de la siguiente ruta `src/index.js`
{% endstep %}

{% step %}
### Pixel Asistent 0.0.19

Si adquiriste el addon entonces tienes varios comandos para trabajar:

Antes que nada una vez adquirido el addon el código pasa a ser de tu sub propiedad a que me refiero a eso puedes venderlo, modificarlo y mucho mas sin embargo los derechos de creador y soporte siguen siendo de nuestra propiedad el por que hacemos eso es:

* Poder darte soporte continua en caso de errores dentro del código ya que controlamos completamente las compras y revalidamos si el proyecto es de nosotros o no (en caso de problemas de derechos de autor)

En el código agregamos el obfuscador por lo que tienes los siguientes comandos para poder utilizar:

1. `npm run obfuscate`: Este comando obfusca codo el proyecto, para evitar el robo  del código por parte de terceros igual puedes ejecutar `node obfuscate.js`
2. `npm run start:dev` : Inicializa el proyecto es un fase de desarrollo dándote logs del debug y otros eventos dentro del cliente.
3. `npm  run build`: Copila el código de ts a js para su producción.


{% endstep %}
{% endstepper %}
