/*global Ext*/

var ExtClientApp = ExtClientApp || {}

Ext.Loader.setConfig({
    enabled: true
});

Ext.require('ExtClient.util.GridStrings');
Ext.require('ExtClient.util.FieldTypeMap');
Ext.require('Ext.app.Application');

Ext.onReady(function() {
    ExtClientApp = Ext.create('Ext.app.Application', {

        title: 'Ext-Client Experiment',
        apiPrefix: '/api',

        name: 'ExtClient',
        appFolder: 'ExtClient',
        autoCreateViewport: true,

        controllers: [
            'Menu'
        ],


        getResourcesMetaUrl: function() {
            return(this.apiPrefix + '/_meta/resources.json');
        },

        getFieldsMetaUrl: function(uri) {
            return(this.apiPrefix + '/_meta/resources/' + uri + '/fields.json');
        },

        getResourcesUrl: function(uri) {
            return(this.apiPrefix + '/' + uri);
        }
    });
});