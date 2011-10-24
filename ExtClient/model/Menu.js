Ext.define('ExtClient.model.Menu', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'text', type: 'string'},
        {name: 'leaf', type: 'boolean'},
        {name: 'uri', type: 'string'}
    ]
});