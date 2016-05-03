var path = require('path'),
    beRoot = path.resolve(__dirname, '..'),
    envConfig = require('../../env.config').dev.apiServer,
    config = {
        cookieSession: {
            name: 'blog',
            keys: ["Lucky's blog"]
        },
        db: {       // 数据库配置
            uri: 'mongodb://localhost:27017/blog',
            opts: {
                user: '',
                pass: ''
            }
        },
        port: envConfig.port,   // 程序端口
        dir: {
            root: beRoot,
            model: path.resolve(beRoot, 'models'),
            controller: path.resolve(beRoot, 'controllers'),
            resource: path.resolve(beRoot, '../resource')
        },
        resourceFixUrl: '',         // 静态资源web访问修正路径
        exceptFolder: 'except'      // model 和 controller中read dir排除的目录名称
    };

module.exports = config;
