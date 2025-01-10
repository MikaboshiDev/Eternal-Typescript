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

Si adquiriste el addon entonces tienes varios comandos paara trabajar:

Antes que nada una vez adquirido el addon el codigo pasa a ser de tu sub propiedad a que me refiero a eso puedes venderlo, modificarlo y mucho mas sin embargo los derechos de creador y soporte siguen siendo de nuestra propiedad el por que hacemos eso es:

* Poder darte soporte continua en caso de errores dentro del código ya que controlamos completamente las compras y revalidamos si el proyecto es de nosotros o no (en caso de problemas de derechos de autor)

En el código agregamos el obfuscador por lo que tienes los siguientes comandos para poder utilizar:

1. `npm run obfuscate`: Este comando obfusca codo el proyecto, para evitar el robo  del código por parte de terceros igual puedes ejecutar `node obfuscate.js`
2. `npm run start:dev` : Inicializa el proyecto es un fase de desarrollo dándote logs del debug y otros eventos dentro del cliente.
3. `npm  run build`: Copila el código de ts a js para su producción.

algunos otros scripts a los que puedes acceder son los siguientes:

#### 4. **`docs:`** `"typedoc --plugin typedoc-plugin-markdown --out docs src --entryPointStrategy expand"`

Este script genera documentación del código utilizando **TypeDoc** y el plugin **typedoc-plugin-markdown** para exportarla en formato Markdown. La documentación se genera en la carpeta `docs` a partir de los archivos en la carpeta `src`.

**Comandos utilizados:**

* `typedoc`: Herramienta para generar documentación de TypeScript.
* `--plugin typedoc-plugin-markdown`: Utiliza un plugin para exportar la documentación en formato Markdown.
* `--out docs`: Define la carpeta de salida para la documentación generada.
* `--entryPointStrategy expand`: Expande todos los puntos de entrada en la documentación.

***

#### 5. `start: "npm run push && npm run test && npm run docs && npm run release"`

Este script ejecuta una serie de tareas importantes en secuencia:

1. **`npm run push`**: Formatea el código y ejecuta el linter.
2. **`npm run test`**: Ejecuta las pruebas unitarias.
3. **`npm run docs`**: Genera la documentación del proyecto.
4. **`npm run release`**: Genera una nueva versión del proyecto utilizando **standard-versión**.

***

#### 6. `test: "jest --watchAll --collectCoverage --detectOpenHandles"`

Este script ejecuta las pruebas unitarias utilizando **Jest**:

* **`--watchAll`**: Ejecuta las pruebas continuamente al detectar cambios.
* **`--collectCoverage`**: Genera un informe de cobertura de pruebas.
* **`--detectOpenHandles`**: Detecta manejadores abiertos que podrían causar que las pruebas no terminen.

***

#### 7. `push: "npm run format && npm run lint"`

Este script ejecuta dos tareas:

1. **`npm run format`**: Formatea el código.
2. **`npm run lint`**: Analiza el código en busca de errores y advertencias.

***

#### 8. `format: "prettier --write ."`

Este script formatea todo el proyecto utilizando **Prettier**.

* **`--write .`**: Sobrescribe los archivos con el formato correcto.

***

#### 9. `release: "standard-version"`

Este script genera una nueva versión del proyecto utilizando **standard-versión**:

* Actualiza automáticamente el número de versión en `package.json` y genera un changelog basado en los commits.

***

#### 10. `lint:fix: "eslint . --fix"`

Este script ejecuta **ESLint** para analizar el código y corregir automáticamente los problemas detectados


{% endstep %}
{% endstepper %}
