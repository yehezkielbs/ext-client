var ExtClientApp = ExtClientApp || {}

Ext.Loader.setConfig({
    enabled: true
});

Ext.require('Ext.app.Application');
Ext.require('ExtClient.util.GridStrings');

Ext.onReady(function() {
    ExtClientApp = Ext.create('Ext.app.Application', {
        name: 'ExtClient',

        appFolder: 'ExtClient',

        apiPrefix: '/api',

        controllers: [
            'Menu',
            'Base'
        ],

        autoCreateViewport: true
    });
});