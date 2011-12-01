/*global Ext, ExtClient*/

Ext.define('ExtClient.model.Base', {
    statics: {
        factory: function(resourceStrings, reflection) {
            if (Ext.ClassManager.isCreated(resourceStrings.modelClassName)) {
                return;
            }

            Ext.define(resourceStrings.modelClassName, {
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
        }
    }
});