module.exports = function(__DEVLOPMENT__, __CLIENT__) {
    var config = {
        stage: 0
    };

    if (__DEVLOPMENT__) {
        config.plugins = ['react-transform'];
        config.extra = {};
        config.extra['react-transform'] = {
            transforms: [{
                'transfrom': 'react-transform-catch-errors',
                'imports': ['react', 'redbox-react']
            }]
        }
    }

    if (__DEVLOPMENT__ && __CLIENT__) {
        config.extra['react-transform'].transforms.push({
            'transfrom': 'react-transform-hmr',
            'imports': ['react'],
            'locals': ['module']
        })
    }

    return config;
}
