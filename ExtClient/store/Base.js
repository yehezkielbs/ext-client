Ext.define('ExtClient.store.Base', {
    statics: {
        factory: function(name, uri, fields) {
            var model = ExtClient.model.Base.factory(name, fields),
                storeClassName = 'ExtClient.store.' + name;

            Ext.define(storeClassName, {
                extend: 'Ext.data.Store',

                autoLoad: false,
                autoSync: false,
                pageSize: 25,

                proxy: {
                    type: 'rest',
                    url: ExtClientApp.getResourcesUrl(uri),
                    format: 'json',
                    extraParams: { include: 'associations' },
                    reader: {
                        type: 'json',
                        root: uri,
                        successProperty: 'success',
                        totalProperty: 'total',
                        messageProperty: 'message'
                    },
                    writer: {
                        type: 'json',
                        encode: false
                    }
                },

                model: model.modelName
            });

            return Ext.create(storeClassName);
        }
    }
});