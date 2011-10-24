Ext.define('ExtClient.model.Base', {
    statics: {
        factory: function(name, fields) {
            var modelClassName = 'ExtClient.model.' + name;

            Ext.define(modelClassName, {
                extend: 'Ext.data.Model',

                fields: Ext.Array.map(fields, function(item) {
                    return {
                        name: item.name,
                        type: 'string'
                    }
                })
            });

            return Ext.create(modelClassName);
        }
    }
});