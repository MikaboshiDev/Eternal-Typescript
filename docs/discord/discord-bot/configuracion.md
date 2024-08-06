---
description: >-
  La configuración básica del Bot es el paso mas sencillo del Bot, te explicare
  como empezar.
---

# Configuración

La configuración para poder prender el Bot de discord se realiza por medio de un archivo[ YML](https://docs.ansible.com/ansible/latest/reference\_appendices/YAMLSyntax.html) no es necesario llenar todo el archivo solo lo que necesites, a continuación explicaremos como configurar el arranque.

```yaml
general:
  token: "" #token del bot en discord developers
  db: ""
  guild_id: ""
  webhook_faild: "" #link de un webhook de tu servidor para mandar los errores
  apikey: ""
  licence: "" #licencia para arranque

dashboard:
  client_id: ""
  client_secret: "" #el id secret que se da en discord developers
  callback: "" #URL de regreso en la dashboard
```

Estos son los datos básicos necesarios para iniciar correctamente el bot. Otros detalles requeridos en el archivo de configuración son útiles para otros sistemas pero no son indispensables. Con solo estos datos, puedes comenzar a disfrutar del bot.

Para recibir soporte adicional para este complemento, necesitarás dos elementos:

1. **Licencia:** La licencia se proporciona cuando la solicitas en nuestro servidor de soporte. Esta licencia te otorga acceso a un soporte preferencial.
2. **Datos almacenados en el API:** Asegúrate de que tus datos estén correctamente guardados en nuestro API para garantizar un funcionamiento sin problemas y una integración adecuada con el Bot.

Una vez que tengas estos dos elementos en su lugar, estarás listo para aprovechar al máximo el bot y recibir soporte si es necesario.



## Petición para registrar un perfil dentro de la API CLIENT

<mark style="color:green;">`POST`</mark> `http://localhost:3000/api/v1/auth/register`

#### Request Body

| Name                                       | Type   | Description                                 |
| ------------------------------------------ | ------ | ------------------------------------------- |
| email<mark style="color:red;">\*</mark>    | String | Email para contacto entre soporte y cliente |
| name<mark style="color:red;">\*</mark>     | String | Nombre con el que quieres ser contactado    |
| password<mark style="color:red;">\*</mark> | String | Contraseña para tu login                    |

{% tabs %}
{% tab title="201: Created Tu perfil dentro de API CLIENT." %}
Tu perfil dentro de Api Cliente fue creado de forma exitosa y guardado dentro de la base de datos
{% endtab %}

{% tab title="500: Internal Server Error El servidor no a respondido" %}
En caso de un error de servidor contactar al desarrollador responsable para que se le de solucion lo antes posible
{% endtab %}
{% endtabs %}

## Petición para loguearte dentro de la API

<mark style="color:green;">`POST`</mark> `http://localhost:3000/api/v1/auth/login`

#### Request Body

| Name                                       | Type   | Description                                      |
| ------------------------------------------ | ------ | ------------------------------------------------ |
| email<mark style="color:red;">\*</mark>    | String | Email con el que te registraste dentro de la api |
| password<mark style="color:red;">\*</mark> | String | Contraseña de tu perfil                          |

{% tabs %}
{% tab title="200: OK JWT token regresado" %}

{% endtab %}
{% endtabs %}

Si aun no tienes esos datos, no se te dará soporte del proyecto con sus futuras actualizaciones, por eso recuerda pedirlos con tiempo.

## Registro de Aplicacion

\
Para registrar la aplicación dentro de nuestra web de control, se utiliza la API de desarrollador a través de un método POST. Este método permite enviar los datos necesarios para el registro de la aplicación. Es importante proporcionar la información requerida de manera precisa para asegurar un registro exitoso.

A continuación, se presenta un ejemplo básico del cuerpo de la solicitud POST que se enviaría a la API de desarrollador para registrar la aplicación:

```typescript
import { EmbedBuilder, WebhookClient } from "discord.js";
import { logWithLabel } from "../src/utils/console";
import { Night } from "../src/structure/client";
import emojis from "../config/json/emojis.json";
import { stripIndent } from "common-tags";
import axios from "axios";

module.exports = async (client: Night) => {
   const config = client.config.dashboard;
   setInterval(methodPost, 100000); //300000 = 5min

   async function methodPost() {
      try {
         const response = await axios({
            method: "POST",
            url: `http://${config.ip}:${config.port}/api/v1/aplications/register/${client.user?.id}`,
            headers: {
               "Content-Type": "application/json",
            },
            data: {
               name: client.user?.username,
               id: client.user?.id,
               description: "Bot aplication the hosting automata",
               licence: client.config.discord.licence,
               avatarURL: client.user?.displayAvatarURL({ forceStatic: true, extension: "png", size: 1024 }),
               ownerId: client.users.cache.get(client.config.discord.ownerId)?.id,
               guilds: [],
               supportServer: "https://discord.gg/invite/<code>",
               emailContact: "emailcontact@gmail.com"
            },
         })
            .then((res) => {
               console.log(res);
            })
            .catch((err) => {
               logWithLabel("error", `${err}`);
               console.error(err);
            });
      } catch (error) {
         logWithLabel("error", `${error}`);
         console.error(error);
      }
   }
};
```

{% hint style="danger" %}
Método Actualizado `Marzo 28, 2024` en [Eternal-Support](../../paquetes/eternal-support.md#utilidades)
{% endhint %}
