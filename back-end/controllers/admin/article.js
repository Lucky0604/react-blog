module.exports = function(app, co) {
    app.route('/admin/article') // 文章详情CRUD
        .get(function(req, res) {
            co(function*() {
                var id = req.query.id, // 文章ID
                    articleTypes = yield M.articleType.find({
                        enabled: true
                    }), // 文章所有type
                    article = id ? yield M.article.findOne({
                        _id: id
                    }) : {}, // 文章内容
                    articleTags = yield M.articleTag.find(); // 标签

                // 模板渲染
                res.json({
                    status: 'success',
                    data: {
                        articleTypes: articleTypes,
                        article: article,
                        articleTags: articleTags
                    }
                });
            }).catch(F.handleErr.bind(null, res))
        })
        // 删除文章
    .delete(function(req, res) {
        co(function*() {
            res.json((yield M.article.remove({
                _id: req.query.id
            })) ? {
                status: 'success',
                msg: '删除成功！'
            }: {
                status: 'fail',
                msg: '删除失败！'
            });
        }).catch(F.handleErr.bind(null, res))
    })
    // 更新文章
    .put(function(req, res) {
        co(function *() {
            var body = req.body;
            body.lastEditTime = F.date.format('YYYY-MM-DD HH:mm:ss');

            res.json((yield M.article.findOneAndUpdate({_id: req.query.id}, body)) ? {
                status: 'success',
                msg: '更新成功！'
            }: {
                status: 'fail',
                msg: '更新失败！'
            });
        }).catch(F.handleErr.bind(null, res))
    })
    // 发表文章
    .post(function(req, res) {
        co(function *() {
            var body = req.body;
            body.createTime = body.lastEditTime = F.date.format('YYYY-MM-DD HH:mm:ss');

            res.json((yield M.article.create(body)) ? {
                status: 'success',
                msg: '新增成功！'
            }: {
                status: 'fail',
                msg: '新增失败！'
            });
        }).catch(F.handleErr.bind(null, res))
    })
};
