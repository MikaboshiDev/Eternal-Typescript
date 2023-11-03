export interface GameOptions {
  emojis: any;
  foods: any;
  othersMessage: any;
  stopButton: any;
  snake: any;
  message: import('discord.js').Message;
  slash_command?: boolean;
  embed?: {
    title?: string;
    color?: string;
    overTitle?: string;
  };
}

export interface GameRocks {
  opponent: any;
  embed: any;
  buttons: any;
  emojis: any;
  askMessage: any;
  cancelMessage: any;
  timeEndMessage: any;
  othersMessage: any;
  chooseMessage: any;
  noChangeMessage: any;
  gameEndMessage: any;
  winMessage: any;
  drawMessage: any;
  message: any;
}
