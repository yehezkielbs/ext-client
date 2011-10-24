Ext.define('ExtClient.store.Menu', {
    extend: 'Ext.data.TreeStore',
    model: 'ExtClient.model.Menu',
    proxy: {
        type: 'ajax',
        url: ExtClientApp.getResourcesMetaUrl()
    }
});