/*global Ext*/

Ext.define('ExtClient.util.ResourceStrings', {
    text: '',
    model: '',
    name: '',
    gridId: '',
    uri: '',
    controllerName: '',
    modelName: '',
    storeName: '',
    controllerClassName: '',
    modelClassName: '',
    storeClassName: '',
    gridName: '',
    gridClassName: '',

    constructor: function(text, model, uri) {
        this.text = text;
        this.model = model;
        this.name = model;
        this.gridId = this.name + '-grid';
        this.uri = uri;
        this.controllerName = model;
        this.modelName = model;
        this.storeName = model;
        this.controllerClassName = 'ExtClient.controller.' + this.controllerName;
        this.modelClassName = 'ExtClient.model.' + this.modelName;
        this.storeClassName = 'ExtClient.store.' + this.storeName;
        this.gridName = model + 'Grid';
        this.gridClassName = 'ExtClient.view.' + this.gridName;
    }
});