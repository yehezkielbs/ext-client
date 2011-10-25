Ext.define('ExtClient.model.Base', {
    statics: {
        factory: function(gridStrings, fields) {
            var modelName = gridStrings.name,
                modelClassName = 'ExtClient.model.' + modelName;

            Ext.define(modelClassName, {
                extend: 'Ext.data.Model',

                fields: Ext.Array.map(fields, function(item) {
                    return {
                        name: item.name,
                        type: 'string'
                    }
                })
            });

            return modelName;
        }
    }
});