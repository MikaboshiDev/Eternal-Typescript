import { Giveaway } from '../../../global';
import mongoose, { Mixed } from 'mongoose';

const giveawaySchema = new mongoose.Schema<Giveaway>(
  {
    messageId: String,
    channelId: String,
    guildId: String,
    startAt: Number,
    endAt: Number,
    ended: Boolean,
    winnerCount: Number,
    prize: String,
    messages: {
      giveaway: String,
      giveawayEnded: String,
      inviteToParticipate: String,
      drawing: String,
      dropMessage: String,
      winMessage: String,
        embedFooter: { type: mongoose.Schema.Types.Mixed },
        noWinner: String,
        winners: String,
        endedAt: String,
        hostedBy: String,
      },
      thumbnail: String,
      hostedBy: String,
      winnerIds: { type: [String], default: undefined },
      reaction: { type: mongoose.Schema.Types.Mixed },
      botsCanWin: Boolean,
      embedColor: { type: mongoose.Schema.Types.Mixed },
      embedColorEnd: { type: mongoose.Schema.Types.Mixed },
      exemptPermissions: { type: [], default: undefined },
      exemptMembers: String,
      bonusEntries: String,
      extraData: { type: mongoose.Schema.Types.Mixed },
      lastChance: {
        enabled: Boolean,
        content: String,
        threshold: Number,
        embedColor: { type: mongoose.Schema.Types.Mixed },
    },
    pauseOptions: {
      isPaused: Boolean,
      content: String,
      unpauseAfter: Number,
      embedColor: mongoose.Schema.Types.Mixed,
      durationAfterPause: Number,
      infiniteDurationText: String,
    },
    isDrop: Boolean,
    allowedMentions: {
      parse: { type: [String], default: undefined },
      users: { type: [String], default: undefined },
      roles: { type: [String], default: undefined },
    },
  },
  { id: false }
);

const giveawayModel = mongoose.model('GiveawayDB', giveawaySchema);
export default giveawayModel;
