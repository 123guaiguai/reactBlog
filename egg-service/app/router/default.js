module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.default.home.index);
  router.get('/default/getArticleList', controller.default.home.getArticleList);
  router.get('/default/getArticleListById/:id', controller.default.home.getArticleListById);
  router.get('/default/getArticleListByType/:id', controller.default.home.getArticleListByType);
};
