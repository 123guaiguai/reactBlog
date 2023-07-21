module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/admin/index', adminauth, controller.admin.main.index);
  router.post('/admin/login', controller.admin.main.login);
  router.get('/admin/getType', controller.admin.main.getArticleType);
  router.post('/admin/addArticle', controller.admin.main.addArticle);
  router.post('/admin/updateArticle', controller.admin.main.updateArticle);
  router.get('/admin/getArticleList', controller.admin.main.getArticleList);
  router.get('/admin/delArticle/:id', controller.admin.main.delArticle);
  router.get('/admin/getArticleById/:id', controller.admin.main.getArticleById);
};
