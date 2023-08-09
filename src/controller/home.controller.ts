import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { HomeService } from '../service/home.service';

@Controller('/')
export class HomeController {
  @Inject()
  homeService: HomeService;

  @Get('/')
  async home(@Query('html') html: string): Promise<string> {
    const hash = await this.homeService.createHash(html);
    console.log('AT-[ hash &&&&&********** ]', hash);
    return hash;
  }
}
