import { Inject, Provide } from '@midwayjs/core';
import * as cheerio from 'cheerio';
import { DB } from '../service/sqlite3.service';
import { DataTypes } from 'sequelize';

@Provide()
export class ShengcaiService {
  @Inject()
  db: DB;

  async saveHtml(html: string) {
    console.log('\r\n', '🔥 ShengcaiService.saveHtml', '\r\n');
    const sequelize = this.db.getInstance();

    const Html = sequelize.define(
      'html',
      {
        title: DataTypes.TEXT,
        question: DataTypes.TEXT,
        result: DataTypes.TEXT,
      },
      {
        tableName: 'html',
      }
    );

    await Html.sync();

    const $ = cheerio.load(html);

    const title = $('#hiddenTkName').text();
    const question = $('.QuestionOption').html();
    const result = $('.ResultArea').html();

    const original = await Html.findAll({
      where: {
        title,
        question,
      },
    });

    console.log('AT-[ originalTitle &&&&&********** ]', original);

    if (original.length) {
      const insert = Html.build({
        title,
        question,
        result,
      });

      await insert.save();
    }

    console.log(
      '\r\n',
      '🔥 ShengcaiService.saveHtml',
      '\r\n',
      $('.Question').text()
    );

    return $('#QuestionTitle').text();
  }
}
