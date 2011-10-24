Ext.define('ExtClient.controller.Base', {

    requires: ['ExtClient.model.Base', 'ExtClient.store.Base', 'ExtClient.view.GridBase'],

    statics: {
        factory: function(text, uri) {
            var gridStrings = new ExtClient.util.GridStrings(text, uri),
                controllerClassName = 'ExtClient.controller.' + gridStrings.name;

            if (!Ext.ClassManager.isCreated(controllerClassName)) {
                Ext.define(controllerClassName, {
                    extend: 'Ext.app.Controller',

                    gridStrings: gridStrings,

                    constructor: function() {
                        var gridStrings = this.gridStrings,
                            grid = Ext.getCmp(gridStrings.id);

                        if (grid) {
                            grid.show();
                            grid.store.load();
                        }
                        else {
                            Ext.Ajax.request({
                                url: ExtClientApp.getFieldsMetaUrl(gridStrings.uri),
                                success: function(response) {
                                    var fields = Ext.JSON.decode(response.responseText),
                                        grid = ExtClient.view.GridBase.factory(gridStrings, fields);

                                    Ext.getCmp('content-panel').add(grid);
                                    grid.show();
                                    grid.store.load();
                                }
                            });
                        }
                    }
                });
            }

            return ExtClientApp.getController(controllerClassName);
        }
    }
});