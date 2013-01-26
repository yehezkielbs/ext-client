/*global Ext, ExtClient, ExtClientApp*/

Ext.define('ExtClient.view.GridBase', {
  statics: {
    factory: function (resourceStrings, reflection) {
      var fields = reflection.fields;

      if (Ext.ClassManager.isCreated(resourceStrings.gridClassName)) {
        return;
      }

      Ext.define(resourceStrings.gridClassName, {
        extend: 'Ext.grid.Panel',
        alias: 'widget.' + resourceStrings.gridName,

        id: resourceStrings.gridId,
        title: resourceStrings.text,

        rowEditor: null,

        closable: true,

        initComponent: function () {
          var rowEditor = Ext.create('Ext.grid.plugin.RowEditing'),
            store = Ext.create(resourceStrings.storeClassName);

          this.rowEditor = rowEditor;
          this.plugins = [rowEditor];
          this.store = store;
          this.columns = Ext.Array.map(fields, function (item) {
            var belongsToRefArray = Ext.Array.filter(reflection.belongs_to || [], function (belongsToItem) {
                return (belongsToItem.foreign_key === item.name);
              }),
              belongsToRef, belongsToResourceStrings;

            if (belongsToRefArray.length > 0) {
              belongsToRef = belongsToRefArray[0];
              belongsToResourceStrings = ExtClientApp.resourceStringsCollection.get(belongsToRef.model);

              rowEditor.addListener({
                beforeedit: function () {
                  var comboBox = Ext.getCmp(belongsToResourceStrings.name + '-combobox-on-' + resourceStrings.gridId);

                  if (comboBox.store.storeId === "ext-empty-store") {
                    comboBox.store = Ext.create(belongsToResourceStrings.storeClassName);
                  }
                }
              });

              return {
                text: item.text,
                dataIndex: item.name,
                editor: {
                  xtype: 'combobox',
                  store: null,
                  valueField: 'id',
                  displayField: 'name',
                  forceSelection: true,
                  queryMode: 'remote',
                  id: belongsToResourceStrings.name + '-combobox-on-' + resourceStrings.gridId
                },
                xtype: 'templatecolumn',
                tpl: '<tpl if="' + belongsToRef.name + '">{' + belongsToRef.name + '.name}</tpl>'
              };
            }
            else {
              return Ext.Object.merge(
                {
                  text: item.text,
                  dataIndex: item.name,
                  editor: ExtClient.util.FieldTypeMap.getFormField(item)
                },
                ExtClient.util.FieldTypeMap.getGridColumn(item)
              );
            }
          });
          this.dockedItems = [
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
          ];

          this.callParent(arguments);
        },

        getSelected: function () {
          return this.getSelectionModel().getSelection()[0];
        },

        insert: function () {
          this.store.insert(0, Ext.ModelManager.getModel(resourceStrings.modelClassName).create());
          this.rowEditor.startEdit(0, 1);
        },

        edit: function () {
          var selected = this.getSelected();
          if (selected) {
            this.rowEditor.startEdit(selected, 1);
          }
        },

        remove: function () {
          var selected = this.getSelected();
          if (selected) {
            this.store.remove(selected);
          }
        }
      });
    }
  }
});