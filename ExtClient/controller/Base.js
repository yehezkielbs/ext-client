Ext.define('ExtClient.controller.Base', {

    requires: ['ExtClient.model.Base', 'ExtClient.store.Base', 'ExtClient.view.GridBase'],

    statics: {
        factory: function(text, uri) {
            var gridStrings = new ExtClient.util.GridStrings(text, uri),
                controllerClassName = 'ExtClient.controller.' + gridStrings.name;

            if (Ext.ClassManager.isCreated(controllerClassName)) {
                ExtClientApp.getController(gridStrings.name).displayGrid();
            }
            else {
                Ext.Ajax.request({
                    url: ExtClientApp.getFieldsMetaUrl(gridStrings.uri),
                    success: function(response) {
                        var fields = Ext.JSON.decode(response.responseText),
                            modelName, storeName, gridName, controller;

                        modelName = ExtClient.model.Base.factory(gridStrings, fields);
                        storeName = ExtClient.store.Base.factory(gridStrings, modelName);
                        gridName = ExtClient.view.GridBase.factory(gridStrings, storeName, fields);

                        Ext.define(controllerClassName, {
                            extend: 'Ext.app.Controller',

                            models: [modelName],
                            stores: [storeName],
                            views: [gridName],

                            grid: undefined,

                            displayGrid: function() {
                                if (this.grid === undefined) {
                                    this.grid = this.getView(gridName).create();
                                    Ext.getCmp('content-panel').add(this.grid);
                                }
                                this.grid.show();
                                this.grid.store.load();
                            }
                        });

                        controller = ExtClientApp.getController(gridStrings.name);
                        controller.displayGrid();
                    }
                });
            }
        }
    }
});