/*global Ext, ExtClient, ExtClientApp*/

Ext.define('ExtClient.controller.Base', {

  requires: ['ExtClient.model.Base', 'ExtClient.store.Base', 'ExtClient.view.GridBase'],

  statics: {
    factory: function (resourceStrings, callback) {
      if (Ext.ClassManager.isCreated(resourceStrings.controllerClassName)) {
        if (callback) {
          callback(ExtClientApp.getController(resourceStrings.controllerName));
        }
        return;
      }

      Ext.Ajax.request({
        url: ExtClientApp.getResourceReflectionMetaUrl(resourceStrings.uri),
        success: function (response) {
          var reflection = Ext.JSON.decode(response.responseText);

          ExtClient.model.Base.factory(resourceStrings, reflection);
          ExtClient.store.Base.factory(resourceStrings);
          ExtClient.view.GridBase.factory(resourceStrings, reflection);

          Ext.define(resourceStrings.controllerClassName, {
            extend: 'Ext.app.Controller',

            models: [resourceStrings.modelName],
            stores: [resourceStrings.storeName],
            views: [resourceStrings.gridName],

            grid: null,

            displayGrid: function () {
              if (!this.grid || this.grid.isDestroyed) {
                this.grid = this.getView(resourceStrings.gridName).create();
                Ext.getCmp('content-panel').add(this.grid);
              }
              this.grid.show();
              this.grid.store.load();
            },

            insert: function () {
              this.grid.insert();
            },

            edit: function () {
              this.grid.edit();
            },

            remove: function () {
              this.grid.remove();
            },

            constructor: function () {
              var controls = {};

              this.callParent(arguments);

              controls[resourceStrings.gridName + ' button[action=add]'] = {click: this.insert};
              controls[resourceStrings.gridName + ' button[action=edit]'] = {click: this.edit};
              controls[resourceStrings.gridName + ' button[action=delete]'] = {click: this.remove};
              this.control(controls);
            }
          });

          Ext.Array.each(reflection.belongs_to || [], function (belongsToItem) {
            ExtClient.controller.Base.factory(ExtClientApp.resourceStringsCollection.get(belongsToItem.model));
          });

          if (callback) {
            callback(ExtClientApp.getController(resourceStrings.controllerName));
          }
        }
      });
    }
  }
});
