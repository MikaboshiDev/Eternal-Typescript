import {
  ActionRowBuilder,
  AnyComponentBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Message,
  MessageCreateOptions,
  MessagePayload,
} from 'discord.js';
import { GameOptions, GameRocks } from '../../interface/gamecord';
import { logWithLabel } from '../../utils/console';

const possible_words = [
  'medicine',
  'situation',
  'hall',
  'desk',
  'hotel',
  'president',
  'thought',
  'method',
  'village',
  'user',
  'blood',
  'math',
  'highway',
  'agency',
  'intention',
  'marriage',
  'poet',
  'student',
  'pollution',
  'office',
  'insurance',
  'person',
  'health',
  'session',
  'warning',
  'attitude',
  'analysis',
  'trainer',
  'paper',
  'attention',
  'currency',
  'chocolate',
  'depth',
  'dealer',
  'dinner',
  'night',
  'drawer',
  'tennis',
  'singer',
  'virus',
  'college',
  'oven',
  'uncle',
  'arrival',
  'recording',
  'sector',
  'flight',
  'emotion',
  'meaning',
  'moment',
  'elevator',
  'lab',
  'teaching',
  'ad',
  'sister',
  'artisan',
  'memory',
  'studio',
  'goal',
  'currency',
  'employer',
  'camera',
  'marketing',
  'quantity',
  'clothes',
  'tale',
  'leader',
  'solution',
  'cousin',
  'republic',
  'signature',
  'idea',
  'moment',
  'basket',
  'homework',
  'hospital',
  'direction',
  'potato',
  'death',
  'scene',
  'committee',
  'version',
  'childhood',
  'manager',
  'menu',
  'mud',
  'people',
  'love',
  'king',
  'drawing',
  'housing',
  'hearing',
  'insect',
  'lake',
  'gate',
  'GUILD_CATEGORY',
  'theory',
  'movie',
  'inflation',
  'media',
  'arrival',
  'week',
  'outcome',
  'health',
  'recipe',
  'payment',
  'oven',
  'inspector',
  'intention',
  'song',
  'apartment',
  'dirt',
  'food',
  'medicine',
  'growth',
  'funeral',
  'concept',
  'throat',
  'reality',
  'mud',
  'awareness',
  'sister',
  'context',
  'cancer',
  'actor',
  'bread',
  'basis',
  'reading',
  'college',
  'climate',
  'theory',
  'industry',
  'idea',
  'volume',
  'region',
  'hearing',
  'security',
  'clothes',
  'director',
  'data',
  'opinion',
  'confusion',
  'camera',
  'sympathy',
  'signature',
  'complaint',
  'message',
  'wealth',
  'drawing',
  'secretary',
  'wing',
  'uppity',
  'shallow',
  'wrist',
  'body',
  'develop',
  'ground',
  'snails',
  'squealing',
  'drug',
  'army',
  'sad',
  'cherries',
  'rabbit',
  'rock',
  'helpless',
  'flowers',
  'cows',
  'ready',
  'zany',
  'yellow',
  'save',
  'listen',
  'accidental',
  'tacky',
  'horrible',
  'flagrant',
  'nervous',
  'flock',
  'bear',
  'cure',
  'bag',
  'mom',
  'cup',
  'wed',
  'letter',
  'eggs',
  'illumine',
  'sheet',
  'dusty',
  'frogs',
  'aboard',
  'bed',
  'reply',
  'receipt',
  'grandiose',
  'shrill',
  'new',
  'dump',
  'painstaking',
  'journey',
  'month',
  'passenger',
  'scam',
  'tree',
  'determine',
  'town',
  'hinder',
  'book',
  'mammoth',
  'shun',
  'resemble',
  'face',
  'toys',
  'card',
  'act',
  'zonked',
  'ill',
  'foretell',
  'tame',
  'encouraging',
  'action',
  'possessive',
  'imperfect',
  'angle',
  'determined',
  'present',
  'contract',
  'waggish',
  'lazy',
  'produce',
  'mute',
  'spectacular',
  'restrain',
  'time',
  'horn',
  'thought',
  'special',
  'physical',
  'boil',
  'lock',
  'accurate',
  'bridge',
  'confuse',
  'fiction',
  'airplane',
  'placid',
  'team',
  'serious',
  'dependent',
  'crave',
  'girl',
  'burn',
  'blow',
  'separate',
  'person',
  'cower',
  'vomit',
  'run',
  'stretch',
  'handy',
  'efficient',
  'stitch',
  'hoax',
  'blush',
  'net',
  'far',
  'fax',
  'boy',
  'doctor',
  'cellar',
  'knotty',
  'compare',
  'view',
  'sew',
  'madly',
  'chubby',
  'damp',
  'touch',
  'numberless',
  'halting',
  'innocent',
  'glance',
  'insure',
  'cup',
  'crack',
  'mature',
  'instrument',
  'google',
  'engine',
  'damage',
  'burst',
  'rampant',
  'describe',
  'observant',
  'exchange',
  'penitent',
  'intelligent',
  'install',
  'courageous',
  'terrible',
  'agreeable',
  'system',
  'inspire',
  'pretty',
  'book',
  'bell',
  'teach',
  'step',
  'rend',
  'curve',
  'squealing',
  'act',
  'dispensable',
  'ants',
  'gabby',
  'jar',
  'pollute',
  'hair',
  'request',
  'omit',
  'conduct',
  'afterthought',
  'axiomatic',
  'earthquake',
  'convey',
  'fall',
  'irritating',
  'peep',
  'fortunate',
  'capture',
  'sever',
  'burn',
  'egg',
  'dusty',
  'aromatic',
  'stranger',
  'self',
  'compete',
  'busy',
  'sack',
  'vase',
  'conduct',
  'overtake',
  'colour',
  'appliance',
  'shut',
  'base',
  'history',
  'rot',
  'uptight',
  'contest',
  'clever',
  'dwell',
  'quince',
  'lunchroom',
  'carpenter',
  'animate',
  'fallacious',
  'evaporate',
  'mean',
  'present',
  'fertile',
  'painful',
  'window',
  'knotty',
  'complain',
  'willing',
  'spy',
  'bind',
  'stupendous',
  'nourish',
  'thinkable',
  'satisfying',
  'feigned',
  'superb',
  'makeshift',
  'ducks',
  'show',
  'warlike',
  'let',
  'brave',
  'convert',
  'resolute',
  'innovate',
  'irate',
  'limping',
  'omniscient',
  'conclude',
  'thing',
  'mind',
  'snakes',
  'finger',
  'whole',
  'brave',
  'existence',
  'bird',
  'obstruct',
  'snobbish',
  'acquire',
  'certain',
  'rough',
  'pay',
  'star',
  'squirrel',
  'sash',
  'alluring',
  'efficacious',
  'snobbish',
  'fierce',
  'lavish',
  'naughty',
  'crime',
  'insidious',
  'entertaining',
  'threatening',
  'tense',
  'abash',
  'nimble',
  'wiry',
  'disobey',
  'walk',
  'dwell',
  'greedy',
  'drop',
  'give',
  'parcel',
  'secret',
  'expect',
  'inscribe',
  'want',
  'hunt',
  'purring',
  'pastoral',
  'taste',
  'exchange',
  'dry',
  'many',
  'see',
  'sew',
  'laugh',
  'condition',
  'violate',
  'psychedelic',
  'pathetic',
  'fair',
  'cover',
  'cling',
  'greet',
  'pump',
  'boys',
  'sulky',
  'quickest',
  'hanging',
  'mammoth',
  'glance',
  'alarm',
  'engine',
  'grandiose',
  'guarded',
  'prohibit',
  'invite',
  'vigorous',
  'split',
  'agreeable',
  'modify',
  'nasty',
  'trousers',
  'sail',
  'defective',
  'shame',
  '',
  'pest',
  'friendly',
  'tap',
  'stimulating',
  'apply',
  'disuse',
  'education',
  'collect',
  'apply',
  'infamous',
  'chide',
  'grade',
  'fantastic',
  'educat',
  'touch',
  'carve',
  'conserve',
  'join',
  'appear',
  'quilt',
  'silly',
  'rewind',
  'smell',
  'ordinary',
  'historical',
  'wring',
  'frame',
  'lumpy',
  'powerful',
  'leap',
  'crowd',
  'ducks',
  'husky',
  'amazing',
  'invite',
  'thirsty',
  'fretful',
  'undesirable',
  'month',
  'racial',
  'marble',
  'erase',
  'love',
  'nutritious',
  'implant',
  'renounce',
  'shocking',
  'awake',
  'participate',
  'harsh',
  'satirise',
  'carry',
  'bored',
  'fortunate',
  'display',
  'light',
  'wilderness',
  'tacit',
  'distance',
  'enter',
  'inject',
  'comment',
  'rain',
  'type',
  'adamant',
  'steam',
  'taste',
  'mice',
  'grind',
  'sweltering',
  'debonair',
  'song',
  'fight',
  'idealize',
  'boil',
  'consort',
  'note',
  'grubby',
  'awesome',
  'ooze',
  'puzzling',
  'purify',
  'convict',
  'lyrical',
  'resolute',
  'tender',
  'imaginary',
  'catch',
  'chunky',
  'watch',
  'see',
  'climb',
  'behold',
  'spurious',
  'leg',
  'taboo',
  'overwrought',
  'furry',
  'tax',
  'amazing',
  'straight',
  'month',
  'review',
  'door',
  'obscene',
  'outstanding',
  'find',
  'ambitious',
  'distance',
  'next',
  'match',
  'wet',
  'blush',
  'berserk',
  'come',
  'super',
  'nutty',
  'urge',
  'snap',
  'tender',
  'verify',
  'airport',
  'nervous',
  'shed',
  'cave',
  'dwell',
  'dead',
  'boast',
  'territory',
  'fine',
  'love',
  'trade',
  'fragile',
  'station',
  'impose',
  'cough',
  'nappy',
  'shout',
  'colour',
  'change',
  'nifty',
  'vengeful',
  'scientific',
  'heat',
  'inflame',
  'giants',
  'toy',
  'imbibe',
  'women',
  'crack',
  'idea',
  'scale',
  'observation',
  'stereotyped',
  'shelf',
  'obsequious',
  'shock',
  'chin',
  'banish',
  'convey',
  'signify',
  'curve',
  'stingy',
  'jumbled',
  'stew',
  'corn',
  'instrument',
  'sew',
  'propose',
  'smite',
  'ruthless',
  'weep',
  'assert',
  'test',
  'shake',
  'knee',
  'burly',
  'head',
  'slam',
  'misty',
  'cattle',
  'goofy',
  'astonish',
  'cherry',
  'copper',
  'feet',
  'class',
  'prose',
  'perpetual',
  'common',
  'rewind',
  'place',
  'skillful',
  'sort',
  'join',
  'reduce',
  'country',
  'overflow',
  'placid',
  'respect',
  'clammy',
  'jewel',
  'milk',
  'park',
  'self',
  'smash',
  'die',
  'toy',
  'bloody',
  'romantic',
  'implode',
  'add',
  'change',
  'transfer',
  'fairies',
  'vast',
  'week',
  'sloppy',
  'transport',
  'pour',
  'protest',
  'boundary',
  'dispose',
  'degree',
  'inspire',
  'scabble',
  'highfalutin',
  'makeshift',
  'shut',
  'butter',
  'fail',
  'available',
  'behold',
  'bustling',
  'smash',
  'waste',
  'saunter',
  'poised',
  'yarn',
  'cower',
  'stink',
  'weak',
  'humor',
  'sharp',
  'relax',
  'spotty',
  'true',
  'closed',
  'jam',
  'ship',
  'damp',
  'nifty',
  'dock',
  'cast',
  'hydrant',
  'state',
  'thing',
  'gleaming',
  'bite',
  'invention',
  'left',
  'eager',
  'vex',
  'hurt',
  'imagine',
  'gamy',
  'zinc',
  'scam',
  'camera',
  'cracker',
  'bright',
  'teeny',
  'riddle',
  'acid',
  'choose',
  'man',
  'swell',
  'charge',
  'recast',
  'inflame',
  'living',
  'spiky',
  'man',
  'brush',
  'gainsay',
  'blow',
  'migrate',
  'sink',
  'terrify',
  'destroy',
  'normal',
  'steadfast',
  'insurance',
  'loving',
  'changeable',
  'pencil',
  'beautify',
  'compete',
  'pen',
  'roar',
  'marry',
  'glamorous',
  'rampant',
  'tree',
  'powerful',
  'love',
  'print',
  'macho',
  'implant',
  'example',
  'creepy',
  'vast',
  'death',
  'alert',
  'gullible',
  'scab',
  'delay',
  'jelly',
  'shake',
  'open',
  'dock',
  'rule',
  'robust',
  'corrod',
  'farmer',
  'faint',
  'jobless',
  'selection',
  'beg',
  'guide',
  'large',
  'police',
  'future',
  'vulgar',
  'complain',
  'color',
  'damaging',
  'blood',
  'oppress',
  'sulky',
  'lawyer',
  'wren',
  'sleep',
  'grade',
  'nimble',
  'direful',
  'cute',
  'exist',
  'chairs',
  'push',
  'discreet',
  'vex',
  'curtain',
  'counsel',
  'holiday',
  'discover',
  'limit',
  'measly',
  'love',
  'observe',
  'omit',
  'alcoholic',
  'wash',
  'meet',
  'far',
  'pencil',
  'redundant',
  'organic',
  'gamy',
  'tough',
  'warn',
  'linen',
  'beast',
  'fall',
  'expensive',
  'cannon',
  'kill',
  'flower',
  'illegal',
  'town',
  'functional',
  'whispering',
  'right',
  'relax',
  'quick',
  'detect',
  'mellow',
  'sassy',
  'lovely',
  'quince',
  'table',
  'guard',
  'ring',
  'tidy',
  'place',
  'cheap',
  'disgust',
  'quill',
  'unused',
  'decorous',
  'station',
  'purring',
  'store',
  'dapper',
  'separate',
  'trail',
  'push',
  'cause',
  'ready',
  'forbid',
  'relax',
  'legs',
  'rise',
  'save',
  'return',
  'stitch',
  'quartz',
  'brush',
  'female',
  'run',
  'flop',
  'grandmother',
  'healthy',
  'spring',
  'grain',
  'difficult',
  'incise',
  'fight',
  'abject',
  'voracious',
  'dapper',
  'sound',
  'pest',
  'greet',
  'writer',
  'enlighten',
  'store',
  'bet',
  'lyrical',
  'reuse',
  'ignore',
  'melt',
  'week',
  'relate',
  'curvy',
  'silent',
  'heavenly',
  'leather',
  'gabby',
  'endorse',
  'abrasive',
  'read',
  'son',
  'club',
  'coil',
  'bash',
  'godly',
  'ragged',
  'mould',
  'promise',
  'bait',
  'gainsay',
  'book',
  'dash',
  'clumsy',
  'gain',
  'disagreeable',
  'chat',
  'lacking',
  'scab',
  'shaggy',
  'resolve',
  'telling',
  'renew',
  'roar',
  'learning',
  'reduce',
  'piquant',
  'scale',
  'creator',
  'tart',
  'happy',
  'learned',
  'measure',
  'correct',
  'crush',
  'cope',
  'art',
  'country',
  'thump',
  'contrive',
  'elegant',
  'mailbox',
  'symptomatic',
  'scant',
  'letter',
  'lick',
  'conquer',
  'suppose',
  'exclude',
  'female',
  'bustling',
  'show',
  'needy',
  'beautiful',
  'representative',
  'imperil',
  'learning',
  'growth',
  'bashful',
  'kid',
  'carry',
  'retain',
  'set',
  'careless',
  'frantic',
  'touch',
  'wave',
  'dwell',
  'leap',
  'agree',
  'ball',
  'pardon',
  'beggar',
  'frame',
  'soda',
  'scared',
  'swim',
  'statement',
  'contribute',
  'dynamic',
  'fallacious',
  'install',
  'tiresome',
  'beseech',
  'abate',
  'fallacious',
  'bray',
  'cable',
  'cost',
  'foot',
  'chicken',
  'balloon',
  'sidewalk',
  'classify',
  'tough',
  'sheep',
  'bit',
  'tender',
  'beneficial',
  'flippant',
  'attractive',
  'magnificent',
  'pricey',
  'illegal',
  'fierce',
  'stitch',
  'like',
  'suffer',
  'break',
  'feast',
  'hill',
  'mammoth',
  'spotted',
  'wise',
  'stupid',
  'collapse',
  'sail',
  'plucky',
  'impinge',
  'expert',
  'flop',
  'harsh',
  'hammer',
  'concerned',
  'battle',
  'sag',
  'break',
  'honorable',
  'salvage',
  'aspiring',
  'abiding',
  'cautious',
  'breakable',
  'normal',
  'sleep',
  'assorted',
  'float',
  'medical',
  'birds',
  'adjustment',
  'hate',
  'contrive',
  'coast',
  'shiver',
  'invent',
  'exuberant',
  'fixed',
  'friends',
  'visitor',
  'motivate',
  'dolls',
  'tax',
  'subtract',
  'lazy',
  'crime',
  'disobey',
  'resonant',
  'ugliest',
  'daughter',
  'representative',
  'snow',
  'envious',
  'growth',
  'father',
  'racial',
  'persuade',
  'rich',
  'scan',
  'throw',
  'coil',
  'hapless',
  'paint',
  'elderly',
  'compare',
  'teach',
  'fetch',
  'winter',
  'hurried',
  'historical',
  'party',
  'comfortable',
  'saponify',
  'sink',
  'profit',
  'sticky',
  'heavenly',
  'aloof',
  'find',
  'encourage',
  'boorish',
  'impress',
  'force',
  'family',
  'fight',
  'handy',
  'stem',
  'far',
  'desk',
  'discreet',
  'five',
  'robust',
  'thrive',
  'murmur',
  'far',
  'obeisant',
  'venomous',
  'versed',
  'bash',
  'earsplitting',
  'beggar',
  'guarded',
  'disturbed',
  'solicit',
  'forlese',
  'great',
  'friend',
];

