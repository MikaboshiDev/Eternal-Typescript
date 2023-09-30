interface Giveaway {
  messageId: string;
  channelId: string;
  guildId: string;
  startAt: number;
  endAt: number;
  ended: boolean;
  winnerCount: number;
  prize: string;
  messages: {
    giveaway: string;
    giveawayEnded: string;
    inviteToParticipate: string;
    drawing: string;
    dropMessage: string;
    winMessage: string;
  };
  durationAfterPause: number;
  infiniteDurationText: string;
  isDrop: boolean;
  allowedMentions: {
    parse: string[] | undefined;
    users: string[] | undefined;
    roles: string[] | undefined;
  };
  embedFooter: string | undefined;
  noWinner: string;
  winners: string;
  endedAt: string;
  hostedBy: string;
  thumbnail: string;
  winnerIds: string[] | undefined;
  reaction: string | undefined;
  botsCanWin: boolean;
  embedColor: string | undefined;
  embedColorEnd: string | undefined;
  exemptPermissions: any[] | undefined;
  exemptMembers: string;
  bonusEntries: string;
  extraData: any;
  lastChance: {
    enabled: boolean;
    content: string;
    threshold: number;
    embedColor: string | undefined;
  };
  pauseOptions: {
    isPaused: boolean;
    content: string;
    unpauseAfter: number;
    embedColor: string | undefined;
  };
}

export { Giveaway }