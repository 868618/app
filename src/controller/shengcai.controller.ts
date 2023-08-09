import { Controller, All, Inject, Body } from '@midwayjs/core';
import { ShengcaiService } from '../service/shengcai.service';
// import { Context } from '@midwayjs/koa';

@Controller('/shengcai')
export class HomeController {
  @Inject()
  shengcaiService: ShengcaiService;

  @All('/')
  async home(@Body('html') html: string): Promise<Record<string, unknown>> {
    await this.shengcaiService.saveHtml(html);
    return {};
  }
}
