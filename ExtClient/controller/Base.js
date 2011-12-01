/*global Ext, ExtClient, ExtClientApp*/

Ext.define('ExtClient.controller.Base', {

    requires: ['ExtClient.model.Base', 'ExtClient.store.Base', 'ExtClient.view.GridBase'],

    statics: {
        factory: function(resourceStrings, callback) {
            var controllerClassName = 'ExtClient.controller.' + resourceStrings.name;

            if (Ext.ClassManager.isCreated(controllerClassName)) {
                callback(ExtClientApp.getController(resourceStrings.name));
            }
            else {
                Ext.Ajax.request({
                    url: ExtClientApp.getResourceReflectionMetaUrl(resourceStrings.uri),
                    success: function(response) {
                        var reflection = Ext.JSON.decode(response.responseText),
                            fields = reflection.fields,
                            modelName, storeName, gridName;

                        modelName = ExtClient.model.Base.factory(resourceStrings, reflection);
                        storeName = ExtClient.store.Base.factory(resourceStrings, modelName);
                        gridName = ExtClient.view.GridBase.factory(resourceStrings, storeName, fields);

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
                            },

                            add: function() {
                                this.grid.insert(this.getModel(modelName).create());
                            },

                            edit: function() {
                                this.grid.edit();
                            },

                            remove: function() {
                                this.grid.remove();
                            },

                            save: function() {
                                this.grid.store.sync();
                            },

                            constructor: function() {
                                var controls = {};

                                this.callParent(arguments);

                                controls[gridName + ' button[action=add]'] = {click: this.add};
                                controls[gridName + ' button[action=edit]'] = {click: this.edit};
                                controls[gridName + ' button[action=delete]'] = {click: this.remove};
                                controls[gridName + ' button[action=save]'] = {click: this.save};
                                this.control(controls);
                            }
                        });

                        Ext.Array.each(reflection.belongs_to || [], function(belongsToItem) {
                            var menu = ExtClientApp.getStore('Menu').getRootNode(),
                                menuNode, reflectionResourceString;

                            menu.eachChild(function(nodeItem) {
                                if (belongsToItem.model === nodeItem.get('model')) {
                                    menuNode = nodeItem;
                                }
                            });

                            reflectionResourceString = new ExtClient.util.ResourceStrings(menuNode.get('text'), menuNode.get('model'), menuNode.get('uri'));
                            ExtClient.controller.Base.factory(reflectionResourceString, function() {});
                        });

                        callback(ExtClientApp.getController(resourceStrings.name));
                    }
                });
            }
        }
    }
});