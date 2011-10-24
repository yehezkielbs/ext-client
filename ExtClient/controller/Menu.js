Ext.define('ExtClient.controller.Menu', {
    extend: 'Ext.app.Controller',

    models: ['Menu'],
    stores: ['Menu'],
    views: ['Menu'],

    requires: ['ExtClient.controller.Base'],

    init: function() {
        this.control({
            'menu': {
                itemclick: this.itemClicked
            }
        });
    },

    itemClicked: function(selModel, record) {
        if (record.get('leaf')) {
            ExtClient.controller.Base.factory(record.get('text'), record.get('uri'));
        }
    }
});