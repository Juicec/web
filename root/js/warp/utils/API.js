var mainActions = require('../actions/mainActions');

module.exports = {
    router: function() {
        mainActions.load();
    }
};