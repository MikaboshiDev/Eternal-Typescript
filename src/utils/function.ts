import { EmbedBuilder, GuildMember } from 'discord.js';

export const embed = (message: string, type?: 'error' | 'info' | 'warn' | 'loading' | 'none', footer?: string) => {
  switch (type) {
    case 'error': {
      return new EmbedBuilder()
        .setDescription(message)
        .setFooter(footer ? { text: footer } : null)
        .setColor('Red');
    }

    case 'warn': {
      return new EmbedBuilder()
        .setDescription(message)
        .setFooter(footer ? { text: footer } : null)
        .setColor('Yellow');
    }

    case 'info': {
      return new EmbedBuilder()
        .setDescription(message)
        .setFooter(footer ? { text: footer } : null)
        .setColor('#04fb9b');
    }

    case 'loading': {
      return new EmbedBuilder()
        .setDescription(':arrows_counterclockwise: ' + message)
        .setFooter(footer ? { text: footer } : null);
    }

    default: {
      return new EmbedBuilder().setDescription(message).setFooter(footer ? { text: footer } : null);
    }
  }
};

export const protectedRolesChecker = (member: GuildMember, roles: string[]): boolean => {
  if (!member) return false;
  if (roles.length <= 0) return false;

  let check = false;

  for (const role of roles) {
    if (member.roles.cache.has(role)) {
      check = true;
      break;
    }
  }

  return check;
};
