/*global Ext*/

Ext.define('ExtClient.util.ResourceStrings', {
    text: '',
    model: '',
    name: '',
    id: '',
    uri: '',

    constructor: function(text, model, uri) {
        this.text = text;
        this.model = model;
        this.name = model;
        this.id = this.name + '-grid';
        this.uri = uri;
    }
});