import { Configuration, App, Inject } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
import { GlobalReturnFormatMiddleware } from './middleware/global.return.format.middleware';
import * as view from '@midwayjs/view-nunjucks';
import { WeatherErrorFilter } from './filter/weather.filter';
import * as crossDomain from '@midwayjs/cross-domain';
import * as staticFile from '@midwayjs/static-file';
import { DB } from './service/sqlite3.service';

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    view,

    // 跨域
    crossDomain,

    // 静态文件托管
    staticFile,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  @Inject()
  db: DB;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, GlobalReturnFormatMiddleware]);
    // add filter
    this.app.useFilter([WeatherErrorFilter]);

    await this.db.connect();

    // this.app.useService([])
  }

  async onStop(): Promise<void> {
    // 关闭数据库连接
    await this.db.close();

    console.log('数据库关闭了');
  }
}
