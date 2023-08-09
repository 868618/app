import { Provide, Singleton } from '@midwayjs/core';
import { Sequelize } from 'sequelize';
import * as path from 'path';

@Singleton()
@Provide()
export class DB {
  private db: Sequelize;

  async connect() {
    const storagePath = path.resolve(__dirname, '../database/mydatabase.db');

    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: storagePath, // SQLite 数据库文件路径
      define: {
        freezeTableName: true,
      },
    });

    try {
      await sequelize.authenticate();
      console.log('\r\n', '🚀 数据库准备状态 successfully.', '\r\n');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

    this.db = sequelize;

    return this.db;
  }

  async close() {
    return await this.db.close();
  }

  getInstance() {
    return this.db;
  }
}
