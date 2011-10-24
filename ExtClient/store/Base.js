Ext.define('ExtClient.store.Base', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    autoSync: false,
    pageSize: 25,
    //model: modelName,
    proxy: {
        type: 'rest',
        //url: '/' + name,
        //url: ExtClientApp.apiPrefix + '/foos',
        format: 'json',
        extraParams: { include: 'associations' },
        reader: {
            type: 'json',
            //root: name,
            root: 'foos',
            successProperty: 'success',
            totalProperty: 'total',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            encode: false
        }
    },

    statics: {
        factory: function(name, uri, fields) {
            var model = ExtClient.model.Base.factory(name, fields),
                storeName = 'ExtClient.store.' + name,
                store;

            Ext.define(storeName, {
                extend: 'ExtClient.store.Base',

                model: model.modelName
            });
            store = Ext.create(storeName);
            store.proxy.url = ExtClientApp.apiPrefix + '/' + uri;
            store.proxy.reader.root = uri;

            return store;
        }
    }
});