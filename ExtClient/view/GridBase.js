Ext.define('ExtClient.view.GridBase', {
    statics: {
        factory: function(gridStrings, storeName, fields) {
            var gridName = gridStrings.name + 'Grid',
                gridClassName = 'ExtClient.view.' + gridName;

            Ext.define(gridClassName, {
                extend: 'Ext.grid.Panel',
                alias: 'widget.' + gridName,

                id: gridStrings.id,
                title: gridStrings.title,

                plugins: Ext.create('Ext.grid.plugin.RowEditing'),

                store: Ext.create('ExtClient.store.' + storeName),

                columns: Ext.Array.map(fields, function(item) {
                    return {
                        text: item.title,
                        dataIndex: item.name,
                        field: {
                            xtype: 'textfield'
                        }
                    };
                }),

                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [
                            {
                                text: 'Add',
                                action: 'add'
                            }
                        ]
                    }
                ]
            });

            return gridName;
        }
    }
});