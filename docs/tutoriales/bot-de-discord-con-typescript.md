---
description: Como crear un Bot de discord con typescript y nodejs
---

# Bot de discord con  typescript

### Introducción

Discord es una plataforma popular para comunidades en línea, y los bots de Discord permiten automatizar tareas, moderar servidores y ofrecer funcionalidades personalizadas. Este tutorial te guiará paso a paso para crear un bot de Discord usando TypeScript y Node.js.

***

### Requisitos previos

1. **Node.js:** Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior).
2.  **TypeScript:** Instala TypeScript de manera global:

    ```bash
    npm install -g typescript
    ```
3. **Editor de código:** Se recomienda [Visual Studio Code](https://code.visualstudio.com/).
4. **Cuenta de Discord:** Necesitarás acceso a Discord y permisos para crear bots en un servidor.
5. **Token del bot:** Crea un bot en el [Portal de desarrolladores de Discord](https://discord.com/developers/applications) para obtener tu token.

***

### Crear el proyecto

1.  **Inicializar el proyecto:**

    ```bash
    mkdir discord-bot-ts
    cd discord-bot-ts
    npm init -y
    ```
2.  **Instalar dependencias:**

    ```bash
    npm install discord.js @discordjs/rest discord-api-types typescript ts-node dotenv
    npm install --save-dev @types/node
    ```
3.  **Configurar TypeScript:** Crea un archivo `tsconfig.json` con el siguiente contenido:

    ```json
    {
      "compilerOptions": {
        "target": "ES2020",
        "module": "CommonJS",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "outDir": "dist"
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules"]
    }
    ```

***

### Estructura del proyecto

Crea la siguiente estructura de carpetas:

```
discord-bot-ts/
├── node_modules/
├── src/
│   └── index.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

***

### Crear el bot

#### 1. Configurar el token

En el archivo `.env`, guarda el token de tu bot:

```env
DISCORD_TOKEN=tu_token_aqui
```

#### 2. Escribir el código del bot

En `src/index.ts`, escribe el siguiente código:

```typescript
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.error('No se encontró el token en el archivo .env.');
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Bot conectado como ${client.user?.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(token);
```

#### 3. Registrar comandos (opcional pero recomendado)

Crea un archivo en `src/register-commands.ts` para registrar comandos en Discord:

```typescript
import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.DISCORD_TOKEN;
const clientId = 'tu_client_id'; // Reemplaza con el ID de tu aplicación

const commands = [
  {
    name: 'ping',
    description: 'Responde con Pong!',
  },
];

if (!token || !clientId) {
  console.error('No se encontró el token o el clientId en el archivo .env.');
  process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Actualizando comandos de aplicación...');

    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log('Comandos registrados correctamente.');
  } catch (error) {
    console.error('Error al registrar comandos:', error);
  }
})();
```

Ejecuta este script con:

```bash
npx ts-node src/register-commands.ts
```

***

### Ejecutar el bot

Inicia el bot con:

```bash
npx ts-node src/index.ts
```

Si todo está configurado correctamente, deberías ver un mensaje en la consola indicando que el bot está conectado.

***

### Probar el bot

1. Invita al bot a tu servidor de Discord utilizando el enlace de OAuth2 desde el [Portal de desarrolladores](https://discord.com/developers/applications).
2. Usa el comando `/ping` en un canal para probar la respuesta del bot.

***

### Recursos adicionales

* [Documentación de Discord.js](https://discord.js.org/#/docs/discord.js/)
* [Guía oficial de bots de Discord](https://discord.com/developers/docs/intro)
* [Node.js](https://nodejs.org/)
* [TypeScript](https://www.typescriptlang.org/docs/)