const letterEmojisMap: { [key: string]: string } = {
  '🅰️': 'A',
  '🇦': 'A',
  '🅱️': 'B',
  '🇧': 'B',
  '🇨': 'C',
  '🇩': 'D',
  '🇪': 'E',
  '🇫': 'F',
  '🇬': 'G',
  '🇭': 'H',
  ℹ️: 'I',
  '🇮': 'I',
  '🇯': 'J',
  '🇰': 'K',
  '🇱': 'L',
  'Ⓜ️': 'M',
  '🇲': 'M',
  '🇳': 'N',
  '🅾️': 'O',
  '⭕': 'O',
  '🇴': 'O',
  '🅿️': 'P',
  '🇵': 'P',
  '🇶': 'Q',
  '🇷': 'R',
  '🇸': 'S',
  '🇹': 'T',
  '🇺': 'U',
  '🇻': 'V',
  '🇼': 'W',
  '✖️': 'X',
  '❎': 'X',
  '❌': 'X',
  '🇽': 'X',
  '🇾': 'Y',
  '💤': 'Z',
  '🇿': 'Z',
};

function disableButtons(components: any) {
  for (let x = 0; x < components.length; x++) {
    for (let y = 0; y < components[x].components.length; y++) {
      components[x].components[y].setDisabled(true);
    }
  }
  return components;
}

