/*global Ext*/

Ext.define('ExtClient.model.Menu', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'text', type: 'string'},
        {name: 'model', type: 'string'},
        {name: 'uri', type: 'string'},
        {name: 'leaf', type: 'boolean'}
    ]
});