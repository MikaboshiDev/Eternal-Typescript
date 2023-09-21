import { embed } from '../../../utils/function';
import { Event } from '../../../class/builders';
import { client } from '../../../index';

export default new Event('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand() || !interaction.channel) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  if (command.options?.ownerOnly && interaction.user.id !== process.env.owner_id)
    return interaction.reply({
      embeds: [embed('This command is owner only!', 'error')],
    });

  command.run(client, interaction, client.paypal);
});
