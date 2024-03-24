---
description: Sistema de tickets personalizados dentro del Bot
---

# Tickets

El cliente dispone de un sistema de tickets altamente personalizable que incluye mensajes interactivos, menús, formularios y una página web dedicada, entre otras características.

## Configuración

La configuración del sistema se puede realizar mediante comandos y archivos de configuración. Este proceso es fundamental debido a la presencia de sistemas temporales que controlan el estado de cada ticket abierto en el servidor.

### Comandos en Discord

La configuración mediante comandos en Discord es sencilla y consta de un único paso. Los usuarios simplemente deben seguir las instrucciones proporcionadas, seleccionando las opciones requeridas, tales como el rol de soporte, el canal de transcripción, el canal de destino para los menús de tickets y la categoría donde se crearán estos tickets.

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

Lo que este proceso realizará es almacenar los datos dentro de la base de datos de Mongoose, como se ilustra en el ejemplo anterior.

## Archivo de Configuración

Este paso es relativamente simple, ya que gran parte del proceso es automatizado. La primera tarea consiste en revisar el intervalo de tiempo para cada uno de los canales, dado que se ejecuta una revisión periódica de la actividad de cada ticket. En caso de no haber actividad durante un periodo determinado, el ticket se marcará como suspendido.

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

## Contenido

A continuación, se presenta una lista de las funcionalidades ofrecidas por el sistema de tickets:

1. Control de estado de actividad y suspensión.
2. Panel de control de funciones (agregar usuario, eliminar, actualizar datos, mover canal), entre otros.
3. Comando de configuración editable (información, eliminar, establecer).
4. Sistema de actualización a través del administrador.
5. Reseñas y transcripciones.
6. Interacción avanzada con varios formularios.
7. Control de usuarios autorizados a interactuar con el sistema.
8. Gestión de inactividad igual o superior a 24 horas.

Estas son algunas de las funciones actualmente disponibles en la versión estable del código abierto. Sin embargo, el sistema se encuentra en constante actualización, por lo que puede no ser completamente estable en todo momento.

## Errores

A continuación, se mencionan algunos posibles errores que podrían surgir en el sistema:

1. Advertencia al generar la transcripción del ticket: Se puede generar una advertencia de Buffer.flop en Node.js al crear un archivo HTML como transcripción del ticket.
2. Error al eliminar el ticket: En algunos casos, el bot puede no eliminar el canal después de completar el formulario. Esto puede deberse a un lapso de tiempo entre la respuesta y la acción. En tales casos, se recomienda verificar primero si el ticket se ha marcado como cerrado o si el esquema no está presente en la base de datos utilizando Mongoose Compass. Si es necesario, el ticket debe eliminarse manualmente. Si el error persiste debido a un problema de código, se sugiere reportarlo en el servidor de Discord para su resolución.
