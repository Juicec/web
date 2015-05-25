module.exports = {

    // Task options
    options: {
        limit: 5
    },

    // Dev tasks
    devFirst: [
        'clean:dev'
    ],
    devSecond: [
        'compass:all',
        'browserify:dev'
    ],

    // Production tasks
    prodFirst: [
        'clean:prod'
    ],
    prodSecond: [
        'compass:all',
        'browserify:prod',
    ],
    prodThird: [
    ]
};
