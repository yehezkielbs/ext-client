/*global Ext*/

Ext.define('ExtClient.util.GridStrings', {
    title: '',
    name: '',
    id: '',
    uri: '',

    constructor: function(title, uri) {
        this.title = title;
        this.name = title.replace(/\s+/, '');
        this.id = this.name + '-grid';
        this.uri = uri;
    }
});