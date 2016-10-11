;
(function() {
    var config = {
        baseUrl: '/static/js',
        paths: {
            core: 'libs/core',
            jquery: 'libs/jquery-2.2.3',
            underscore: 'libs/underscore'
        },
        shim: {},
        exclude : ['jquery']
    }

    if (typeof SCRIPT_PATHS == 'object') {
        for (var key in SCRIPT_PATHS) {
            config.paths[key] = SCRIPT_PATHS[key];
        }
    }

    requirejs.config(config);
})();
