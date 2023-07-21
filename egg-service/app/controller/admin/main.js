'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {

  async index() {
    // 首页的文章列表数据
    this.ctx.body = 'hi api';
  }
  async login() { // 登陆函数
    const { ctx, app } = this;
    const userName = ctx.request.body.userName;
    const password = ctx.request.body.password;
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
      "' AND password = '" + password + "'";
    const res = await app.mysql.query(sql);
    if (res.length > 0) {
      const openId = new Date().getTime();
      ctx.session.openId = { openId };
      ctx.body = { data: '登陆成功', openId };
    } else {
      ctx.body = { data: '登陆失败' };
    }
  }
  async getArticleType() { // 获取文章类别
    const { ctx, app } = this;
    const result = await app.mysql.select('articletype');
    ctx.body = { data: result };
  }
  async addArticle() { // 添加文章
    const { ctx, app } = this;
    const result = await app.mysql.insert('article', ctx.request.body);
    const isSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    ctx.body = {
      isSuccess,
      insertId,
    };
  }
  async updateArticle() { // 修改文章
    const { ctx, app } = this;
    const result = await app.mysql.update('article', ctx.request.body);
    const updateSuccess = result.affectedRows === 1;
    ctx.body = {
      updateSuccess,
    };
  }
  async getArticleList() { // 获取文章列表

    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.view_count as view_count,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'articletype.typeName as typeName ' +
      'FROM article LEFT JOIN articletype ON article.type_id = articletype.Id ' +
      'ORDER BY article.id DESC ';

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };

  }
  async delArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }
  async getArticleById() { // 根据文章ID得到文章详情，用于修改文章
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'article.view_count as view_count ,' +
      'articletype.typeName as typeName ,' +
      'articletype.id as typeId ' +
      'FROM article LEFT JOIN articletype ON article.type_id = articletype.Id ' +
      'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = MainController;
