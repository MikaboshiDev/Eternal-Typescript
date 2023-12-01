/*
# Discord Server: https://discord.gg/pgDje8S3Ed
# Github: https://github.com/MikaboshiDev
# Docs: https://docs.night-support.xyz/
# Dashboard: http://www.night-support.xyz/

# Created by: MikaboshiDev
# Version: 0.0.2
# Discord: azazel_hla

# This file is the main configuration file for the bot.
# Inside this file you will find all the settings you need to configure the bot.
# If you have any questions, please contact us on our discord server.
# If you want to know more about the bot, you can visit our website.
*/

import { Request, Response, Router } from 'express';
import fs from 'fs';
import os from 'os';
import model from '../../src/models/client';
import MsgModel from '../../src/models/messages';
import ProductModel from '../../src/models/products';
import user from '../../src/models/servers/economy';
import { client } from '../../src/shulker';
import { authLogout } from '../controllers/auth.controllers';
import { authInspection } from '../middleware/auth.middleware';
import { customerWebMiddleware, devWebMiddleware } from '../middleware/web.middleware';
import { passport } from '../utils/passport';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('login.ejs', {
    user: req.user,
    _client: client,
  });
});

router.get('/auth/logout', authInspection, authLogout);
router.get(
  '/auth/login',
  passport.authenticate('discord', {
    failureRedirect: '/auth/logout',
  }),
  (req: Request, res: Response) => {
    res.redirect('/dashboard');
  }
);

router.get('/error', (req: Request, res: Response) => {
  res.render('error.ejs', {
    user: req.user,
    _client: client,
  });
});

router.get('/dashboard', authInspection, async (req: Request, res: Response) => {
  try {
    const messages = await MsgModel.find().sort({ createdAt: -1 }).limit(4);
    const reviews = client.channels.cache.get(client.config.api_client.channel_reviews!);

    if (!reviews) return res.send(`<script>alert('Channel not found');</script>`);
    if (!reviews.isTextBased()) return res.send(`<script>alert('Channel is not text based');</script>`);
    const msgReviews = await reviews?.messages.fetch({ limit: 5 });
    if (!req.user) return res.redirect('/error');
    res.render('dashboard.ejs', {
      user: req.user,
      _client: client,
      os: os,
      avatarURL: function (id: string) {
        const user = client.users.cache.get(id);
        if (user) return user.avatarURL({ forceStatic: true, size: 4096 });
        else return 'https://cdn.discordapp.com/embed/avatars/0.png';
      },
      timeAgo: function (date: Date) {
        return require('moment')(date).fromNow();
      },
      messages: messages,
      _reviews: msgReviews.map((msg: any) => {
        return {
          content: msg.content,
          authorAvatar: msg.author.avatarURL({ forceStatic: true, size: 4096 }),
          authorId: msg.author.id,
          authorName: msg.author.username,
          timestamp: msg.createdTimestamp,
        };
      }),
    });
  } catch (err) {
    console.error(err);
    return res.send(`<script>alert('Internal server error!');</script>`);
  }
});

router.get('/products', authInspection, async (req: Request, res: Response) => {
  try {
    const messages = await MsgModel.find().sort({ createdAt: -1 }).limit(4);
    const products = await ProductModel.find().sort({ createdAt: -1 }).limit(20);
    const reviews = client.channels.cache.get(client.config.api_client.channel_reviews!);

    if (!reviews) return res.send(`<script>alert('Channel not found');</script>`);
    if (!reviews.isTextBased()) return res.send(`<script>alert('Channel is not text based');</script>`);
    const msgReviews = await reviews?.messages.fetch({ limit: 5 });
    res.render('products.ejs', {
      user: req.user,
      _client: client,
      products: products,
      avatarURL: function (id: string) {
        const user = client.users.cache.get(id);
        if (user) return user.avatarURL({ forceStatic: true, size: 4096 });
        else return 'https://cdn.discordapp.com/embed/avatars/0.png';
      },
      timeAgo: function (date: Date) {
        return require('moment')(date).fromNow();
      },
      messages: messages,
      _reviews: msgReviews.map((msg: any) => {
        return {
          content: msg.content,
          authorAvatar: msg.author.avatarURL({ forceStatic: true, size: 4096 }),
          authorId: msg.author.id,
          authorName: msg.author.username,
          timestamp: msg.createdTimestamp,
        };
      }),
    });
  } catch (err) {
    console.error(err);
    return res.send(`<script>alert('Internal server error!');</script>`);
  }
});

