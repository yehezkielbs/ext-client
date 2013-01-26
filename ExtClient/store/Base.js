/*global Ext, ExtClientApp*/

Ext.define('ExtClient.store.Base', {
  statics: {
    factory: function (resourceStrings) {
      if (Ext.ClassManager.isCreated(resourceStrings.storeClassName)) {
        return;
      }

      Ext.define(resourceStrings.storeClassName, {
        extend: 'Ext.data.Store',

        autoLoad: false,
        autoSync: true,
        pageSize: 25,

        proxy: {
          type: 'rest',
          url: ExtClientApp.getResourcesUrl(resourceStrings.uri),
          format: 'json',
          extraParams: { include: 'associations' },
          reader: {
            type: 'json',
            root: resourceStrings.uri,
            successProperty: 'success',
            totalProperty: 'total',
            messageProperty: 'message'
          },
          writer: {
            type: 'json',
            encode: false
          }
        },

        model: resourceStrings.modelClassName
      });
    }
  }
});