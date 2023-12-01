import { client } from '../../../shulker';
import { Event } from '../../../structure/builders';

export default new Event('interactionCreate', async (interaction: any) => {
  if (interaction.isContextMenuCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    await command.run(client, interaction, client.paypal);
  }
});
