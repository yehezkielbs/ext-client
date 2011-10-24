Ext.define('ExtClient.model.Base', {
    extend: 'Ext.data.Model',

    statics: {
        factory: function(name, fields) {
            var modelName = 'ExtClient.model.' + name;
            Ext.define(modelName, {
                extend: 'ExtClient.model.Base',

                fields: Ext.Array.map(fields, function(item) {
                    return {
                        name: item.name,
                        type: 'string'
                    }
                })
            });
            return Ext.create(modelName);
        }
    }
});