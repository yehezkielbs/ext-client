/*global Ext, ExtClient, ExtClientApp*/

Ext.define('ExtClient.store.Menu', {
  extend: 'Ext.data.TreeStore',
  model: 'ExtClient.model.Menu',
  proxy: {
    type: 'ajax',
    url: ExtClientApp.getResourcesMetaUrl()
  },
  listeners: {
    load: function (thisStore, node, records, successful, eOpts) {
      Ext.Array.each(records, function (record) {
        var resourceStrings = new ExtClient.util.ResourceStrings(record.get('text'), record.get('model'), record.get('uri'));
        ExtClientApp.resourceStringsCollection.add(record.get('model'), resourceStrings);
      });
    }
  }
});