router.get('/add-product', authInspection, devWebMiddleware, async (req: Request, res: Response) => {
  try {
    const messages = await MsgModel.find().sort({ createdAt: -1 }).limit(4);
    const reviews = client.channels.cache.get(client.config.api_client.channel_reviews!);

    if (!reviews) return res.send(`<script>alert('Channel not found');</script>`);
    if (!reviews.isTextBased()) return res.send(`<script>alert('Channel is not text based');</script>`);
    const msgReviews = await reviews?.messages.fetch({ limit: 5 });
    res.render('addProduct.ejs', {
      user: req.user,
      _client: client,
      avatarURL: function (id: string) {
        const user = client.users.cache.get(id);
        if (user) return user.avatarURL({ forceStatic: true, size: 4096 });
        else return 'https://cdn.discordapp.com/embed/avatars/0.png';
      },
      timeAgo: function (date: Date) {
        return require('moment')(date).fromNow();
      },
      messages: messages,
      _reviews: msgReviews.map((msg: any) => {
        return {
          content: msg.content,
          authorAvatar: msg.author.avatarURL({ forceStatic: true, size: 4096 }),
          authorId: msg.author.id,
          authorName: msg.author.username,
          timestamp: msg.createdTimestamp,
        };
      }),
    });
  } catch (err) {
    console.error(err);
    return res.send(`<script>alert('Internal server error!');</script>`);
  }
});

router.get('/analytics', authInspection, devWebMiddleware, async (req: Request, res: Response) => {
  try {
    const messages = await MsgModel.find().sort({ createdAt: -1 }).limit(4);
    const reviews = client.channels.cache.get(client.config.api_client.channel_reviews!);

    if (!reviews) return res.send(`<script>alert('Channel not found');</script>`);
    if (!reviews.isTextBased()) return res.send(`<script>alert('Channel is not text based');</script>`);
    const msgReviews = await reviews?.messages.fetch({ limit: 5 });
    const directoryPath = './config/upload/logs';
    async function getFiles() {
      return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err: any, files: any[]) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            const archives = files.map((file) => ({
              name: file,
              downloadLink: `/download/${encodeURIComponent(file)}`,
            }));
            resolve(archives);
          }
        });
      });
    }

    const products = await ProductModel.find().sort({ createdAt: -1 }).limit(20);
    const archives = await getFiles();
    res.render('client.ejs', {
      user: req.user,
      _client: client,
      avatarURL: function (id: string) {
        const user = client.users.cache.get(id);
        if (user) return user.avatarURL({ forceStatic: true, size: 4096 });
        else return 'https://cdn.discordapp.com/embed/avatars/0.png';
      },
      timeAgo: function (date: Date) {
        return require('moment')(date).fromNow();
      },
      messages: messages,
      files: archives,
      clientPing: client.ws.ping,
      archives: archives,
      products: products,
      _reviews: msgReviews.map((msg: any) => {
        return {
          content: msg.content,
          authorAvatar: msg.author.avatarURL({ forceStatic: true, size: 4096 }),
          authorId: msg.author.id,
          authorName: msg.author.username,
          timestamp: msg.createdTimestamp,
        };
      }),
    });
  } catch (err) {
    console.error(err);
    return res.send(`<script>alert('Internal server error!');</script>`);
  }
});

router.get('/policies', authInspection, async (req: Request, res: Response) => {
  try {
    const messages = await MsgModel.find().sort({ createdAt: -1 }).limit(4);
    const reviews = client.channels.cache.get(client.config.api_client.channel_reviews!);

    if (!reviews) return res.send(`<script>alert('Channel not found');</script>`);
    if (!reviews.isTextBased()) return res.send(`<script>alert('Channel is not text based');</script>`);
    const msgReviews = await reviews?.messages.fetch({ limit: 5 });
    if (!req.user) return res.redirect('/error');
    res.render('policies.ejs', {
      user: req.user,
      _client: client,
      avatarURL: function (id: string) {
        const user = client.users.cache.get(id);
        if (user) return user.avatarURL({ forceStatic: true, size: 4096 });
        else return 'https://cdn.discordapp.com/embed/avatars/0.png';
      },
      timeAgo: function (date: Date) {
        return require('moment')(date).fromNow();
      },
      messages: messages,
      _reviews: msgReviews.map((msg: any) => {
        return {
          content: msg.content,
          authorAvatar: msg.author.avatarURL({ forceStatic: true, size: 4096 }),
          authorId: msg.author.id,
          authorName: msg.author.username,
          timestamp: msg.createdTimestamp,
        };
      }),
    });
  } catch (err) {
    console.error(err);
    return res.send(`<script>alert('Internal server error!');</script>`);
  }
});

