Ext.define('ExtClient.view.GridBase', {
    extend: 'Ext.grid.Panel',

    plugins: Ext.create('Ext.grid.plugin.RowEditing'),

    columns: [],

    store: {
        proxy: {
            type: 'rest'
        }
    },

    statics: {
        factory: function(gridStrings, fields) {
            var gridName = gridStrings.name + 'Grid',
                gridClassName = 'ExtClient.view.' + gridName;

            Ext.define(gridClassName, {
                extend: 'ExtClient.view.GridBase',
                alias: 'widget.' + gridName,

                id: gridStrings.id,
                title: gridStrings.title,

                store: ExtClient.store.Base.factory(gridStrings.name, gridStrings.uri, fields),

                columns: Ext.Array.map(fields, function(item) {
                    return {
                        text: item.title,
                        dataIndex: item.name,
                        field: {
                            xtype: 'textfield'
                        }
                    };
                })
            });

            return Ext.create(gridClassName);
        }
    }
});