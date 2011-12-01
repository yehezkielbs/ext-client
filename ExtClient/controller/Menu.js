/*global Ext, ExtClient*/

Ext.define('ExtClient.controller.Menu', {
    extend: 'Ext.app.Controller',

    models: ['Menu'],
    stores: ['Menu'],
    views: ['Menu'],

    requires: ['ExtClient.controller.Base'],

    init: function() {
        this.control({
            'menu': { itemclick: this.itemClicked }
        });
    },

    itemClicked: function(selModel, record) {
        var resourceStrings;

        if (record.get('leaf')) {
            resourceStrings = new ExtClient.util.ResourceStrings(record.get('text'), record.get('model'), record.get('uri'));
            ExtClient.controller.Base.factory(resourceStrings, function(controller) {
                controller.displayGrid();
            });
        }
    }
});