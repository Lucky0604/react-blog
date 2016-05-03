module.exports = function(app) {
    var path = require('path'),
        fs = require('fs'),
        co = require('co');

    // 遍历controllers文件夹，执行所有router文件
    function eachFiles(dir) {
        fs.readdirSync(dir).forEach(function(name) {
            if (path.extname(name) !== '') {
                require(path.join(dir, name)) (app, co);
            } else if (name !== C.exceptFolder && name !== '.DS_Store') {       // 如果是文件夹并且不等于排除目录，则递归继续往下找
                eachFiles(path.join(dir, name));
            }
        })
    }

    // 后台检验是否登陆
    if (!~process.argv.indexOf('noauth')) {
        app.all('/admin/*', function(req, res, next) {
            if (req.session.admin || req.path === '/admin/auth' || (req.path === '/admin/blogInfo' && req.method == 'GET')) {
                next();
            } else {
                res.json({
                    status: 'fail',
                    msg: '登陆验证失败！'
                });
            }
        });
    };

    // 遍历所有router
    eachFiles(C.dir.controller);

    // default
    app.use(function(req, res) {
        res.json({
            status: 'warning',
            msg: '无此api'
        })
    })
}
