/*global Ext*/

var ExtClientApp = ExtClientApp || {}

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux': '/vendor/ux'
    }
});

Ext.require('Ext.ux.form.field.DateTime');

Ext.require('ExtClient.util.ResourceStrings');
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

        getResourceReflectionMetaUrl: function(uri) {
            return(this.apiPrefix + '/_meta/resources/' + uri + '/reflection.json');
        },

        getResourcesUrl: function(uri) {
            return(this.apiPrefix + '/' + uri);
        }
    });
});