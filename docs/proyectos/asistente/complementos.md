---
description: Como crear tus propios addons dentro del proyecto mismo
---

# Complementos

Para crear tus addons se hace uso de una clase dentro del proyecto Addons es un metodo que ayuda con el registro de la aplicación mejorando la creación y metodo de trabajo de los addons.

{% code overflow="wrap" lineNumbers="true" %}
```typescript
/**
 * @name Addons
 * @description A class that represents an addon for the bot.
 * @version 1.0.0
 * @author MikaboshiDev
 * 
 * @alias Addon 
 * @class
 */
export class Addons {
  /**
   * A function that initializes the addon with the provided client and configuration.
   *
   * @type {(client: BotCore, configuration: typeof config) => void}
   * @readonly
   */
  readonly initialize: (client: BotClient, configuration: typeof config) => void;

  /**
   * The structure defining the configuration of the addon.
   *
   * @type {AddonConfig}
   * @readonly
   */
  readonly structure: AddonConfig;

  /**
   * Creates an instance of Addons.
   *
   * @param structure - The configuration structure of the addon.
   * @param initialize - The initialization function that sets up the addon, which takes a `BotCore` client and a configuration object.
   */
  constructor(structure: AddonConfig, initialize: (client: BotClient, configuration: typeof config) => void) {
    this.structure = structure;
    this.initialize = initialize;
  }
}
```
{% endcode %}

Para crear un addons necesitas importar la clase dentro de tu archivo en la ruta `src/modules/discord/addons` y llenas los campos a continuación.

```typescript
export default new Addons(
  {
    name: "Utilities",
    description: "Client environment variables within the project",
    author: "Mika",
    version: "0.0.3",
    bitfield: ["SendMessages"],
  },
  async (client) => {
  }
);
```

ten en cuenta que el registro de addons nuevos en una licencia es controlado por lo que puede tardar unos minutos en el momento del registro de el nuevo complemento. Dentro de los parametros de arranque se aceptan

```typescript
async (client, config) {}
```
