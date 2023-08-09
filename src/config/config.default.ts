import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1691034358429_5368',
  koa: {
    port: 7001,
  },
  view: {
    defaultViewEngine: 'nunjucks',
  },

  cors: {
    credentials: false,
  },

  staticFile: {
    dirs: {
      default: {
        prefix: '/',
        dir: 'public',
      },
    },
  },
} as MidwayConfig;
