/*global Ext, ExtClient*/

Ext.define('ExtClient.model.Base', {
    statics: {
        factory: function(gridStrings, reflection) {
            var modelName = gridStrings.name,
                modelClassName = 'ExtClient.model.' + modelName;

            Ext.define(modelClassName, {
                extend: 'Ext.data.Model',

                fields: Ext.Array.map(reflection.fields, function(item) {
                    return {
                        name: item.name,
                        type: ExtClient.util.FieldTypeMap.getDataFieldType(item.type)
                    }
                }),

                hasMany: Ext.Array.map(reflection.has_many || [], function(item) {
                    return {
                        model: 'ExtClient.model.' + item.model,
                        name: item.name,
                        foreignKey: item.foreign_key,
                        storeName: 'ExtClient.store.' + item.model
                    }
                }),

                belongsTo: Ext.Array.map(reflection.belongs_to || [], function(item) {
                    return {
                        model: 'ExtClient.model.' + item.model,
                        name: item.name,
                        associationKey: item.name,
                        foreignKey: item.foreign_key,
                        getterName: 'get' + item.model,
                        setterName: 'set' + item.model
                    }
                })
            });

            return modelName;
        }
    }
});