router.get('/aplications', authInspection, async (req: Request, res: Response) => {
  const messages = await MsgModel.find().sort({ createdAt: -1 }).limit(4);
  const reviews = client.channels.cache.get(client.config.api_client.channel_reviews!);

  if (!reviews) return res.send(`<script>alert('Channel not found');</script>`);
  if (!reviews.isTextBased()) return res.send(`<script>alert('Channel is not text based');</script>`);
  const msgReviews = await reviews?.messages.fetch({ limit: 5 });
  const all = await model.find();
  const data = all.map((x) => {
    return {
      id: x.id,
      username: x.username,
      image: x.image,
      description: x.description,
      supportServer: x.supportServer,
      prefix: x.prefix,
      website: x.website,
    };
  });

  res.render('aplications.ejs', {
    user: req.user,
    _client: client,
    avatarURL: function (id: string) {
      const user = client.users.cache.get(id);
      if (user) return user.avatarURL({ forceStatic: true, size: 4096 });
      else return 'https://cdn.discordapp.com/embed/avatars/0.png';
    },
    timeAgo: function (date: Date) {
      return require('moment')(date).fromNow();
    },
    messages: messages,
    data: data,
    _reviews: msgReviews.map((msg: any) => {
      return {
        content: msg.content,
        authorAvatar: msg.author.avatarURL({ forceStatic: true, size: 4096 }),
        authorId: msg.author.id,
        authorName: msg.author.username,
        timestamp: msg.createdTimestamp,
      };
    }),
  });
});

router.get('/economy', authInspection, async (req: Request, res: Response) => {
  const messages = await MsgModel.find().sort({ createdAt: -1 }).limit(4);
  const reviews = client.channels.cache.get(client.config.api_client.channel_reviews!);

  if (!reviews) return res.send(`<script>alert('Channel not found');</script>`);
  if (!reviews.isTextBased()) return res.send(`<script>alert('Channel is not text based');</script>`);
  const msgReviews = await reviews?.messages.fetch({ limit: 5 });
  const guild = client.guilds.cache.get(client.config.general.guild_id!);
  const total = await user.find();
  const userData = total.map((user) => {
    const member = guild?.members.cache.get(user.userID!);

    return {
      username: member ? member.user.username : 'Unknown user',
      avatarURL: member
        ? member.user.displayAvatarURL({
            forceStatic: true,
            extension: 'png',
            size: 512,
          })
        : 'https://cdn.discordapp.com/embed/avatars/0.png',
      dinero: user.money,
      dineroEnBanco: user.bank,
    };
  });

  res.render('economy.ejs', {
    user: req.user,
    _client: client,
    avatarURL: function (id: string) {
      const user = client.users.cache.get(id);
      if (user) return user.avatarURL({ forceStatic: true, size: 4096 });
      else return 'https://cdn.discordapp.com/embed/avatars/0.png';
    },
    timeAgo: function (date: Date) {
      return require('moment')(date).fromNow();
    },
    messages: messages,
    _reviews: msgReviews.map((msg: any) => {
      return {
        content: msg.content,
        authorAvatar: msg.author.avatarURL({ forceStatic: true, size: 4096 }),
        authorId: msg.author.id,
        authorName: msg.author.username,
        timestamp: msg.createdTimestamp,
      };
    }),
    userData: userData,
  });
});

router.get('/cdn', authInspection, customerWebMiddleware, async (req: Request, res: Response) => {
  const messages = await MsgModel.find().sort({ createdAt: -1 }).limit(4);
  const reviews = client.channels.cache.get(client.config.api_client.channel_reviews!);

  if (!reviews) return res.send(`<script>alert('Channel not found');</script>`);
  if (!reviews.isTextBased()) return res.send(`<script>alert('Channel is not text based');</script>`);
  const msgReviews = await reviews?.messages.fetch({ limit: 5 });
  const path = './config/upload/archives';
  fs.readdir(path, (err, files) => {
    if (err) return console.error(err);
    const data = files.map((file) => {
      return {
        name: file,
        extension: file.split('.').pop(),
        image: `${path}/${file}`,
        downloadLink: `/download/${encodeURIComponent(file)}`,
        size: fs.statSync(`${path}/${file}`).size,
        date: fs.statSync(`${path}/${file}`).mtime,
      };
    });

    res.render('cdn.ejs', {
      user: req.user,
      _client: client,
      avatarURL: function (id: string) {
        const user = client.users.cache.get(id);
        if (user) return user.avatarURL({ forceStatic: true, size: 4096 });
        else return 'https://cdn.discordapp.com/embed/avatars/0.png';
      },
      timeAgo: function (date: Date) {
        return require('moment')(date).fromNow();
      },
      messages: messages,
      _reviews: msgReviews.map((msg: any) => {
        return {
          content: msg.content,
          authorAvatar: msg.author.avatarURL({ forceStatic: true, size: 4096 }),
          authorId: msg.author.id,
          authorName: msg.author.username,
          timestamp: msg.createdTimestamp,
        };
      }),
      data: data,
    });
  });
});