const WIDTH = 15;
const HEIGHT = 10;

async function verify(options: any) {
  return new Promise(async (res, rej) => {
    const message = options.message;
    const opponent = options.opponent;

    const askEmbed = new EmbedBuilder()
      .setTitle(options.embed.askTitle || options.embed.title)
      .setDescription(
        options.askMessage.replace('{challenger}', message.author.toString()).replace('{opponent}', opponent.toString())
      )
      .setColor(options.colors?.green || options.embed.color);

    const btn1 = new ButtonBuilder()
      .setLabel(options.buttons?.accept || 'Accept')
      .setStyle(ButtonStyle.Success)
      .setDisabled(false)
      .setCustomId('accept');
    const btn2 = new ButtonBuilder()
      .setLabel(options.buttons?.reject || 'Reject')
      .setDisabled(false)
      .setStyle(ButtonStyle.Danger)
      .setCustomId('reject');
    const row = new ActionRowBuilder().addComponents(btn1, btn2);

    let askMsg: {
      createMessageComponentCollector: (arg0: { filter: (interaction: any) => boolean; time: number }) => any;
      delete: () => Promise<any>;
      edit: (arg0: { embeds: EmbedBuilder[]; components: string | any[] }) => any;
      components: string | any[];
    };
    if (options.slash_command) askMsg = await message.editReply({ embeds: [askEmbed], components: [row] });
    else askMsg = await message.channel.send({ embeds: [askEmbed], components: [row] });

    const filter = (interaction: any) => interaction === interaction;
    const interaction = askMsg.createMessageComponentCollector({
      filter,
      time: 30000,
    });

    await interaction?.on(
      'collect',
      async (btn: {
        user: { id: any };
        reply: (arg0: { content: any; ephemeral: boolean }) => any;
        deferUpdate: () => any;
        customId: any;
      }) => {
        if (btn.user.id !== opponent.id)
          return btn.reply({ content: options.othersMessage.replace('{author}', opponent.tag), ephemeral: true });

        await btn.deferUpdate();
        interaction?.stop(btn.customId);
      }
    );

    await interaction?.on('end', (_: any, r: string) => {
      if (r === 'accept') {
        if (!options.slash_command) askMsg.delete().catch();
        return res(true);
      }

      const cancelEmbed = new EmbedBuilder()
        .setTitle(options.embed.cancelTitle || options.embed.title)
        .setDescription(
          options.cancelMessage
            .replace('{challenger}', message.author.toString())
            .replace('{opponent}', opponent.toString())
        )
        .setColor(options.colors?.red || options.embed.color);

      if (r === 'time') {
        cancelEmbed.setDescription(
          options.timeEndMessage
            .replace('{challenger}', message.author.toString())
            .replace('{opponent}', opponent.toString())
        );
      }

      res(false);
      return askMsg.edit({ embeds: [cancelEmbed], components: [] });
    });
  });
}

export class HangmanGame {
  gameEmbed: null;
  inGame: boolean;
  word: string;
  guesssed: never[];
  wrongs: number;
  constructor() {
    this.gameEmbed = null;
    this.inGame = false;
    this.word = '';
    this.guesssed = [];
    this.wrongs = 0;
  }

  newGame(msg: any) {
    if (this.inGame) return;
    this.inGame = true;
    this.word = possible_words[Math.floor(Math.random() * possible_words.length)].toUpperCase();
    this.guesssed = [];
    this.wrongs = 0;

    const embed = new EmbedBuilder()
      .setColor('#2f3136')
      .setAuthor({
        name: 'Hangman Minigame',
        iconURL: 'https://imgur.com/0guxxtY.png',
        url: 'https://discord.gg/milrato',
      })
      .addFields(
        {
          name: 'Letters Guessed',
          value: this.guesssed.length == 0 ? '\u200b' : this.guesssed.join(' '),
        },
        { name: 'How To Play', value: 'React to this message using the emojis that look like letters (🅰️, 🇹, )' }
      )
      .setDescription(this.getDescription());

    console.log('\n\n\n\n\n\n\n\n\n\nNEW HANGMAN GAME\n\n' + this.word + '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');

    msg.channel.send({ embeds: [embed] }).then((emsg: null) => {
      this.gameEmbed = emsg;
      this.waitForReaction();
    });
  }

  makeGuess(reaction: string) {
    if (Object.keys(letterEmojisMap).includes(reaction)) {
      const letter = letterEmojisMap[reaction];
      if (!this.guesssed.includes(letter as never)) {
        this.guesssed.push(letter as never);

        if (this.word.indexOf(letter) == -1) {
          this.wrongs++;

          if (this.wrongs == 6) {
            this.gameOver(false);
          }
        } else if (
          !this.word
            .split('')
            .map((l) => (this.guesssed.includes(l as never) ? l : '_'))
            .includes('_')
        ) {
          this.gameOver(true);
        }
      }
    }

    if (this.inGame) {
      const editEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setTitle('Hangman Minigame')
        .setDescription(this.getDescription())
        .addFields(
          { name: 'Letters Guessed', value: this.guesssed.length == 0 ? '\u200b' : this.guesssed.join(' ') },
          {
            name: 'How To Play',
            value: 'React to this message using the emojis that look like letters (🅰️, 🇹, )',
          }
        );

      (this.gameEmbed as any).edit({ embeds: [editEmbed] });
      this.waitForReaction();
    }
  }

  gameOver(win: boolean) {
    this.inGame = false;
    const editEmbed = new EmbedBuilder()
      .setColor('Red')
      .setAuthor({
        name: 'Hangman Minigame',
        iconURL: 'https://imgur.com/0guxxtY.png',
        url: 'https://discord.gg/milrato',
      })
      .setDescription(win ? '**Chat Wins!**' : '**Chat losses**')
      .addFields({ name: 'Word', value: this.word }, { name: 'Letters Guessed', value: this.guesssed.join(' ') });

    (this.gameEmbed as any).edit({ embeds: [editEmbed] });
    (this.gameEmbed as any).reactions.removeAll();
  }

