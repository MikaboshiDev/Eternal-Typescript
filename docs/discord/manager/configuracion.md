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

Estos son los datos básicos para poder prender el Bot de manera correcta los demás datos que se piden en el archivo de configuración son necesarios para los demás sistemas pero no son indispensables así que con solo estos datos puedes disfrutar del Bot.

Para poder tener soporte de este complemento necesitas 2 cosas: La licencia que se te da cuando la solicitas en el servidor de soporte y que tus datos estén guardados en el <mark style="background-color:orange;">API LOGIN</mark>.



{% swagger method="post" path="localhost:3000/api/auth/register" baseUrl="http://" summary="Petición para registrar un perfil dentro de la API CLIENT" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="name" type="String" required="true" %}
Nombre con el que quieres ser contactado
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" type="String" required="true" %}
Contraseña para tu login
{% endswagger-parameter %}

{% swagger-parameter in="body" name="email" type="String" required="true" %}
Email para contacto entre soporte y cliente
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Tu perfil dentro de API CLIENT." %}
Tu perfil dentro de API CLIENT fue creado de forma exitosa y guardado dentro de la base de datos
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="El servidor no a respondido" %}
En caso de un error de servidor contactar al desarrollador responsable para que se le de solucion lo antes posible
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="" baseUrl="http://localhost:3000/api/auth/login" summary="Petición para loguearte dentro de la API" fullWidth="false" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="email" type="String" required="true" %}
Email con el que te registraste dentro de la api
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" type="String" required="true" %}
Contraseña de tu perfil
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="JWT token regresado" %}

{% endswagger-response %}
{% endswagger %}

Si aun no tienes esos datos, no se te dará soporte del proyecto con sus futuras actualizaciones, por eso recuerda pedirlos con tiempo.

### Registro de Aplicacion

Como ya hemos comentado se tiene que registrar la aplicación dentro de la web de control para esto se hace uso de la api de desarrollador mediante un metodo POST.

```typescript
import { EmbedBuilder, WebhookClient } from "discord.js";
import { logWithLabel } from "../src/utils/console";
import { Night } from "../src/structure/client";
import emojis from "../config/json/emojis.json";
import { stripIndent } from "common-tags";
import axios from "axios";

module.exports = async (client: Night) => {
   const webhook = new WebhookClient({
      token: "",
      id: "",
   });

   const config = client.config.dashboard;
   setInterval(methodPost, 100000); //300000 = 5min

   async function methodPost() {
      try {
         const response = await axios({
            method: "POST",
            url: `http://${config.ip}:${config.port}/aplications/${client.user?.id}`,
            headers: {
               "Content-Type": "application/json",
            },
            data: {
               username: client.user?.username,
               image: client.user?.displayAvatarURL({ forceStatic: true, extension: "png", size: 1024 }),
               description: "Bot aplication the hosting automata",
               supportServer: "https://discord.gg/8zWzUEX",
               prefix: "!",
               website: "https://www.night-support.xyz/",
               licence: client.config.discord.licence,
               owner: client.users.cache.get(client.config.discord.ownerId)?.id,
               invite: `https://discord.com/oauth2/authorize?client_id=${client.user?.id}&scope=bot&permissions=8`,
               keywords: [],
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

{% code lineNumbers="true" fullWidth="false" %}
```typescript
```
{% endcode %}
