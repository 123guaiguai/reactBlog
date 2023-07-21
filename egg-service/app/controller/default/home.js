const { Controller } = require('egg');
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello world';
  }
  async getArticleList() { // 首页获取所有文章列表
    const { ctx, app } = this;
    const sql = 'SELECT a.id ,' +
      'a.title ,' +
      'a.introduce ,' +
      "FROM_UNIXTIME(a.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      'a.article_content ,' +
      'a.view_count ,' +
      't.typeName ' +
      'FROM article as a ,articletype as t where t.id = a.type_id';
    const result = await app.mysql.query(sql);
    ctx.body = {
      data: result,
    };
  }
  async getArticleListById() { // 根据id获取详情页
    const { ctx, app } = this;
    const id = ctx.params.id;
    const sql = 'SELECT a.id ,' +
      'a.title ,' +
      'a.introduce ,' +
      "FROM_UNIXTIME(a.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      'a.article_content ,' +
      'a.view_count ,' +
      't.typeName ' +
      'FROM article as a ,articletype as t where t.id = a.type_id and a.id = ' + id;
    const result = await app.mysql.query(sql);
    ctx.body = {
      data: result,
    };
  }
  async getArticleListByType() { // 根据类型获取文章列表
    const { app, ctx } = this;
    const id = ctx.params.id;
    const sql = 'SELECT a.id ,' +
      'a.title ,' +
      'a.introduce ,' +
      "FROM_UNIXTIME(a.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      'a.article_content ,' +
      'a.view_count ,' +
      't.typeName ' +
      'FROM article as a ,articletype as t where t.id = a.type_id and t.id = ' + id;
    const result = await app.mysql.query(sql);
    ctx.body = { data: result };
  }
}
module.exports = HomeController;