  getDescription() {
    return (
      '```' +
      '|‾‾‾‾‾‾|   \n|     ' +
      (this.wrongs > 0 ? '🎩' : ' ') +
      '   \n|     ' +
      (this.wrongs > 1 ? '😟' : ' ') +
      '   \n|     ' +
      (this.wrongs > 2 ? '👕' : ' ') +
      '   \n|     ' +
      (this.wrongs > 3 ? '🩳' : ' ') +
      '   \n|    ' +
      (this.wrongs > 4 ? '👞👞' : ' ') +
      '   \n|     \n|__________\n\n' +
      this.word
        .split('')
        .map((l) => (this.guesssed.includes(l as never) ? l : '_'))
        .join(' ') +
      '```'
    );
  }

  waitForReaction() {
    (this.gameEmbed as any)
      .awaitReactions({ filter: () => true, max: 1, time: 300000, errors: ['time'] })
      .then((collected: { first: () => any }) => {
        const reaction = collected.first();
        this.makeGuess(reaction.emoji?.name);
        reaction.remove();
      })
      .catch((collected: any) => {
        this.gameOver(false);
      });
  }
}

export class SnakeGame {
  snake: { x: number; y: number }[];
  apple: { x: number; y: number };
  snakeLength: number;
  isInGame: boolean;
  options: GameOptions;
  message: Message<boolean>;
  gameBoard: never[];
  score: number;
  constructor(
    options: GameOptions = {
      message: {} as Message<boolean>,
      snake: undefined,
      emojis: undefined,
      foods: undefined,
      othersMessage: undefined,
      stopButton: undefined,
    }
  ) {
    if (!options.message) throw new TypeError('NO_MESSAGE: Please provide a message arguement');
    if (typeof options.message !== 'object')
      throw new TypeError('INVALID_MESSAGE: Invalid Discord Message object was provided.');
    if (!options.slash_command) options.slash_command = false;
    if (typeof options.slash_command !== 'boolean')
      throw new TypeError('INVALID_COMMAND_TYPE: Slash command must be a boolean.');

    if (!options.embed) options.embed = {};
    if (!options.embed.title) options.embed.title = 'Snake';
    if (typeof options.embed.title !== 'string') throw new TypeError('INVALID_TITLE: Embed Title must be a string.');
    if (!options.embed.color) options.embed.color = '#5865F2';
    if (typeof options.embed.color !== 'string') throw new TypeError('INVALID_COLOR: Embed Color must be a string.');
    if (!options.embed.overTitle) options.embed.overTitle = 'Game Over';
    if (typeof options.embed.overTitle !== 'string')
      throw new TypeError('INVALID_OVER_TITLE: Over Title must be a string.');

    if (!options.snake) options.snake = {};
    if (!options.snake.head) options.snake.head = '🟢';
    if (typeof options.snake.head !== 'string')
      throw new TypeError('INVALID_EMOJI: Snake Head Emoji must be a string.');
    if (!options.snake.body) options.snake.body = '🟩';
    if (typeof options.snake.body !== 'string')
      throw new TypeError('INVALID_EMOJI: Snake Body Emoji must be a string.');
    if (!options.snake.tail) options.snake.tail = '🟢';
    if (typeof options.snake.tail !== 'string')
      throw new TypeError('INVALID_EMOJI: Snake Tail Emoji must be a string.');
    if (!options.snake.over) options.snake.over = '💀';
    if (typeof options.snake.over !== 'string')
      throw new TypeError('INVALID_EMOJI: Snake Tail Emoji must be a string.');

    if (!options.emojis) options.emojis = {};
    if (!options.emojis.board) options.emojis.board = '⬛';
    if (typeof options.emojis.board !== 'string') throw new TypeError('INVALID_EMOJI: Board Emoji must be a string.');
    if (!options.emojis.food) options.emojis.food = '🍎';
    if (typeof options.emojis.food !== 'string') throw new TypeError('INVALID_EMOJI: Food Emoji must be a string.');

    if (!options.emojis.up) options.emojis.up = '⬆️';
    if (typeof options.emojis.up !== 'string') throw new TypeError('INVALID_EMOJI: Up Emoji must be a string.');
    if (!options.emojis.left) options.emojis.left = '⬅️';
    if (typeof options.emojis.left !== 'string') throw new TypeError('INVALID_EMOJI: Up Emoji must be a string.');
    if (!options.emojis.down) options.emojis.down = '⬇️';
    if (typeof options.emojis.down !== 'string') throw new TypeError('INVALID_EMOJI: Up Emoji must be a string.');
    if (!options.emojis.right) options.emojis.right = '➡️';
    if (typeof options.emojis.right !== 'string') throw new TypeError('INVALID_EMOJI: Up Emoji must be a string.');

    if (!options.foods) options.foods = [];
    if (typeof options.foods !== 'object') throw new TypeError('INVALID_FOODS: Foods Emojis must be a array.');

    if (!options.othersMessage) options.othersMessage = 'You are not allowed to use buttons for this message!';
    if (typeof options.othersMessage !== 'string')
      throw new TypeError('INVALID_OTHERS_MESSAGE: Others Message must be a string.');
    if (!options.stopButton) options.stopButton = 'Stop';
    if (typeof options.stopButton !== 'string')
      throw new TypeError('INVALID_STOP_BUTTON: Stop Button must be a string.');

    this.snake = [{ x: 5, y: 5 }];
    this.apple = { x: 1, y: 1 };
    this.snakeLength = 1;
    this.isInGame = false;
    this.options = options;
    this.message = options.message;
    this.gameBoard = [];
    this.score = 0;

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        (this.gameBoard as any)[y * WIDTH + x] = this.options.emojis.board;
      }
    }
  }

  getGameBoard() {
    let str = '';
    let emojis = this.options.snake;

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        if (x == this.apple.x && y == this.apple.y) {
          str += this.options.emojis.food;
          continue;
        }

        let flag = true;
        for (let s = 0; s < this.snake.length; s++) {
          if (x === this.snake[s].x && y === this.snake[s].y) {
            if (s == 0) {
              if (this.isInGame || this.score == HEIGHT * WIDTH) str += emojis.head;
              else str += emojis.over;
            } else if (s === this.snake.length - 1) {
              str += emojis.tail;
            } else {
              str += emojis.body;
            }
            flag = false;
          }
        }

        if (flag) str += this.gameBoard[y * WIDTH + x];
      }
      str += '\n';
    }
    return str;
  }

  checkSnake(pos: { x: any; y: any }) {
    return this.snake.find((sPos) => sPos.x == pos.x && sPos.y == pos.y);
  }

  newFoodLoc() {
    let newApplePos = { x: 0, y: 0 };
    do {
      newApplePos = { x: Math.floor(Math.random() * WIDTH), y: Math.floor(Math.random() * HEIGHT) };
    } while (this.checkSnake(newApplePos));

    if (this.options.foods.length) {
      this.options.emojis.food = this.options.foods[Math.floor(Math.random() * this.options.foods.length)];
    }

    this.apple.x = newApplePos.x;
    this.apple.y = newApplePos.y;
  }

  async sendMessage(content: string | MessagePayload | MessageCreateOptions) {
    if (this.options.slash_command) return await this.message.edit(content as any);
    return await this.message.channel.send(content);
  }

  async startGame() {
    const emojis = this.options.emojis;

    this.isInGame = true;
    this.snakeLength = 1;
    this.snake = [{ x: 5, y: 5 }];
    this.newFoodLoc();

    const embed = new EmbedBuilder()
      .setColor(this.options.embed?.color as any)
      .setTitle(this.options.embed?.title as any)
      .setDescription('**Score:** ' + this.score + '\n\n' + this.getGameBoard())
      .setFooter({
        text: this.message.author.tag,
        iconURL: this.message.author.displayAvatarURL({ forceStatic: true }),
      });

    const up = new ButtonBuilder()
      .setEmoji(emojis.up)
      .setStyle(ButtonStyle.Primary)
      .setDisabled(false)
      .setCustomId('snake_up');
    const left = new ButtonBuilder()
      .setEmoji(emojis.left)
      .setStyle(ButtonStyle.Primary)
      .setDisabled(false)
      .setCustomId('snake_left');
    const down = new ButtonBuilder()
      .setEmoji(emojis.down)
      .setStyle(ButtonStyle.Primary)
      .setDisabled(false)
      .setCustomId('snake_down');
    const right = new ButtonBuilder()
      .setEmoji(emojis.right)
      .setStyle(ButtonStyle.Primary)
      .setDisabled(false)
      .setCustomId('snake_right');
    const stop = new ButtonBuilder()
      .setLabel(this.options.stopButton)
      .setStyle(ButtonStyle.Danger)
      .setDisabled(false)
      .setCustomId('snake_stop');

    const dis1 = new ButtonBuilder()
      .setLabel('\u200b')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId('dis1')
      .setDisabled(true);
    const dis2 = new ButtonBuilder()
      .setLabel('\u200b')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId('dis2')
      .setDisabled(true);

    const row1 = new ActionRowBuilder().addComponents(dis1, up, dis2, stop);
    const row2 = new ActionRowBuilder().addComponents(left, down, right);

    const msg = await this.sendMessage({ embeds: [embed], components: [row1, row2 as any] });

    this.ButtonInteraction(msg);
  }

  move(msg: { edit: (arg0: { embeds: EmbedBuilder[]; components: any }) => void; components: any }) {
    if (this.apple.x == this.snake[0].x && this.apple.y == this.snake[0].y) {
      this.score += 1;
      this.snakeLength++;
      this.newFoodLoc();
    }

    const moveEmbed = new EmbedBuilder()
      .setColor(this.options.embed?.color as any)
      .setTitle(this.options.embed?.title as any)
      .setDescription('**Score:** ' + this.score + '\n\n' + this.getGameBoard())
      .setFooter({
        text: this.message.author.tag,
        iconURL: this.message.author.displayAvatarURL({ forceStatic: true }),
      });

    msg.edit({ embeds: [moveEmbed], components: msg.components });
  }

  async gameOver(msg: {
    edit: (arg0: { embeds: EmbedBuilder[]; components: string | any[] }) => any;
    components: string | any[];
  }) {
    this.isInGame = false;
    const text = '**' + this.options.embed?.overTitle + '\nScore: **' + this.score.toString();

    const editEmbed = new EmbedBuilder()
      .setColor(this.options.embed?.color as any)
      .setTitle(this.options.embed?.title as any)
      .setDescription(text + '\n\n' + this.getGameBoard())
      .setFooter({
        text: this.message.author.tag,
        iconURL: this.message.author.displayAvatarURL({ forceStatic: true }),
      });

    return await msg.edit({ embeds: [editEmbed], components: [] });
  }

  ButtonInteraction(msg: {
    createMessageComponentCollector?: any;
    edit?:
      | ((arg0: { embeds: EmbedBuilder[]; components: any }) => void)
      | ((arg0: { embeds: EmbedBuilder[]; components: string | any[] }) => any);
    components?: any;
  }) {
    const filter = (m: any) => m;
    const collector = msg.createMessageComponentCollector({
      filter,
      idle: 60000,
    });

    collector.on(
      'collect',
      async (btn: {
        user: { id: string };
        reply: (arg0: { content: any; ephemeral: boolean }) => any;
        deferUpdate: () => any;
        customId: string;
      }) => {
        if (btn.user.id !== this.message.author.id)
          return btn.reply({
            content: this.options.othersMessage.replace('{author}', this.message.author.tag),
            ephemeral: true,
          });

        await btn.deferUpdate();
        const snakeHead = this.snake[0];
        const nextPos = { x: snakeHead.x, y: snakeHead.y };

        if (btn.customId === 'snake_left') {
          let nextX = snakeHead.x - 1;

          if (nextX < 0) {
            nextPos.x = 0;
            return this.gameOver(msg as any);
          }
          nextPos.x = nextX;
        } else if (btn.customId === 'snake_right') {
          let nextX = snakeHead.x + 1;

          if (nextX >= WIDTH) {
            nextPos.x = WIDTH - 1;
            return this.gameOver(msg as any);
          }
          nextPos.x = nextX;
        } else if (btn.customId === 'snake_up') {
          let nextY = snakeHead.y - 1;

          if (nextY < 0) {
            nextPos.y = 0;
            return this.gameOver(msg as any);
          }
          nextPos.y = nextY;
        } else if (btn.customId === 'snake_down') {
          let nextY = snakeHead.y + 1;

          if (nextY >= HEIGHT) {
            nextPos.y = HEIGHT - 1;
            return this.gameOver(msg as any);
          }
          nextPos.y = nextY;
        } else if (btn.customId === 'snake_stop') {
          this.gameOver(msg as any);
          return collector.stop();
        }

        if (this.checkSnake(nextPos)) {
          this.gameOver(msg as any);
        } else {
          this.snake.unshift(nextPos);
          if (this.snake.length > this.snakeLength) this.snake.pop();

          this.move(msg as any);
        }
      }
    );

    collector.on('end', async () => {
      if (this.isInGame == true) this.gameOver(msg as any);
    });
  }
}