router.get('/notifications', authInspection, devWebMiddleware, async (req: Request, res: Response) => {
  const messages = await MsgModel.find().sort({ createdAt: -1 }).limit(4);
  const reviews = client.channels.cache.get(client.config.api_client.channel_reviews!);

  if (!reviews) return res.send(`<script>alert('Channel not found');</script>`);
  if (!reviews.isTextBased()) return res.send(`<script>alert('Channel is not text based');</script>`);
  const msgReviews = await reviews?.messages.fetch({ limit: 5 });
  const channel = client.channels.cache.get(client.config.dashboard.channel_id!);
  if (!channel) return res.send(`<script>alert('Channel not found');</script>`);
  if (!channel.isTextBased()) return res.send(`<script>alert('Channel is not text based');</script>`);

  const messages_content = await channel.messages.fetch({ limit: 13 });
  const notices = messages_content.map(
    (message: {
      content: any;
      attachments: { size: number; first: () => any };
      author: { id: any; username: any };
      createdTimestamp: any;
    }) => {
      let content = message.content;
      if (message.attachments.size > 0) {
        const attachment = message.attachments.first();
        content = attachment.url;
      }

      return {
        content: content,
        authorAvatar: client.users.cache.get(message.author.id)?.avatarURL({ forceStatic: true, size: 4096 }),
        authorId: message.author.id,
        authorName: message.author.username,
        timestamp: message.createdTimestamp,
      };
    }
  );

  res.render('notifications.ejs', {
    user: req.user,
    _client: client,
    avatarURL: function (id: string) {
      const user = client.users.cache.get(id);
      if (user) return user.avatarURL({ forceStatic: true, size: 4096 });
      else return 'https://cdn.discordapp.com/embed/avatars/0.png';
    },
    timeAgo: function (date: Date) {
      return require('moment')(date).fromNow();
    },
    messages: messages,
    notices: notices,
    _reviews: msgReviews.map((msg: any) => {
      return {
        content: msg.content,
        authorAvatar: msg.author.avatarURL({ forceStatic: true, size: 4096 }),
        authorId: msg.author.id,
        authorName: msg.author.username,
        timestamp: msg.createdTimestamp,
      };
    }),
  });
});

router.get('/commands', authInspection, async (req: Request, res: Response) => {
  const messages = await MsgModel.find().sort({ createdAt: -1 }).limit(4);
  const reviews = client.channels.cache.get(client.config.api_client.channel_reviews!);

  if (!reviews) return res.send(`<script>alert('Channel not found');</script>`);
  if (!reviews.isTextBased()) return res.send(`<script>alert('Channel is not text based');</script>`);
  const msgReviews = await reviews?.messages.fetch({ limit: 5 });
  res.render('commands.ejs', {
    user: req.user,
    _client: client,
    avatarURL: function (id: string) {
      const user = client.users.cache.get(id);
      if (user) return user.avatarURL({ forceStatic: true, size: 4096 });
      else return 'https://cdn.discordapp.com/embed/avatars/0.png';
    },
    timeAgo: function (date: Date) {
      return require('moment')(date).fromNow();
    },
    messages: messages,
    commands: client.precommands.map((command: any) => {
      return {
        name: command.name,
        description: command.description,
        aliases: command.aliases,
        category: command.category,
        examples: command.examples,
        subcommands: command.subcommands,
      };
    }),
    _reviews: msgReviews.map((msg: any) => {
      return {
        content: msg.content,
        authorAvatar: msg.author.avatarURL({ forceStatic: true, size: 4096 }),
        authorId: msg.author.id,
        authorName: msg.author.username,
        timestamp: msg.createdTimestamp,
      };
    }),
  });
});

router.get('/minecraft', authInspection, async (req: Request, res: Response) => {
  const messages = await MsgModel.find().sort({ createdAt: -1 }).limit(4);
  res.render('minecraft.ejs', {
    user: req.user,
    _client: client,
    avatarURL: function (id: string) {
      const user = client.users.cache.get(id);
      if (user) return user.avatarURL({ forceStatic: true, size: 4096 });
      else return 'https://cdn.discordapp.com/embed/avatars/0.png';
    },
    timeAgo: function (date: Date) {
      return require('moment')(date).fromNow();
    },
    messages: messages,
  });
});

export { router };
