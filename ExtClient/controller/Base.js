Ext.define('ExtClient.controller.Base', {
    extend: 'Ext.app.Controller',

    abstractClass: true,

    requires: ['ExtClient.model.Base', 'ExtClient.store.Base', 'ExtClient.view.GridBase'],

    constructor: function() {
        var gridStrings, grid;

        if (this.abstractClass === true) {
            return;
        }

        gridStrings = this.gridStrings;
        grid = Ext.getCmp(gridStrings.id);

        if (grid) {
            grid.show();
            grid.store.load();
        }
        else {
            Ext.Ajax.request({
                url: ExtClientApp.apiPrefix + '/_meta/resources/' + gridStrings.uri + '/fields.json',
                success: function(response) {
                    var fields = Ext.JSON.decode(response.responseText),
                        grid = ExtClient.view.GridBase.factory(gridStrings, fields);

                    console.log(grid);

                    Ext.getCmp('content-panel').add(grid);
                    grid.store.load();
                    grid.show();
                }
            });
        }
    },

    statics: {
        factory: function(text, uri) {
            var gridStrings = new ExtClient.util.GridStrings(text, uri),
                controllerName = 'ExtClient.controller.' + gridStrings.name,
                controller;

            if (!Ext.ClassManager.isCreated(controllerName)) {
                Ext.define(controllerName, {
                    extend: 'ExtClient.controller.Base',

                    abstractClass: false,
                    gridStrings: gridStrings
                });
            }
            controller = ExtClientApp.getController(controllerName);

            return controller;
        }
    }
});