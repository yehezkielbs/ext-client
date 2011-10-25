Ext.define('ExtClient.store.Base', {
    statics: {
        factory: function(gridStrings, modelName) {
            var storeName = gridStrings.name,
                storeClassName = 'ExtClient.store.' + storeName;

            Ext.define(storeClassName, {
                extend: 'Ext.data.Store',

                autoLoad: false,
                autoSync: false,
                pageSize: 25,

                proxy: {
                    type: 'rest',
                    url: ExtClientApp.getResourcesUrl(gridStrings.uri),
                    format: 'json',
                    extraParams: { include: 'associations' },
                    reader: {
                        type: 'json',
                        root: gridStrings.uri,
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

            return storeName;
        }
    }
});