export class TicTacToe {
  xEmoji: any;
  oEmoji: any;
  xColor: any;
  oColor: any;
  message: any;
  opponent: any;
  /**
   * @name TicTacToe
   * @kind
   * @param {Object} options
   * @param {String} [options.xEmoji]
   * @param {any} [options.message]
   * @param {String} [options.xColor]
   * @param {String} [options.oEmoji]
   * @param {String} [options.oColor]
   * @param {any} [options.opponent]
   */

  constructor(options: { xEmoji: any; oEmoji: any; xColor: any; oColor: any; opponent: any; message: any }) {
    if (options.xEmoji) this.xEmoji = options.xEmoji;
    else this.xEmoji = '❌';
    if (options.oEmoji) this.oEmoji = options.oEmoji;
    else this.oEmoji = '⭕';
    if (options.xColor) this.xColor = options.xColor;
    else this.xColor = 'BLURPLE';
    if (options.oColor) this.oColor = options.oColor;
    else this.oColor = 'BLURPLE';
    if (!options.opponent) throw new TypeError('Missing argument: opponent Type: DiscordUser');
    if (!options.message) throw new TypeError('Missing argument: message Type Message');
    this.message = options.message;
    this.opponent = options.opponent;
  }
  async start() {
    let [a1, a2, a3, b1, b2, b3, c1, c2, c3] = getBoarder();
    let [a11, a22, a33, b11, b22, b33, c11, c22, c33] = getIds();
    let [A1, A2, A3, B1, B2, B3, C1, C2, C3] = getButtons();
    const author = this.message.author.id;
    const member = this.opponent;
    const authorName = this.message.author.username;
    const gameData = [
      {
        member: this.message.author,
        em: this.xEmoji,
        color: this.xColor,
      },
      {
        member: member,
        em: this.oEmoji,
        color: this.oColor,
      },
    ];
    let player = Math.floor(Math.random() * gameData.length);
    const midDuel = new Set();

    if (midDuel.has(author)) {
      return this.message.reply(`You're currently in a duel`);
    } else if (midDuel.has(member.id)) {
      return this.message.reply(`<@${member.id}> is currently in a duel`);
    }
    if (member.id === this.message.client.user.id) {
      return this.message.reply("You can't duel me.");
    }

    let Embed: EmbedBuilder;
    if (player == 0) {
      Embed = new EmbedBuilder()
        .setTitle(`🎮 __**${authorName}**__ VS ${this.opponent.username} 🎮`)
        .setDescription(`It is ${authorName}'s Turn!`)
        .setColor(3426654);
    } else {
      Embed = new EmbedBuilder()
        .setTitle(`🎮 ${authorName} VS __**${this.opponent.username}**__ 🎮`)
        .setDescription(`It is ${this.opponent.username}'s Turn!`)
        .setColor(3426654);
    }

    this.message
      .reply({
        embeds: [Embed],
        components: [
          new ActionRowBuilder().addComponents([A1, A2, A3]),
          new ActionRowBuilder().addComponents([B1, B2, B3]),
          new ActionRowBuilder().addComponents([C1, C2, C3]),
        ],
      })
      .then(
        async (msg: {
          createMessageComponentCollector: (arg0: { filter: (i: any) => any }) => any;
          edit: (arg0: { embeds: any[]; components: ActionRowBuilder<AnyComponentBuilder>[] }) => Promise<any>;
        }) => {
          midDuel.add(author);
          midDuel.add(member.id);
          const gameCollector = msg.createMessageComponentCollector({
            filter: (i) =>
              i?.isButton() &&
              i?.user &&
              (i?.user.id == this.message.author.id || i?.user.id == this.opponent.id) &&
              i?.message.author.id == this.message.client.user.id,
          });

          gameCollector.on(
            'collect',
            async (btn: {
              customId: string;
              user: { id: any };
              deferUpdate: () => void;
              label: any;
              message: { update: (arg0: string) => void };
              reply: (arg0: { content: string; ephemeral: boolean }) => any;
            }) => {
              if (btn.customId == a11 && gameData[player].member.id === btn.user.id) {
                btn.deferUpdate();
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
                  btn.message.update('That spot is already occupied.');
                } else {
                  try {
                    a1 = gameData[player].em;
                    if (
                      (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) ||
                      (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                      (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) ||
                      (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                      (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) ||
                      (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) ||
                      (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                      (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) ||
                      (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                      (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) ||
                      (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) ||
                      (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) ||
                      (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                    ) {
                      this.message.reply(`${gameData[player].member} wins!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    } else if (
                      a1 !== '⬜' &&
                      a2 !== '⬜' &&
                      a3 !== '⬜' &&
                      b1 !== '⬜' &&
                      b2 !== '⬜' &&
                      b3 !== '⬜' &&
                      c1 !== '⬜' &&
                      c2 !== '⬜' &&
                      c3 !== '⬜'
                    ) {
                      this.message.reply(`It's a **Tie**!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    }
                  } catch (e) {
                    logWithLabel('error', `The error is: ${e}`);
                  }
                  player = (player + 1) % 2;
                  if (player == 0) {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 __**${authorName}**__ VS ${this.opponent.username} 🎮`)
                      .setColor(3426654);
                  } else {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 ${authorName} VS __**${this.opponent.username}**__ 🎮`)
                      .setColor(3426654);
                  }
                  A1 = new ButtonBuilder()
                    .setCustomId(a11)
                    .setStyle(`${gameData[player].color}` as any as any)
                    .setEmoji(gameData[player].em)
                    .setDisabled();
                }
              } else if (btn.customId == a22 && gameData[player].member.id === btn.user.id) {
                btn.deferUpdate();
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
                  btn.message.update('That spot is already occupied.');
                } else {
                  try {
                    a2 = gameData[player].em;
                    if (
                      (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) ||
                      (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                      (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) ||
                      (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                      (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) ||
                      (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) ||
                      (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                      (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) ||
                      (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                      (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) ||
                      (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) ||
                      (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) ||
                      (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                    ) {
                      this.message.reply(`${gameData[player].member} wins!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    } else if (
                      a1 !== '⬜' &&
                      a2 !== '⬜' &&
                      a3 !== '⬜' &&
                      b1 !== '⬜' &&
                      b2 !== '⬜' &&
                      b3 !== '⬜' &&
                      c1 !== '⬜' &&
                      c2 !== '⬜' &&
                      c3 !== '⬜'
                    ) {
                      this.message.reply(`It's a **Tie**!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    }
                  } catch (e) {
                    logWithLabel('error', `The error is: ${e}`);
                  }
                  player = (player + 1) % 2;
                  if (player == 0) {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 __**${authorName}**__ VS ${this.opponent.username} 🎮`)
                      .setColor(3426654);
                  } else {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 ${authorName} VS __**${this.opponent.username}**__ 🎮`)
                      .setColor(3426654);
                  }
                  A2 = new ButtonBuilder()
                    .setCustomId(a22)
                    .setStyle(`${gameData[player].color}` as any)
                    .setEmoji(gameData[player].em)
                    .setDisabled();
                }
              } else if (btn.customId == a33 && gameData[player].member.id === btn.user.id) {
                btn.deferUpdate();
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
                  btn.message.update('That spot is already occupied.');
                } else {
                  try {
                    a3 = gameData[player].em;
                    if (
                      (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) ||
                      (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                      (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) ||
                      (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                      (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) ||
                      (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) ||
                      (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                      (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) ||
                      (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                      (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) ||
                      (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) ||
                      (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) ||
                      (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                    ) {
                      this.message.reply(`${gameData[player].member} wins!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    } else if (
                      a1 !== '⬜' &&
                      a2 !== '⬜' &&
                      a3 !== '⬜' &&
                      b1 !== '⬜' &&
                      b2 !== '⬜' &&
                      b3 !== '⬜' &&
                      c1 !== '⬜' &&
                      c2 !== '⬜' &&
                      c3 !== '⬜'
                    ) {
                      this.message.reply(`It's a **Tie**!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    }
                  } catch (e) {
                    logWithLabel('error', `The error is: ${e}`);
                  }
                  player = (player + 1) % 2;
                  if (player == 0) {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 __**${authorName}**__ VS ${this.opponent.username} 🎮`)
                      .setColor(3426654);
                  } else {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 ${authorName} VS __**${this.opponent.username}**__ 🎮`)
                      .setColor(3426654);
                  }
                  A3 = new ButtonBuilder()
                    .setCustomId(a33)
                    .setStyle(`${gameData[player].color}` as any)
                    .setEmoji(gameData[player].em)
                    .setDisabled();
                }
              } else if (btn.customId == b11 && gameData[player].member.id === btn.user.id) {
                btn.deferUpdate();
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
                  btn.message.update('That spot is already occupied.');
                } else {
                  try {
                    b1 = gameData[player].em;
                    if (
                      (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) ||
                      (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                      (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) ||
                      (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                      (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) ||
                      (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) ||
                      (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                      (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) ||
                      (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                      (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) ||
                      (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) ||
                      (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) ||
                      (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                    ) {
                      this.message.reply(`${gameData[player].member} wins!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    } else if (
                      a1 !== '⬜' &&
                      a2 !== '⬜' &&
                      a3 !== '⬜' &&
                      b1 !== '⬜' &&
                      b2 !== '⬜' &&
                      b3 !== '⬜' &&
                      c1 !== '⬜' &&
                      c2 !== '⬜' &&
                      c3 !== '⬜'
                    ) {
                      this.message.reply(`It's a **Tie**!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    }
                  } catch (e) {
                    logWithLabel('error', `The error is: ${e}`);
                  }
                  player = (player + 1) % 2;
                  if (player == 0) {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 __**${authorName}**__ VS ${this.opponent.username} 🎮`)
                      .setColor(3426654);
                  } else {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 ${authorName} VS __**${this.opponent.username}**__ 🎮`)
                      .setColor(3426654);
                  }
                  B1 = new ButtonBuilder()
                    .setCustomId(b11)
                    .setStyle(`${gameData[player].color}` as any)
                    .setEmoji(gameData[player].em)
                    .setDisabled();
                }
              } else if (btn.customId == b22 && gameData[player].member.id === btn.user.id) {
                btn.deferUpdate();
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
                  btn.message.update('That spot is already occupied.');
                } else {
                  try {
                    b2 = gameData[player].em;
                    if (
                      (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) ||
                      (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                      (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) ||
                      (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                      (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) ||
                      (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) ||
                      (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                      (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) ||
                      (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                      (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) ||
                      (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) ||
                      (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) ||
                      (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                    ) {
                      this.message.reply(`${gameData[player].member} wins!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    } else if (
                      a1 !== '⬜' &&
                      a2 !== '⬜' &&
                      a3 !== '⬜' &&
                      b1 !== '⬜' &&
                      b2 !== '⬜' &&
                      b3 !== '⬜' &&
                      c1 !== '⬜' &&
                      c2 !== '⬜' &&
                      c3 !== '⬜'
                    ) {
                      this.message.reply(`It's a **Tie**!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    }
                  } catch (e) {
                    logWithLabel('error', `The error is: ${e}`);
                  }
                  player = (player + 1) % 2;
                  if (player == 0) {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 __**${authorName}**__ VS ${this.opponent.username} 🎮`)
                      .setColor(3426654);
                  } else {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 ${authorName} VS __**${this.opponent.username}**__ 🎮`)
                      .setColor(3426654);
                  }
                  B2 = new ButtonBuilder()
                    .setCustomId(b22)
                    .setStyle(`${gameData[player].color}` as any)
                    .setEmoji(gameData[player].em)
                    .setDisabled();
                }
              } else if (btn.customId == b33 && gameData[player].member.id === btn.user.id) {
                btn.deferUpdate();
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
                  btn.message.update('That spot is already occupied.');
                } else {
                  try {
                    b3 = gameData[player].em;
                    if (
                      (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) ||
                      (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                      (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) ||
                      (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                      (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) ||
                      (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) ||
                      (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                      (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) ||
                      (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                      (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) ||
                      (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) ||
                      (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) ||
                      (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                    ) {
                      this.message.reply(`${gameData[player].member} wins!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    } else if (
                      a1 !== '⬜' &&
                      a2 !== '⬜' &&
                      a3 !== '⬜' &&
                      b1 !== '⬜' &&
                      b2 !== '⬜' &&
                      b3 !== '⬜' &&
                      c1 !== '⬜' &&
                      c2 !== '⬜' &&
                      c3 !== '⬜'
                    ) {
                      this.message.reply(`It's a **Tie**!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    }
                  } catch (e) {
                    logWithLabel('error', `The error is: ${e}`);
                  }
                  player = (player + 1) % 2;
                  if (player == 0) {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 __**${authorName}**__ VS ${this.opponent.username} 🎮`)
                      .setColor(3426654);
                  } else {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 ${authorName} VS __**${this.opponent.username}**__ 🎮`)
                      .setColor(3426654);
                  }
                  B3 = new ButtonBuilder()
                    .setCustomId(b33)
                    .setStyle(`${gameData[player].color}` as any)
                    .setEmoji(gameData[player].em)
                    .setDisabled();
                }
              } else if (btn.customId == c11 && gameData[player].member.id === btn.user.id) {
                btn.deferUpdate();
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
                  btn.message.update('That spot is already occupied.');
                } else {
                  try {
                    c1 = gameData[player].em;
                    if (
                      (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) ||
                      (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                      (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) ||
                      (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                      (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) ||
                      (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) ||
                      (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                      (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) ||
                      (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                      (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) ||
                      (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) ||
                      (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) ||
                      (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                    ) {
                      this.message.reply(`${gameData[player].member} wins!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    } else if (
                      a1 !== '⬜' &&
                      a2 !== '⬜' &&
                      a3 !== '⬜' &&
                      b1 !== '⬜' &&
                      b2 !== '⬜' &&
                      b3 !== '⬜' &&
                      c1 !== '⬜' &&
                      c2 !== '⬜' &&
                      c3 !== '⬜'
                    ) {
                      this.message.reply(`It's a **Tie**!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    }
                  } catch (e) {
                    logWithLabel('error', `The error is: ${e}`);
                  }
                  player = (player + 1) % 2;
                  if (player == 0) {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 __**${authorName}**__ VS ${this.opponent.username} 🎮`)
                      .setColor(3426654);
                  } else {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 ${authorName} VS __**${this.opponent.username}**__ 🎮`)
                      .setColor(3426654);
                  }
                  C1 = new ButtonBuilder()
                    .setCustomId(c11)
                    .setStyle(`${gameData[player].color}` as any)
                    .setEmoji(gameData[player].em)
                    .setDisabled();
                }
              } else if (btn.customId == c22 && gameData[player].member.id === btn.user.id) {
                btn.deferUpdate();
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
                  btn.message.update('That spot is already occupied.');
                } else {
                  try {
                    c2 = gameData[player].em;
                    if (
                      (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) ||
                      (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                      (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) ||
                      (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                      (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) ||
                      (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) ||
                      (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                      (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) ||
                      (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                      (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) ||
                      (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) ||
                      (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) ||
                      (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                    ) {
                      this.message.reply(`${gameData[player].member} wins!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    } else if (
                      a1 !== '⬜' &&
                      a2 !== '⬜' &&
                      a3 !== '⬜' &&
                      b1 !== '⬜' &&
                      b2 !== '⬜' &&
                      b3 !== '⬜' &&
                      c1 !== '⬜' &&
                      c2 !== '⬜' &&
                      c3 !== '⬜'
                    ) {
                      this.message.reply(`It's a **Tie**!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    }
                  } catch (e) {
                    logWithLabel('error', `The error is: ${e}`);
                  }
                  player = (player + 1) % 2;
                  if (player == 0) {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 __**${authorName}**__ VS ${this.opponent.username} 🎮`)
                      .setColor(3426654);
                  } else {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 ${authorName} VS __**${this.opponent.username}**__ 🎮`)
                      .setColor(3426654);
                  }
                  C2 = new ButtonBuilder()
                    .setCustomId(c22)
                    .setStyle(`${gameData[player].color}` as any)
                    .setEmoji(gameData[player].em)
                    .setDisabled();
                }
              } else if (btn.customId == c33 && gameData[player].member.id === btn.user.id) {
                btn.deferUpdate();
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
                  btn.message.update('That spot is already occupied.');
                } else {
                  try {
                    c3 = gameData[player].em;
                    if (
                      (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) ||
                      (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                      (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) ||
                      (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                      (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) ||
                      (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) ||
                      (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                      (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) ||
                      (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                      (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) ||
                      (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) ||
                      (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                      (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) ||
                      (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                    ) {
                      this.message.reply(`${gameData[player].member} wins!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    } else if (
                      a1 !== '⬜' &&
                      a2 !== '⬜' &&
                      a3 !== '⬜' &&
                      b1 !== '⬜' &&
                      b2 !== '⬜' &&
                      b3 !== '⬜' &&
                      c1 !== '⬜' &&
                      c2 !== '⬜' &&
                      c3 !== '⬜'
                    ) {
                      this.message.reply(`It's a **Tie**!`);
                      gameCollector.stop();
                      midDuel.delete(author);
                      midDuel.delete(member.id);
                    }
                  } catch (e) {
                    logWithLabel('error', `The error is: ${e}`);
                  }
                  player = (player + 1) % 2;
                  if (player == 0) {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 __**${authorName}**__ VS ${this.opponent.username} 🎮`)
                      .setColor(3426654);
                  } else {
                    Embed = new EmbedBuilder()
                      .setDescription(`🎮 ${authorName} VS __**${this.opponent.username}**__ 🎮`)
                      .setColor(3426654);
                  }
                  C3 = new ButtonBuilder()
                    .setCustomId(c33)
                    .setStyle(`${gameData[player].color}` as any)
                    .setEmoji(gameData[player].em)
                    .setDisabled();
                }
              } else {
                return btn.reply({
                  content: ':x: **Wait for opponent.**',
                  ephemeral: true,
                });
              }

              msg.edit({
                embeds: [Embed],
                components: [
                  new ActionRowBuilder().addComponents([A1, A2, A3]),
                  new ActionRowBuilder().addComponents([B1, B2, B3]),
                  new ActionRowBuilder().addComponents([C1, C2, C3]),
                ],
              });
            }
          );

          gameCollector.on('end', async (btn: any) => {
            msg
              .edit({
                embeds: [Embed],
                components: [
                  new ActionRowBuilder().addComponents([A1.setDisabled(), A2.setDisabled(), A3.setDisabled()]),
                  new ActionRowBuilder().addComponents([B1.setDisabled(), B2.setDisabled(), B3.setDisabled()]),
                  new ActionRowBuilder().addComponents([C1.setDisabled(), C2.setDisabled(), C3.setDisabled()]),
                ],
              })
              .catch(() => {});
          });
        }
      );

    function getBoarder() {
      return ['⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜'];
    }

    function getIds() {
      return ['A1-1', 'A2-2', 'A3-3', 'B1-1', 'B2-2', 'B3-3', 'C1-1', 'C2-2', 'C3-3'];
    }

    function getButtons() {
      return [
        new ButtonBuilder().setCustomId(a11).setStyle(ButtonStyle.Secondary).setLabel('~'),
        new ButtonBuilder().setCustomId(a22).setStyle(ButtonStyle.Secondary).setLabel('~'),
        new ButtonBuilder().setCustomId(a33).setStyle(ButtonStyle.Secondary).setLabel('~'),
        new ButtonBuilder().setCustomId(b11).setStyle(ButtonStyle.Secondary).setLabel('~'),
        new ButtonBuilder().setCustomId(b22).setStyle(ButtonStyle.Secondary).setLabel('~'),
        new ButtonBuilder().setCustomId(b33).setStyle(ButtonStyle.Secondary).setLabel('~'),
        new ButtonBuilder().setCustomId(c11).setStyle(ButtonStyle.Secondary).setLabel('~'),
        new ButtonBuilder().setCustomId(c22).setStyle(ButtonStyle.Secondary).setLabel('~'),
        new ButtonBuilder().setCustomId(c33).setStyle(ButtonStyle.Secondary).setLabel('~'),
      ];
    }
  }
}

export class RPSGame {
  inGame: boolean;
  options: GameRocks;
  opponent: any;
  message: any;
  constructor(
    options: GameRocks = {
      opponent: undefined,
      embed: undefined,
      buttons: undefined,
      emojis: undefined,
      askMessage: undefined,
      cancelMessage: undefined,
      timeEndMessage: undefined,
      othersMessage: undefined,
      chooseMessage: undefined,
      noChangeMessage: undefined,
      gameEndMessage: undefined,
      winMessage: undefined,
      drawMessage: undefined,
      message: undefined,
    }
  ) {
    if (!options.message) throw new TypeError('NO_MESSAGE: Please provide a message arguement');
    if (typeof options.message !== 'object')
      throw new TypeError('INVALID_MESSAGE: Invalid Discord Message object was provided.');
    if (!options.opponent) throw new TypeError('NO_OPPONENT: Please provide an opponent arguement');
    if (typeof options.opponent !== 'object')
      throw new TypeError('INVALID_OPPONENT: Invalid Discord User object was provided.');

    if (!options.embed) options.embed = {};
    if (typeof options.embed !== 'object')
      throw new TypeError('INVALID_EMBED_OBJECT: Embed arguement must be an object.');
    if (!options.embed.title) options.embed.title = 'Rock Paper Scissors';
    if (typeof options.embed.title !== 'string') throw new TypeError('INVALID_TITLE: Embed Title must be a string.');
    if (!options.embed.description) options.embed.description = 'Press a button below to make a choice!';
    if (typeof options.embed.description !== 'string')
      throw new TypeError('INVALID_TITLE: Embed Title must be a string.');
    if (!options.embed.color) options.embed.color = '#5865F2';
    if (typeof options.embed.color !== 'string') throw new TypeError('INVALID_COLOR: Embed Color must be a string.');

    if (!options.buttons) options.buttons = {};
    if (!options.buttons.rock) options.buttons.rock = 'Rock';
    if (typeof options.buttons.rock !== 'string') throw new TypeError('INVALID_BUTTON: Rock Button must be a string.');
    if (!options.buttons.paper) options.buttons.paper = 'Paper';
    if (typeof options.buttons.paper !== 'string')
      throw new TypeError('INVALID_BUTTON: Paper Button must be a string.');
    if (!options.buttons.scissors) options.buttons.scissors = 'Scissors';
    if (typeof options.buttons.scissors !== 'string')
      throw new TypeError('INVALID_BUTTON: Scissors Button must be a string.');

    if (!options.emojis) options.emojis = {};
    if (!options.emojis.rock) options.emojis.rock = '🌑';
    if (typeof options.emojis.rock !== 'string') throw new TypeError('INVALID_EMOJI: Rock Emoji must be a string.');
    if (!options.emojis.paper) options.emojis.paper = '📃';
    if (typeof options.emojis.paper !== 'string') throw new TypeError('INVALID_EMOJI: Paper Emoji must be a string.');
    if (!options.emojis.scissors) options.emojis.scissors = '✂️';
    if (typeof options.emojis.scissors !== 'string')
      throw new TypeError('INVALID_EMOJI: Scissors Emoji must be a string.');

    if (!options.askMessage)
      options.askMessage = 'Hey {opponent}, {challenger} challenged you for a game of Rock Paper Scissors!';
    if (typeof options.askMessage !== 'string') throw new TypeError('ASK_MESSAGE: Ask Messgae must be a string.');
    if (!options.cancelMessage)
      options.cancelMessage = 'Looks like they refused to have a game of Rock Paper Scissors. :(';
    if (typeof options.cancelMessage !== 'string')
      throw new TypeError('CANCEL_MESSAGE: Cancel Message must be a string.');
    if (!options.timeEndMessage) options.timeEndMessage = 'Since the opponent didnt answer, i dropped the game!';
    if (typeof options.timeEndMessage !== 'string')
      throw new TypeError('TIME_END_MESSAGE: Time End Message must be a string.');

    if (!options.othersMessage) options.othersMessage = 'You are not allowed to use buttons for this message!';
    if (typeof options.othersMessage !== 'string')
      throw new TypeError('INVALID_OTHERS_MESSAGE: Others Message must be a string.');
    if (!options.chooseMessage) options.chooseMessage = 'You choose {emoji}!';
    if (typeof options.chooseMessage !== 'string')
      throw new TypeError('INVALID_CHOOSE_MESSAGE: Choose Message must be a string.');
    if (!options.noChangeMessage) options.noChangeMessage = 'You cannot change your selection!';
    if (typeof options.noChangeMessage !== 'string')
      throw new TypeError('INVALID_NOCHANGE_MESSAGE: noChange Message must be a string.');

    if (!options.gameEndMessage) options.gameEndMessage = 'The game went unfinished :(';
    if (typeof options.gameEndMessage !== 'string')
      throw new TypeError('GAME_END_MESSAGE: Game End Message must be a string.');
    if (!options.winMessage) options.winMessage = '{winner} won the game!';
    if (typeof options.winMessage !== 'string') throw new TypeError('WIN_MESSAGE: Win Message must be a string.');
    if (!options.drawMessage) options.drawMessage = 'It was a draw!';
    if (typeof options.drawMessage !== 'string') throw new TypeError('DRAW_MESSAGE: Draw Message must be a string.');

    this.inGame = false;
    this.options = options;
    this.opponent = options.opponent;
    this.message = options.message;
  }

  async startGame() {
    if (this.opponent.bot) return this.message.channel.send('Bots cannot play games!');
    if (this.opponent.id === this.message.author.id) return this.message.channel.send('You cannot play with yourself!');
    const check = await verify(this.options);

    if (check) {
      this.RPSGame();
    }
  }

  async RPSGame() {
    this.inGame = true;

    const emojis = this.options.emojis;
    const choice = { r: emojis.rock, p: emojis.paper, s: emojis.scissors };

    const embed = new EmbedBuilder()
      .setTitle(this.options.embed.title)
      .setDescription(this.options.embed.description)
      .setColor(this.options.embed.color);

    const rock = new ButtonBuilder()
      .setCustomId('r_rps')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(false)
      .setLabel(this.options.buttons.rock)
      .setEmoji(emojis.rock);
    const paper = new ButtonBuilder()
      .setCustomId('p_rps')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(false)
      .setLabel(this.options.buttons.paper)
      .setEmoji(emojis.paper);
    const scissors = new ButtonBuilder()
      .setCustomId('s_rps')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(false)
      .setLabel(this.options.buttons.scissors)
      .setEmoji(emojis.scissors);
    const row = new ActionRowBuilder().addComponents(rock, paper, scissors);

    const msg = await this.message.channel.send({ embeds: [embed], components: [row] });

    let challenger_choice: any;
    let opponent_choice: any;
    const filter = (m: any) => m;

    const collector = msg.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    collector.on(
      'collect',
      async (btn: {
        user: { id: any };
        reply: (arg0: { content: any; ephemeral: boolean }) => void;
        customId: string;
      }) => {
        if (btn.user.id !== this.message.author.id && btn.user.id !== this.opponent.id) {
          const authors = this.message.author.tag + 'and' + this.opponent.tag;
          return btn.reply({ content: this.options.othersMessage.replace('{author}', authors), ephemeral: true });
        }

        if (btn.user.id == this.message.author.id) {
          if (challenger_choice) {
            return btn.reply({ content: this.options.noChangeMessage, ephemeral: true });
          }
          const choice: { [key: string]: any } = { r: emojis.rock, p: emojis.paper, s: emojis.scissors };
          challenger_choice = choice[btn.customId.split('_')[0]];

          btn.reply({ content: this.options.chooseMessage.replace('{emoji}', challenger_choice), ephemeral: true });

          if (challenger_choice && opponent_choice) {
            collector.stop();
            this.getResult(msg, challenger_choice, opponent_choice);
          }
        } else if (btn.user.id == this.opponent.id) {
          if (opponent_choice) {
            return btn.reply({ content: this.options.noChangeMessage, ephemeral: true });
          }
          const choice: { [key: string]: any } = { r: emojis.rock, p: emojis.paper, s: emojis.scissors };
          opponent_choice = choice[btn.customId.split('_')[0]];

          btn.reply({ content: this.options.chooseMessage.replace('{emoji}', opponent_choice), ephemeral: true });

          if (challenger_choice && opponent_choice) {
            collector.stop();
            this.getResult(msg, challenger_choice, opponent_choice);
          }
        }
      }
    );

    collector.on('end', async (c: any, r: string) => {
      if (r === 'time' && this.inGame == true) {
        const endEmbed = new EmbedBuilder()
          .setTitle(this.options.embed.title)
          .setColor(this.options.embed.color)
          .setDescription(this.options.gameEndMessage)
          .setTimestamp();

        return msg.edit({ embeds: [endEmbed], components: [] });
      }
    });
  }

  getResult(
    msg: { edit: (arg0: { embeds: any[]; components: string | any[] }) => any; components: string | any[] },
    challenger: any,
    opponent: any
  ) {
    let result;
    const { rock, paper, scissors } = this.options.emojis;

    if (challenger === opponent) {
      result = this.options.drawMessage;
    } else if (
      (opponent === scissors && challenger === paper) ||
      (opponent === rock && challenger === scissors) ||
      (opponent === paper && challenger === rock)
    ) {
      result = this.options.winMessage.replace('{winner}', this.opponent.toString());
    } else {
      result = this.options.winMessage.replace('{winner}', this.message.author.toString());
    }

    const finalEmbed = new EmbedBuilder()
      .setTitle(this.options.embed.title)
      .setColor(this.options.embed.color)
      .setDescription(result)
      .addFields(
        { name: this.message.author.username, value: challenger, inline: true },
        {
          name: this.opponent.username,
          value: opponent,
          inline: true,
        }
      )
      .setTimestamp();

    return msg.edit({ embeds: [finalEmbed], components: [] });
  }
}
