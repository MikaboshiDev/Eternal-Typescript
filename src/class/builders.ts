import {
   AutocompleteInteraction,
   ChatInputCommandInteraction,
   ClientEvents,
   SlashCommandBuilder,
   SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import { Manager } from '../index';

export interface CommandOptions {
   ownerOnly?: boolean;
   autocomplete?: (
      client: Manager,
      interaction: AutocompleteInteraction
   ) => void;
}

export class Command {
   readonly structure:
      | SlashCommandBuilder
      | SlashCommandSubcommandsOnlyBuilder
      | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
   readonly run: (
      client: Manager,
      interaction: ChatInputCommandInteraction,
      //db: Manager['db']
   ) => void;
   readonly options: CommandOptions | undefined;

   constructor(
      structure:
         | SlashCommandBuilder
         | SlashCommandSubcommandsOnlyBuilder
         | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>,
      run: (
         client: Manager,
         interaction: ChatInputCommandInteraction,
         //db: Manager['db']
      ) => void,
      options?: CommandOptions
   ) {
      this.structure = structure;
      this.run = run;
      this.options = options;
   }
}

export class Event<K extends keyof ClientEvents> {
   readonly event: K;
   readonly run: (...args: ClientEvents[K]) => void;
   readonly once?: boolean;

   constructor(
      event: K,
      run: (...args: ClientEvents[K]) => void,
      once?: boolean
   ) {
      this.event = event;
      this.run = run;
      this.once = once;
   }
}
