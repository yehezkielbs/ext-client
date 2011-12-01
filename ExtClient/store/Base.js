/*global Ext, ExtClientApp*/

Ext.define('ExtClient.store.Base', {
    statics: {
        factory: function(resourceStrings, modelName) {
            var storeName = resourceStrings.name,
                storeClassName = 'ExtClient.store.' + storeName;

            if (!Ext.ClassManager.isCreated(storeClassName)) {
                Ext.define(storeClassName, {
                    extend: 'Ext.data.Store',

                    autoLoad: false,
                    autoSync: false,
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

                    model: 'ExtClient.model.' + modelName
                });
            }

            return storeName;
        }
    }
});