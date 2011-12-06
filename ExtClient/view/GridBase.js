/*global Ext, ExtClient*/

Ext.define('ExtClient.view.GridBase', {
    statics: {
        factory: function(resourceStrings, reflection) {
            var fields = reflection.fields,
                rowEditor = Ext.create('Ext.grid.plugin.RowEditing'),
                store = Ext.create(resourceStrings.storeClassName);

            if (Ext.ClassManager.isCreated(resourceStrings.gridClassName)) {
                return;
            }

            Ext.define(resourceStrings.gridClassName, {
                extend: 'Ext.grid.Panel',
                alias: 'widget.' + resourceStrings.gridName,

                id: resourceStrings.gridId,
                title: resourceStrings.text,

                rowEditor: rowEditor,

                plugins: [rowEditor],

                store: store,

                columns: Ext.Array.map(fields, function(item) {
                    return Ext.Object.merge(
                        {
                            text: item.text,
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

                insert: function() {
                    this.store.insert(0, Ext.ModelManager.getModel(resourceStrings.modelClassName).create());
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
        }
    }
});