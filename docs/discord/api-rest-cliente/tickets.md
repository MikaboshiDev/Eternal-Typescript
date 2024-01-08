---
description: Sistema de tickets personalizados dentro del Bot
---

# Tickets

El cliente cuenta con un sistema de tickets altamente customizado con mensajes interactivos, menús, formularios, pagina web etc. etc.

### Configuración

La configuración se realiza por comando y archivo de configuración ya que cuenta con sistemas de tiempo que controlan el estado de cada ticket abierto en el servidor.

#### Comando dentro Discord

Bueno por comando solo se necesita un paso y es el de elegir las opciones según lo pida como el rol de el soporte, canal de transcripción, canal al que se mandara el menú de los tickets y categoría donde se crearan estos tickets.

```json
{
  "_id": {
    "$oid": "659106c816f7e23c4484b95d"
  },
  "GuildID": "1099013284889370696",
  "Category": "1099030134536814643",
  "ChannelID": "1099090948748742736",
  "Handlers": "1099014399345315881",
  "IDs": 1,
  "Transcripts": "1099030505111961732",
  "__v": 0
}
```

Esto lo que hará es guardar los datos dentro de la base de datos de Mongoose como se muestra en el ejemplo anterior

#### Archivo de Configuración

Este paso es sencillo ya que la mayor parte es automático. Lo primero que deberás revisar es el tiempo de revisión de cada uno de los canales ya que se realiza una revisión cada X tiempo de la actividad del ticket y en caso de no tener actividad dentro del margen el ticket se marcara como suspendido.

```typescript
import {
	ActionRowBuilder,
	CategoryChannel,
	ChannelType,
	EmbedBuilder,
	StringSelectMenuBuilder,
	TextChannel,
	userMention,
} from "discord.js";
import { Event } from "../../../functions/modules/builders";
import { createTranscript } from "discord-html-transcripts";
import emojis from "../../../../config/json/emojis.json";
import { logWithLabel } from "../../../utils/console";
import modelSet from "../../../models/tickets/setup";
import model from "../../../models/tickets/system";
import { client } from "../../../enderman";

export default new Event("ready", async () => {
	const guildId = client.config.dashboard.guild_id;
	const guild = client.guilds.cache.get(guildId);
	if (!guild) return;

	const data = await model.find({ GuildID: guildId });
	if (!data) return;

	setInterval(async () => {
		data.forEach(async (ticket) => {
	           //Codigo de estado de los tickets . . .
		})
	}, 1000 * 60 * 30); // 30 minutes
});
```

Como se puede observar en el ejemplo se realiza una revisión de todos los tickets abiertos cada 20min y se aplica la lógica del código establecido, en nuestro caso es la revisión de actividad de los tickets.

{% file src="../../.gitbook/assets/ready.ts" %}

Se adjunta un ejemplo de lo anteriormente mencionado.

### Contenido

Te preguntaras que contiene el sistema de tickets, bueno aquí te pondremos una lista de lo que este sistema te puede ofrecer.

* Control de estado de actividad y suspensión.
* Panel de control de funciones (agregar usuario, eliminar, actualizar datos, mover canal) entre otros mas.
* Comando de configuración editable (información, eliminar, establecer)
* Sistema de actualización a partir del manager
* Reseñas y Transcripciones.
* Interacción de alto nivel con varios formularios.
* Control de usuarios que pueden interactuar con el sistema.
* Control de Inactividad de mas o igual a 24hr

Estas son algunas de las funciones actualmente estables dentro del open source, sin embargo se mantiene en constante actualización así que no es del todo estable.

### Errores

Algunos de los posibles errores que encontraras en el sistema son los siguientes:

1. Advertencia cuando se genera la transcripción del ticket: Cuando se genera este archivo se genera una advertencia Buffer.flop de node.js ya que estamos creando un archivo HTML.
2. Error al eliminar el ticket: Hay posibilidades no siempre de que el Bot no elimine al canal cuando llenas el formulario esto se debe a un espacio de tiempo generado entre la respuesta y la accion por lo que en estos casos recomiendo que primero verifiques si el ticket se marco como cerrado o el schema no esta en la base de datos, esto lo puedes hacer con [Mongoose Compass](https://www.mongodb.com/try/download/compass) en caso de que sea así deveras eliminar el ticket de forma manual, y por ultimo si el error se debe a un problema de código puedes reportarlo en el servidor de discord para que podamos resolverlo.
