/*global Ext, ExtClient*/

Ext.define('ExtClient.view.GridBase', {
    statics: {
        factory: function(gridStrings, storeName, fields) {
            var gridName = gridStrings.name + 'Grid',
                gridClassName = 'ExtClient.view.' + gridName,
                rowEditor = Ext.create('Ext.grid.plugin.RowEditing'),
                store = Ext.create('ExtClient.store.' + storeName);

            Ext.define(gridClassName, {
                extend: 'Ext.grid.Panel',
                alias: 'widget.' + gridName,

                id: gridStrings.id,
                title: gridStrings.title,

                rowEditor: rowEditor,

                plugins: [rowEditor],

                store: store,

                columns: Ext.Array.map(fields, function(item) {
                    return Ext.Object.merge(
                        {
                            text: item.title,
                            dataIndex: item.name,
                            field: ExtClient.util.FieldTypeMap.getFormField(item)
                        },
                        ExtClient.util.FieldTypeMap.getGridColumn(item)
                    );
                }),

                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [
                            {
                                text: 'Add',
                                action: 'add'
                            },
                            {
                                text: 'Edit',
                                action: 'edit'
                            },
                            {
                                text: 'Delete',
                                action: 'delete'
                            },
                            '-',
                            {
                                text: 'Save',
                                action: 'save'
                            }
                        ]
                    },
                    {
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        store: store,
                        displayInfo: true,
                        displayMsg: 'Displaying {0} - {1} of {2}',
                        emptyMsg: 'Nothing to display'
                    }
                ],

                getSelected: function() {
                    return this.getSelectionModel().getSelection()[0]
                },

                insert: function(object) {
                    this.store.insert(0, object);
                    this.rowEditor.startEdit(0, 1);
                },

                edit: function() {
                    var selected = this.getSelected();
                    if (selected) {
                        this.rowEditor.startEdit(selected, 1);
                    }
                },

                remove: function() {
                    var selected = this.getSelected();
                    if (selected) {
                        this.store.remove(selected);
                    }
                },

                save: function() {
                    this.store.sync();
                }
            });

            return gridName;
        }
    }
});