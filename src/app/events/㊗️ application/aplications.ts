import { Event } from '../../../class/builders';
import { client } from '../../../shulker';

export default new Event('interactionCreate', async (interaction: any) => {
  if (interaction.isContextMenuCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    await command.run(client, interaction, client.paypal);
  }
});
