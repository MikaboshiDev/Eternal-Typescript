import { stripIndent } from 'common-tags';
import { EmbedBuilder, Message } from 'discord.js';
import moment from 'moment';
import fetch from 'node-fetch';
import emojis from '../../../../config/json/emojis.json';
import { logWithLabel } from '../../../utils/console';

module.exports = {
  name: 'npm',
  description: 'search for packages within the npm library registry',
  aliases: ['npm-search', 'npmjs', 'npm-search', 'npm-package', 'npm-package-search'],
  category: 'utility',
  premium: false,
  cooldown: 20,
  examples: ['npm <package name>'],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    try {
      const pkg = args[0];
      if (!pkg)
        return message.reply({
          content: [
            `${emojis.error} The \`package name\` is a required argument that is missing.`,
            `Usage: \`${prefix}npm <package name>\``,
          ].join('\n'),
        });

      const body = await fetch(`https://registry.npmjs.com/${pkg}`).then((res) => {
        if (res.status === 404) throw 'No results found.';
        return res.json();
      });

      const version = body.versions[body['dist-tags'].latest];

      let deps = version.dependencies ? Object.keys(version.dependencies) : null;
      let maintainers = body.maintainers.map((user: any) => user.name);

      if (maintainers.length > 10) {
        const len = maintainers.length - 10;
        maintainers = maintainers.slice(0, 10);
        maintainers.push(`...${len} more.`);
      }

      if (deps && deps.length > 10) {
        const len = deps.length - 10;
        deps = deps.slice(0, 10);
        deps.push(`...${len} more.`);
      }

      const data = stripIndent`
      Name  ::  ${body.name}
      Rev   ::  ${body._rev}
      ID    ::  ${body._id}
      `;

      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`NPM: ${pkg}`)
            .setThumbnail('https://i.imgur.com/ErKf5Y0.png')
            .setColor('Aqua')
            .setFooter({
              text: `Requested by ${message.author.tag}`,
              iconURL: message.author.displayAvatarURL({ forceStatic: true }),
            })
            .setURL(`https://npmjs.com/package/${pkg}`)
            .setAuthor({
              name: 'NPM',
              iconURL: 'https://i.imgur.com/ErKf5Y0.png',
            })
            .setDescription(`> ` + body.description || `${emojis.error} The no assigned description.`)
            .addFields(
              { name: 'Data', value: `\`\`\`asciidoc\n${data}\`\`\``, inline: false },
              {
                name: 'Times',
                value: [
                  `Created at: \`${new Date(body.time.created).toDateString()}\` ${moment(
                    body.time.created
                  ).fromNow()}`,
                  `Modified at: \`${new Date(body.time.modified).toDateString()}\` ${moment(
                    body.time.modified
                  ).fromNow()}`,
                ].join('\n'),
                inline: false,
              },
              { name: 'Maintainers', value: `\`${maintainers.join(', ')}\``, inline: true },
              { name: 'Dependencies', value: `\`${deps ? deps.join(', ') : 'None'}\``, inline: true },
              {
                name: 'Links',
                value: [
                  `Homepage: ${body.homepage ? `[Click here](${body.homepage})` : 'None'}`,
                  `Bugs: ${body.bugs ? `[Click here](${body.bugs.url})` : 'None'}`,
                ].join('\n'),
                inline: false,
              }
            ),
        ],
      });
    } catch (e) {
      logWithLabel('error', `commands/programming/npm.ts:1 ${e}`);
      console.error(e);
    }
  },
};
